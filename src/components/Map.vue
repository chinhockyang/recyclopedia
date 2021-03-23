<template>
  <div>
    <h3>Find My Bin</h3>
    <div id="map"></div>
    <!-- <div id="capture"></div> -->
    <!-- <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4Qf39SqcEAphfabQgzdx7eaeGA-t8he0&callback=initMap"></script> -->
  </div>
</template>

<script>
// import axios from 'axios'
import gmapsInit from './Map.js';
import axios from 'axios';

export default {
  data () {
    return {
      // map: ,
      src: "http://drive.google.com/uc?id=1WrA6xSjaGgZel3Ii8JZR_cKzRrCmv4ag",
      // src: "http://drive.google.com/uc?id=1xG70dBfmZVsuLt27GyV9PmY-c1PF9OMk",
      // kmlLayer
      points: []
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
    getKMradius: function(lat, lng) {
      // return coordinates of bounding box of 2km x 2km
        // just need 2 corners
      return {topright: [lat+0.01, lng + 0.01], bottomleft: [lat-0.01, lng-0.01]};

    },
    getExtentsQuery: function(bb) {
      let extents = bb.topright[0] + ",%20" + bb.topright[1] + "," + bb.bottomleft[0] + ",%20" + bb.bottomleft[1];
      const OneMap_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjczMjcsInVzZXJfaWQiOjczMjcsImVtYWlsIjoiZGFycmVsbC5sYWlAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNjE2MDU1ODM5LCJleHAiOjE2MTY0ODc4MzksIm5iZiI6MTYxNjA1NTgzOSwianRpIjoiNWM5M2I4YjEyY2RhZmMxZTExMjg4Yzc1NDkyZjY2ODYifQ.u6nK05TZgIWESiYV5YU1caHs7Z_pWsaZJEPwhYQGBbo';
      let query = `https://developers.onemap.sg/privateapi/themesvc/retrieveTheme?queryName=recyclingbins&token=${OneMap_API_KEY}&extents=` + extents;
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
            console.log("pushing bin into this.points now!");
            console.log("latlng_arr[0] = " + latlng_arr[0] + ", latlng_arr[1] = " + latlng_arr[1]);
            console.log("this.points has length " + this.points.length + " now");
          }
        })
      })
    } 
  },
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      // const map = new google.maps.Map(this.$el);
      const map = new google.maps.Map(document.getElementById("map"));

      geocoder.geocode({ address: 'Singapore' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }
        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });

      var layer_bins = new google.maps.KmlLayer(this.src, {
        suppressInfoWindows: true,
        preserveViewport: false,
        map: map
      });

      console.log("layer_bins.KmlLayer: " + layer_bins.KmlLayer);
      layer_bins.addListener('click', function(event) {
        var content = event.featureData.infoWindowHtml;
        var testimonial = document.getElementById('capture');
        testimonial.innerHTML = content;
      });
      
      // implement geolocation
      // TODO: implement another button "Search this area" for users to manually pan then search
        // in a particular area instead of using the user's location directly
      // TODO: menu bar popup on the right when user clicks on a particular pin
      // TODO: "Directions": enable users to open a particular pin in Google Maps so 
        // they can navigate there using the full features of the app
      // TODO: implement support for phone web view - plist (permissions list)
      // TODO: doesn't work for network server
      let infoWindow = new google.maps.InfoWindow();
      const locationButton = document.createElement("button");
      locationButton.textContent = "Show bins near me";
      locationButton.classList.add("custom-map-control-button");
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
      locationButton.addEventListener("click", async () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              infoWindow.setPosition(pos);
              infoWindow.setContent("Location found.");
              infoWindow.open(map);
              map.setCenter(pos);
              map.setZoom(14);
              console.log("pos.lat = " + pos.lat + ", pos.lng = " + pos.lng);

              // call One Map API
              Promise.resolve(this.getBinsFromOneMap(pos))
                .then(() => {
                  for (const point of this.points) {
                    new google.maps.Marker({
                      position: point,
                      map: map
                    });
                    console.log("point.lat = " + point.lat + ", point.lng = " + point.lng);
                  }
                  console.log("this.points.length = " + this.points.length);
                });

              // get all recycle bins within a certain radius
              // iterate over all bins and display on map
              // const randomBin = {lat: 1.30367485182574,lng: 103.782905325792};
              // const randomBin2 = {lat: 1.30790649968423,lng: 103.782958922488};
              // const randomBin3 = {lat: 1.30846777384426,lng: 103.78649944798};
              // const randomBinArr = [randomBin, randomBin2, randomBin3];
            },
            () => {
              this.handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          // Browser doesn't support Geolocation
          this.handleLocationError(false, infoWindow, map.getCenter(), map);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style scoped>
  html, body {
    height: 370px;
    padding: 0;
    margin: 0;
  }
  #map {
    height: 360px;
    width: 600px;
    overflow: hidden;
    float: left;
    border: thin solid #333;
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