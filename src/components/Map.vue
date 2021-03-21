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

export default {
  data () {
    return {
      // map: ,
      src: "http://drive.google.com/uc?id=1WrA6xSjaGgZel3Ii8JZR_cKzRrCmv4ag",
      // src: "http://drive.google.com/uc?id=1xG70dBfmZVsuLt27GyV9PmY-c1PF9OMk",
      // kmlLayer
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
    getKMradius: function(lat,lng) {
      // return coordinates of bounding box of 2km x 2km
        // just need 2 corners
      return {topright: [lat+0.01, lng + 0.01], bottomleft: [lat-0.01, lng-0.01]};

    },
    getExtentsQuery: function(bb) {
      var returnStr = bb.topright[0] + ",%20" + bb.topright[1] + "," + bb.bottomleft[0] + ",%20" + bb.bottomleft[1];
      return returnStr;
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
      let infoWindow = new google.maps.InfoWindow();
      const locationButton = document.createElement("button");
      locationButton.textContent = "Pan to Current Location";
      locationButton.classList.add("custom-map-control-button");
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
      locationButton.addEventListener("click", () => {
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