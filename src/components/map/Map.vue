<template>
  <div>
    <h3>Find My Bin</h3>
    <div id="map"></div>
  </div>
</template>

<script>
// import axios from 'axios'
import gmapsInit from './Map.js';
// import OneMap_token_response from './GetOneMapToken.js';
// if (Math.floor(new Date().getTime()/1000.0) > this.OneMap_token_expiry) {
//   // update OneMap token if current one has expired
//   this.OneMap_token_expiry = Number(OneMap_token_response.expiry_timestamp);
//   this.OneMap_API_KEY = OneMap_token_response.access_token;
// }


import axios from 'axios';

export default {
  data () {
    return {
      map: null,
      src: "http://drive.google.com/uc?id=1WrA6xSjaGgZel3Ii8JZR_cKzRrCmv4ag", // kml file source
      points: [],
      OneMap_API_KEY: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjczMjcsInVzZXJfaWQiOjczMjcsImVtYWlsIjoiZGFycmVsbC5sYWlAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNjE3NzAyNzU4LCJleHAiOjE2MTgxMzQ3NTgsIm5iZiI6MTYxNzcwMjc1OCwianRpIjoiNGU2ZjkzMmJhODQxNTRkM2UwMzJkZTFlZGEwNTcyNzUifQ.X-pQ8Z3Wkb6u-7BB7Ud7t2gEu4dzukZ9lkyEfAGpZ34',
      OneMap_token_expiry: 9999999999,
      circles: [],
      bins: []
    }
  },
  methods: {
    initMap: function() {
    },
    handleLocationError: function(browserHasGeolocation, infoWindow, pos, map) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    },
    getOneMapToken: function() {
      axios.get()
    },
    getKMradius: function(lat, lng) {
      // return coordinates of bounding box of 2km x 2km
        // just need 2 corners
      return {topright: [lng + 0.01, lat+0.01], bottomleft: [lng-0.01, lat-0.01]};
      // return {topright: [lat+0.1, lng + 0.1], bottomleft: [lat-0.1, lng-0.1]};
    },
    getExtentsQuery: function(bb) {
      let extents = bb.bottomleft[0] + ",%20" + bb.bottomleft[1] + "," + bb.topright[0] + ",%20" + bb.topright[1];
      // const OneMap_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjczMjcsInVzZXJfaWQiOjczMjcsImVtYWlsIjoiZGFycmVsbC5sYWlAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNjE2NTUzNzcyLCJleHAiOjE2MTY5ODU3NzIsIm5iZiI6MTYxNjU1Mzc3MiwianRpIjoiY2IzOGRmMTk2ZjE5Zjg0YTYxZjdlYjYxOThjNGEzODQifQ.Yl5twCCgDANzVIezHqLwJoCQz_tzpu9evMV2qj8Gap8'
      let query = `https://developers.onemap.sg/privateapi/themesvc/retrieveTheme?queryName=recyclingbins&token=${this.OneMap_API_KEY}&extents=` + extents;
      console.log("query: " + query);
      return query;
    },
    getBinsFromOneMap: async function(userPos) {
      let bb = this.getKMradius(userPos.lat, userPos.lng);
      let query = this.getExtentsQuery(bb);
      return axios.get(query).then(response => {
        response.data.SrchResults.slice(1).forEach(bin => {
          if (bin.LatLng) {
            let latlng_arr = bin.LatLng.split(",");
            this.points.push({lat: parseFloat(latlng_arr[0]), lng: parseFloat(latlng_arr[1])});
            // console.log("pushing bin into this.points now!");
            // console.log("latlng_arr[0] = " + latlng_arr[0] + ", latlng_arr[1] = " + latlng_arr[1]);
            // console.log("this.points has length " + this.points.length + " now");
          }
        })
      })
    },
    calculateDistances: async function(data, origin) {
      const addresses = [];
      const destinations = [];

      // only get bins that are reasonably nearby
      data.forEach((bin) => {
        const binLoc = bin.getGeometry().get();
        const diff_lng = Math.abs(origin.lat - binLoc.lat());
        const diff_lat = Math.abs(origin.lng - binLoc.lng());        
        if (diff_lat < 0.1 && diff_lng < 0.1) {
          addresses.push(bin.getProperty('address'));
          destinations.push(binLoc);
        }
      });

      // Retrieve the distances of each store from the origin
      // The returned list will be in the same order as the destinations list
      const service = new this.google.maps.DistanceMatrixService();
      const getDistanceMatrix = 
        (service, parameters) => new Promise((resolve, reject) => {
          service.getDistanceMatrix(parameters, (response, status) => {
            if (status != this.google.maps.DistanceMatrixStatus.OK) {
              reject(response);
            } else {
              const distances = [];
              const results = response.rows[0].elements;
              for (let j = 0; j < results.length; j++) {
                const element = results[j];
                const distanceText = element.distance.text;
                const distanceVal = element.distance.value;
                const distanceObject = {
                  address: addresses[j],
                  distanceText: distanceText,
                  distanceVal: distanceVal,
                  coordinates: destinations[j],
                };
                distances.push(distanceObject);
              }

              resolve(distances);
            }
          });
        });
        
      const distancesList = await getDistanceMatrix(service, {
        origins: [origin],
        destinations: destinations,
        travelMode: 'WALKING',
        unitSystem: this.google.maps.UnitSystem.METRIC,
      });

      distancesList.sort((first, second) => {
        return first.distanceVal - second.distanceVal;
      });

      return distancesList.slice(10);
    },
    showBinsList(data, bins) {
      if (bins.length == 0) {
        console.log('no bins');
        return;
      }

      let panel = document.createElement('div');
      // If the panel already exists, use it. Else, create it and add to the page.
      if (document.getElementById('panel')) {
        panel = document.getElementById('panel');
        // If panel is already open, close it
        if (panel.classList.contains('open')) {
          panel.classList.remove('open');
        }
      } else {
        panel.setAttribute('id', 'panel');
        const body = document.body;
        body.insertBefore(panel, body.childNodes[0]);
      }

      // Clear the previous details
      while (panel.lastChild) {
        panel.remove(panel.lastChild);
      }

      bins.forEach((bin) => {
        // Add store details with text formatting
        const name = document.createElement('p');
        name.classList.add('place');
        const currentBin = data.getFeatureById(bin.address);
        name.textContent = currentBin.getProperty('address');
        panel.appendChild(name);
        const distanceText = document.createElement('p');
        distanceText.classList.add('distanceText');
        distanceText.textContent = bin.distanceText;
        panel.appendChild(distanceText);
      });

      // Open the panel
      panel.classList.add('open');
      return;
    },
    fetchAndRenderBins: async function(center) {
      // Fetch the Bins from the data source
      this.bins = (await this.fetchBins(center)).features;

      // Create circular markers based on the stores
      this.circles = this.bins.map((bin) => this.binToCircle(bin, this.map));
    },
    fetchBins: async function(center){
      const url = `testbins.json`;
      const response = await fetch(url);
      console.log(center);
      try { 
        console.log(response.json()); 
      } catch(error) {
        console.log('Error happened here!');
        console.error(error);
      }
      return response;
    },
    binToCircle: async function(bin, map, infowindow) {
      const [lng, lat] = bin.geometry.coordinates;
      const circle = new this.google.maps.Circle({
        radius: 50,
        strokeColor: "#579d42",
        strokeOpacity: 0.8,
        strokeWeight: 5,
        center: { lat, lng },
        map,
      });
      circle.addListener("click", () => {
        infowindow.setContent(`${bin.properties.business_name}<br />
          ${bin.properties.address_address}<br />
          Austin, TX ${bin.properties.zip_code}`);
        infowindow.setPosition({ lat, lng });
        infowindow.setOptions({ pixelOffset: new this.google.maps.Size(0, -30) });
        infowindow.open(map);
      });
      return circle;
    }
  },
  async mounted() {
    try {
      this.google = await gmapsInit();
      const geocoder = new this.google.maps.Geocoder();
      // const map = new google.maps.Map(this.$el);
      this.map = new this.google.maps.Map(document.getElementById("map"));

      geocoder.geocode({ address: 'Singapore' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }
        this.map.setCenter(results[0].geometry.location);
        this.map.fitBounds(results[0].geometry.viewport);
        this.map.setZoom(11);
      });

      // Load the GeoJson bins data onto the map 
      try {
        console.log('loading GeoJson here!');
        // file hosted using Google Drive, doesn't bypass CORS issue with Chrome
        // map.data.loadGeoJson('http://drive.google.com/uc?id=1_LivKGKN37UCxgIMlBqJRPzj4lBY8rip');

        // file hosted on Web Server for Chrome, bypasses CORS issues
        this.map.data.loadGeoJson('http://127.0.0.1:8887/src/components/map/data/recyclebinsGeo.json'); 
        // this.map.data.loadGeoJson('http://127.0.0.1:8887/src/components/map/data/testbins.json');
        
        // file taken from local directory, only works on Firefox
        // this.map.data.loadGeoJson('./testbins.json'); 
        // map.data.loadGeoJson(String.raw`C:\Users\darre\Documents\zzz Old files\NUS Y2S2\BT3103\project\bt3103-project\src\components\map\testbins.json`);
        
        // Style data
        // const svgMarker = {
        //   path:
        //     "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        //   fillColor: "blue",
        //   fillOpacity: 0.6,
        //   strokeWeight: 0,
        //   rotation: 0,
        //   scale: 2,
        //   anchor: new this.google.maps.Point(15, 30),
        // };
        this.map.data.setStyle({
          // icon: 'http://127.0.0.1:8887/src/components/map/icons/recycle-bin.png',
          // icon: svgMarker
        });

        // Hide markers
        const toggleAllBins = document.createElement("button");
        toggleAllBins.textContent = "Show All Bins";
        toggleAllBins.classList.add("toggle-all-bins-button");
        this.map.controls[this.google.maps.ControlPosition.TOP_LEFT].push(toggleAllBins);
        toggleAllBins.addEventListener("click", async () => {
          this.map.data.setStyle({visible: true});
        });
      } catch(error) {
        console.log('Error happened here!');
        console.error(error);
      }

      // this.fetchAndRenderBins({lat: 1.3521, lng: 103.8198});

      const infoWindow = new this.google.maps.InfoWindow();
      // console.log(map.data);
      // Show information for each bin when its marker is clicked
      this.map.data.addListener('click', (event) => {
        console.log('event is ----- ' + event);
        const address = event.feature.getProperty('address');
        const postcode = event.feature.getProperty('postcode');
        const position = event.feature.getGeometry().get();
        const content = `<h4>${address}</h4><p>${postcode}</p>`;

        infoWindow.setContent(content);
        infoWindow.setPosition(position);
        infoWindow.setOptions({pixelOffset: new this.google.maps.Size(0, -30)});
        infoWindow.open(this.map);
      });

      // Build and add the search bar
      const card = document.createElement('div');
      const titleBar = document.createElement('div');
      const title = document.createElement('div');
      const container = document.createElement('div');
      const input = document.createElement('input');
      const options = {
        types: ['address'],
        componentRestrictions: {country: 'sg'},
      };

      card.setAttribute('id', 'pac-card');
      title.setAttribute('id', 'title');
      title.textContent = 'Find the nearest bin';
      titleBar.appendChild(title);
      container.setAttribute('id', 'pac-container');
      input.setAttribute('id', 'pac-input');
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', 'Enter an address');
      container.appendChild(input);
      card.appendChild(titleBar);
      card.appendChild(container);
      this.map.controls[this.google.maps.ControlPosition.TOP_RIGHT].push(card);

      // Make the search bar into a Places Autocomplete search bar and select
      // which detail fields should be returned about the place that
      // the user selects from the suggestions
      const autocomplete = new this.google.maps.places.Autocomplete(input, options);
      autocomplete.setFields(['address_components', 'geometry','name']);

      const originMarker = new this.google.maps.Marker({map: this.map});
      originMarker.setVisible(false);
      let originLocation = this.map.getCenter();

      autocomplete.addListener('place_changed', async () => {
        originMarker.setVisible(false);
        originLocation = this.map.getCenter();
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          // User entered the address of a place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert('No address available for input: \'' + place.name + '\'');
          return;
        }

        // Recenter the map to the selected address
        originLocation = place.geometry.location;
        this.map.setCenter(originLocation);
        this.map.setZoom(14);
        console.log(place);

        originMarker.setPosition(originLocation);
        originMarker.setVisible(true);

        const rankedBins = await this.calculateDistances(this.map.data, originLocation);
        this.showBinsList(this.map.data, rankedBins);
      });

      // implement geolocation
      // TODO: implement another button "Search this area" for users to manually pan then search
        // in a particular area instead of using the user's location directly
      // TODO: menu bar popup on the right when user clicks on a particular pin
      // TODO: "Directions": enable users to open a particular pin in Google Maps so 
        // they can navigate there using the full features of the app
      // TODO: implement support for phone web view - plist (permissions list)
      // TODO: doesn't work for network server
      // let infoWindow = new google.maps.InfoWindow();
      const nearMe = document.createElement("button");
      nearMe.textContent = "Show bins near me";
      nearMe.classList.add("custom-map-control-button");
      this.map.controls[this.google.maps.ControlPosition.TOP_CENTER].push(nearMe);
      // nearMe.addEventListener("click", async () => {
      //   // Try HTML5 geolocation.
      //   if (navigator.geolocation) {
      //     navigator.geolocation.getCurrentPosition(
      //       (position) => {
      //         const pos = {
      //           lat: position.coords.latitude,
      //           lng: position.coords.longitude,
      //         };
      //         // const pos = // initialize pos directly to the POsition object?
      //         // infoWindow.setPosition(pos);
      //         // infoWindow.setContent("Location found.");
      //         // infoWindow.open(map);
      //         this.map.setCenter(pos);
      //         this.map.setZoom(14);
      //         console.log("pos.lat = " + pos.lat + ", pos.lng = " + pos.lng);
      //         this.calculateDistances(pos).then((distanceObjects) => {
      //           for (const distObj in distanceObjects) {
      //             const bin = distObj.coordinates;
      //             new this.google.maps.Marker({
      //               position: bin,
      //               map: this.map
      //             }).addListener('click', (event) => {
      //               console.log('event is ----- ' + event);
      //               const address = event.feature.getProperty('address');
      //               const postcode = event.feature.getProperty('postcode');
      //               const position = event.feature.getGeometry().get();
      //               const content = `<h4>${address}</h4><p>${postcode}</p>`;

      //               infoWindow.setContent(content);
      //               infoWindow.setPosition(position);
      //               infoWindow.setOptions({pixelOffset: new this.google.maps.Size(0, -30)});
      //               infoWindow.open(this.map);
      //             });
      //           }
      //         });
      //       });
      //   } else {
      //     // Browser doesn't support Geolocation
      //     this.handleLocationError(false, infoWindow, this.map.getCenter(), this.map);
      //   }
      // });


      
      // //         // call One Map API
      //         Promise.resolve(this.)
      //           .then(() => {
      //             for (const point of this.points) {
      //               // TODO: style each marker to look like a recycle bin
      //               new this.google.maps.Marker({
      //                 position: point,
      //                 map: map
      //               });
      //               // console.log("point.lat = " + point.lat + ", point.lng = " + point.lng);
      //             }
      //             // console.log("this.points.length = " + this.points.length);
      //           });
      //       },
      //       () => {
      //         this.handleLocationError(true, infoWindow, map.getCenter());
      //       }
      //     );
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style scoped>
  div {
    height: 500px;
    width: 1000px;
    /* height: 370px; */
    padding: 0;
    margin: auto;
  }
  #map {
    height: 85%;
    /* height: 470px; */
    /* width: 1000px; */
    overflow: hidden;
    float: left;
    border: thin solid #333;
    margin: auto
  }
  #capture {
    height: 360px;
    width: 480px;
    overflow: hidden;
    float: left;
    background-color: #ECECFB;
    border: thin solid #333;
    border-left: none;
  }
  .custom-map-control-button {
    color: green
  }
  /* Styling for Autocomplete search bar */
  #pac-card {
    background-color: #fff;
    border-radius: 2px 0 0 2px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    font-family: Roboto;
    margin: 10px 10px 0 0;
    -moz-box-sizing: border-box;
    outline: none;
  }
  
  #pac-container {
    padding-top: 12px;
    padding-bottom: 12px;
    margin-right: 12px;
  }
  
  #pac-input {
    background-color: #fff;
    font-family: Roboto;
    font-size: 15px;
    font-weight: 300;
    margin-left: 12px;
    padding: 0 11px 0 13px;
    text-overflow: ellipsis;
    width: 400px;
  }
  
  #pac-input:focus {
    border-color: #4d90fe;
  }
  
  #title {
    color: #fff;
    background-color: #acbcc9;
    font-size: 18px;
    font-weight: 400;
    padding: 6px 12px;
  }
  
  .hidden {
    display: none;
  }

  /* Styling for an info pane that slides out from the left. 
    * Hidden by default. */
  #panel {
    height: 100%;
    width: null;
    background-color: white;
    position: fixed;
    z-index: 1;
    overflow-x: hidden;
    transition: all .2s ease-out;
  }
  
  .open {
    width: 250px;
  }
  
  .place {
    font-family: 'open sans', arial, sans-serif;
    font-size: 1.2em;
    font-weight: 500;
    margin-block-end: 0px;
    padding-left: 18px;
    padding-right: 18px;
  }
  
  .distanceText {
    color: silver;
    font-family: 'open sans', arial, sans-serif;
    font-size: 1em;
    font-weight: 400;
    margin-block-start: 0.25em;
    padding-left: 18px;
    padding-right: 18px;
  }
</style>