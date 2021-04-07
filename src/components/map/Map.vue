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
      return {topright: [lat+0.02, lng + 0.02], bottomleft: [lat-0.02, lng-0.02]};
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
      });

      // Load the GeoJson bins data onto the map 
      try {
        console.log('loading GeoJson here!');
        // map.data.loadGeoJson('http://drive.google.com/uc?id=1_LivKGKN37UCxgIMlBqJRPzj4lBY8rip');
        // map.data.loadGeoJson('http://127.0.0.1:8887/src/components/map/recyclebinsnew.json'); 
        this.map.data.loadGeoJson('http://127.0.0.1:8887/src/components/map/testbins.json'); 
        // this.map.data.loadGeoJson('./testbins.json'); 
        // map.data.loadGeoJson(String.raw`C:\Users\darre\Documents\zzz Old files\NUS Y2S2\BT3103\project\bt3103-project\src\components\map\testbins.json`);
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
      
      // implement geolocation
      // TODO: implement another button "Search this area" for users to manually pan then search
        // in a particular area instead of using the user's location directly
      // TODO: menu bar popup on the right when user clicks on a particular pin
      // TODO: "Directions": enable users to open a particular pin in Google Maps so 
        // they can navigate there using the full features of the app
      // TODO: implement support for phone web view - plist (permissions list)
      // TODO: doesn't work for network server
      // let infoWindow = new google.maps.InfoWindow();
      // const locationButton = document.createElement("button");
      // locationButton.textContent = "Show bins near me";
      // locationButton.classList.add("custom-map-control-button");
      // map.controls[this.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
      // locationButton.addEventListener("click", async () => {
      //   // Try HTML5 geolocation.
      //   if (navigator.geolocation) {
      //     navigator.geolocation.getCurrentPosition(
      //       (position) => {
      //         const pos = {
      //           lat: position.coords.latitude,
      //           lng: position.coords.longitude,
      //         };
      //         // infoWindow.setPosition(pos);
      //         // infoWindow.setContent("Location found.");
      //         // infoWindow.open(map);
      //         map.setCenter(pos);
      //         map.setZoom(14);
      //         console.log("pos.lat = " + pos.lat + ", pos.lng = " + pos.lng);

      //         // call One Map API
      //         Promise.resolve(this.getBinsFromOneMap(pos))
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

      //         // get all recycle bins within a certain radius
      //         // iterate over all bins and display on map
      //         // const randomBin = {lat: 1.30367485182574,lng: 103.782905325792};
      //         // const randomBin2 = {lat: 1.30790649968423,lng: 103.782958922488};
      //         // const randomBin3 = {lat: 1.30846777384426,lng: 103.78649944798};
      //         // const randomBinArr = [randomBin, randomBin2, randomBin3];
      //       },
      //       () => {
      //         this.handleLocationError(true, infoWindow, map.getCenter());
      //       }
      //     );
      //   } else {
      //     // Browser doesn't support Geolocation
      //     this.handleLocationError(false, infoWindow, map.getCenter(), map);
      //   }
      // });
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
</style>