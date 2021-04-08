<template>
  <div>
    <h3>Find My Bin</h3>
    <div id="map"></div>
    <div>
      <ul>
        <li v-for="binType in binTypes" :key="binType.id">
          <input 
            type="checkbox" 
            :id="binType.id"
            :value="binType.id"
            @change="setFilter($event)">
          <label :for="binType.id">{{binType.title}}</label><br>
        </li>
      </ul>

      <!-- <input type="checkbox" id="recyclebins" name="recyclebins" value="recyclebins">
      <label for="recyclebins">Recycle Bins</label><br>
      <input type="checkbox" id="ewaste" name="ewaste" value="ewaste">
      <label for="ewaste">E-Waste</label><br>
      <input type="checkbox" id="cashfortrash" name="cashfortrash" value="cashfortrash">
      <label for="cashfortrash">Cash-For-Trash</label><br>
      <input type="checkbox" id="secondhandcollecn" name="secondhandcollecn" value="secondhandcollecn">
      <label for="secondhandcollecn">2nd Hand Goods Collection Points</label><br>
      <input type="checkbox" id="rvm" name="rvm" value="rvm">
      <label for="rvm">Reverse Vending Machines</label><br> -->
    </div>
  </div>
</template>

<script>
import gmapsInit from './Map.js';

export default {
  data () {
    return {
      map: null,
      src: "http://drive.google.com/uc?id=1WrA6xSjaGgZel3Ii8JZR_cKzRrCmv4ag", // kml file source
      points: [],
      OneMap_API_KEY: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjczMjcsInVzZXJfaWQiOjczMjcsImVtYWlsIjoiZGFycmVsbC5sYWlAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNjE3NzAyNzU4LCJleHAiOjE2MTgxMzQ3NTgsIm5iZiI6MTYxNzcwMjc1OCwianRpIjoiNGU2ZjkzMmJhODQxNTRkM2UwMzJkZTFlZGEwNTcyNzUifQ.X-pQ8Z3Wkb6u-7BB7Ud7t2gEu4dzukZ9lkyEfAGpZ34',
      OneMap_token_expiry: 9999999999,
      circles: [],
      bins: [],
      binTypes: [
                  {
                    'title': 'Recycle Bins',
                    'id': 'recyclebins'
                  }, 
                  {
                    'title': 'E-Waste',
                    'id': 'ewaste'
                  },
                  {
                    'title': 'Cash-For-Trash',
                    'id': 'cashfortrash'
                  }, 
                  {
                    'title': '2nd Hand Collection Points',
                    'id': 'secondhandcollecn'
                  }, 
                  {
                    'title': 'Reverse Vending Machines',
                    'id': 'rvm'
                  }, {
                    'title': 'Lighting Waste',
                    'id': 'lighting'
                  }
                ],
      checkedBinTypes: []
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
    setFilter: function($event) { // (data, showMarker, binType) {
      console.log('checkbox clicked! event.checked is...');
      console.log($event.target.checked);
      const showMarker = $event.target.checked;
      const binType = $event.target.id
      this.map.data.forEach(function(feature) {
        // console.log('binType is....');
        // console.log(binType);
        if (feature.getProperty('binType') === binType){
          // console.log('feature showMarker is...');
          // console.log(feature.getProperty('showMarker'));
          feature.setProperty('showMarker', showMarker);
        }
      })
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
      // const map = new google.maps.Map(this.$el);
      this.map = new this.google.maps.Map(document.getElementById("map"));
      this.map.setCenter({lat: 1.352083, lng: 103.819836})

      const geocoder = new this.google.maps.Geocoder();
      geocoder.geocode({ address: 'Singapore' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }
        console.log("map center is at...");
        console.log(results[0].geometry.location.lat());
        console.log(results[0].geometry.location.lng());
        // this.map.setCenter(results[0].geometry.location);
        this.map.setCenter({lat: results[0].geometry.location.lat()+0.5, lng: results[0].geometry.location.lng()})
        console.log("map center is now at at...");
        console.log(this.map.getCenter().lat());
        console.log(this.map.getCenter().lng());
        this.map.fitBounds(results[0].geometry.viewport);
        this.map.setZoom(11);
      });

      // Load the GeoJson bins data onto the map 
      try {
        console.log('loading GeoJson here!');
        // file hosted using Google Drive, doesn't bypass CORS issue with Chrome
        // map.data.loadGeoJson('http://drive.google.com/uc?id=1_LivKGKN37UCxgIMlBqJRPzj4lBY8rip');

        // file hosted on Web Server for Chrome, bypasses CORS issues
        const webServer = 'http://127.0.0.1:8887/src/components/map/'
        this.map.data.loadGeoJson(webServer + 'data/recyclebinsGeo.json'); 
        this.map.data.loadGeoJson(webServer + 'data/ewasteGeo.json');
        this.map.data.loadGeoJson(webServer + 'data/cashfortrashGeo.json');
        this.map.data.loadGeoJson(webServer + 'data/rvmGeo.json');
        this.map.data.loadGeoJson(webServer + 'data/secondhandcollecnGeo.json');
        this.map.data.loadGeoJson(webServer + 'data/lightingGeo.json');
        // this.map.data.loadGeoJson('http://127.0.0.1:8887/src/components/map/data/testbins.json');
        
        // file taken from local directory, only works on Firefox
        // this.map.data.loadGeoJson('./testbins.json'); 
        // map.data.loadGeoJson(String.raw`C:\Users\darre\Documents\zzz Old files\NUS Y2S2\BT3103\project\bt3103-project\src\components\map\testbins.json`);
        
        // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        this.map.data.setStyle(function(feature) {
          // choose icon based on binType
          var iconPath = '';
          switch(feature.getProperty('binType')) {
            case 'recyclebins':
              iconPath = webServer + 'icons/recycle.png';
              break;
            case 'ewaste':
              iconPath = webServer + 'icons/magnet.png';
              break;
            case 'cashfortrash':
              break;
            case 'secondhandcollecn':
              iconPath = webServer + 'icons/toy.png';
              break;
            case 'rvm':
              break;
            case 'lighting':
              iconPath = webServer + 'icons/lamp.png';
              break;
          }
          // console.log('feature showMarker is...');
          // console.log(feature.getProperty('showMarker'));
          return /** @type {this.google.maps.Data.StyleOptions } */ {
            visible: feature.getProperty('showMarker'),
            icon: iconPath
          };
        });

      } catch(error) {
        console.log('Error happened here!');
        console.error(error);
      }


      const infoWindow = new this.google.maps.InfoWindow();
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

      // TODO: implement another button "Search this area" for users to manually pan then search
        // in a particular area instead of using the user's location directly
      // TODO: menu bar popup on the right when user clicks on a particular pin
      // TODO: "Directions": enable users to open a particular pin in Google Maps so 
        // they can navigate there using the full features of the app
      // TODO: implement support for phone web view - plist (permissions list)
      // TODO: doesn't work for network server
      // TODO: restrict displayed markers to only within bounds of viewport
      // let infoWindow = new google.maps.InfoWindow();
      const nearMe = document.createElement("button");
      nearMe.textContent = "Pan to my location";
      nearMe.classList.add("custom-map-control-button");
      this.map.controls[this.google.maps.ControlPosition.TOP_CENTER].push(nearMe);
      nearMe.addEventListener("click", async () => {
      //   // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              this.map.setCenter(pos);
              this.map.setZoom(15);  
            });
        } else {
          // Browser doesn't support Geolocation
          this.handleLocationError(false, infoWindow, this.map.getCenter(), this.map);
        }
      });
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