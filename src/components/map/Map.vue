<template>
  <div id="parent">
    <h1 class="display-3 text-center my-3">Find My Bin</h1>
    <h4 class="text-center my-3">Singapore has more than 13,000 recycling bins and collection points.</h4>
    <p class="text-center my-3">Check the boxes to choose which types of bin or collection point you want to see, <br>and click on the icon for more details on its exact location!</p><br>
    <div id="checkboxes" class="text-center w-100 p-3 container">
      <ul>
        <li v-for="binType in binTypes" 
          :key="binType.id" 
          class="list-inline-item">
          <label v-b-tooltip.hover.bottom="binType.info">
            <input 
            type="checkbox" 
            :id="binType.id"
            :value="binType.id"
            v-model="checkedBinTypes"
            @change="setFilter($event)"
            autocomplete="off"
            >
            {{binType.title}}
          </label><br>
        </li>
      </ul>
      <!-- <div></div> -->
    </div>
    <div id="map" class="w-100 p-3 container-fluid"></div>
  </div>
</template>

<script>
import gmapsInit from './Map.js';

export default {
  data () {
    return {
      GMaps_API_KEY: 'AIzaSyB4Qf39SqcEAphfabQgzdx7eaeGA-t8he0',
      map: null,
      binTypes: [
                  {
                    'title': 'Recycle Bins',
                    'id': 'recyclebins',
                    'info': 'Regular recycling bins, for paper, plastic and cans.'
                  }, 
                  {
                    'title': 'E-Waste',
                    'id': 'ewaste',
                    'info': 'Recycle electronic waste at these points!'
                  },
                  {
                    'title': 'Cash-For-Trash',
                    'id': 'cashfortrash',
                    'info': 'Cash-for-Trash is an incentive programme by Public Waste Collectors, where residents may bring their recyclables to the Cash-for-Trash stations and cash is given in exchange for recyclables.'
                  }, 
                  {
                    'title': '2nd Hand Collection Points',
                    'id': 'secondhandcollecn',
                    'info': 'Drop off your second-hand items here!'
                  }, 
                  {
                    'title': 'Reverse Vending Machines',
                    'id': 'rvm',
                    'info': 'Reverse Vending Machines (RVMs) are machines which are able to identify, sort and collect empty plastic drink bottles and aluminium drink cans and reward users when the containers have been accepted by the machines.'
                  }, 
                  {
                    'title': 'Lighting Waste',
                    'id': 'lighting',
                    'info': 'Recycle light bulbs, fluorescent tubes, rechargeable batteries, power banks at IKEA stores.'
                  }
                ],
      checkedBinTypes: [],
      markersLatLng: []
    }
  },
  
  methods: {
    handleLocationError: function(browserHasGeolocation, infoWindow, pos, map) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    },
    setFilter: function($event) {
      console.log('checkbox clicked! event.checked is...');
      console.log($event.target.checked);
      console.log('checkedBinTypes is...');
      console.log(this.checkedBinTypes);
      const showMarker = $event.target.checked;
      const binType = $event.target.id;
      this.filterMarkers(this.map.data, binType, showMarker);
    },
    filterMarkers: function(data, binType, showMarker) {
      data.forEach(function(feature) {
        if (feature.getProperty('binType') === binType){
          feature.setProperty('showMarker', showMarker);
        }
      })
    },
    markUserLocation: function(navigator, map, infoWindow, zoom) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos_obj = {
              lat: position.coords.latitude, 
              lng: position.coords.longitude
            };
            this.markLocation(map, infoWindow, pos_obj, "You are here", zoom);
          });
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, infoWindow, map.getCenter(), map);
      }
    },
    markLocation: function(map, infoWindow, pos_obj, content, zoom) {
      map.setCenter(pos_obj);
      map.setZoom(zoom);
      if (this.isLocationFree(pos_obj)) {
        const marker = new this.google.maps.Marker({
          position: pos_obj,
          map: map
        });
        const pos_arr = [pos_obj.lat, pos_obj.lng];
        this.markersLatLng.push(pos_arr);   
        marker.addListener("click", () => {
          infoWindow.setPosition(pos_obj);
          infoWindow.setContent(content);
          infoWindow.setOptions({pixelOffset: new this.google.maps.Size(0, -30)});
          infoWindow.open(map);
        });
      } else {
        return;
      }
    },
    isLocationFree: function(pos_obj) {
      const pos_arr = [pos_obj.lat, pos_obj.lng]
      for (var i = 0, l = this.markersLatLng.length; i < l; i++) {
        if (this.markersLatLng[i][0] === pos_arr[0] && this.markersLatLng[i][1] === pos_arr[1]) {
          console.log(this.markersLatLng.length);
          return false;
        }
      }
      return true;
    }
  },
  async mounted() {
    try {
      this.google = await gmapsInit();
      this.map = new this.google.maps.Map(document.getElementById("map"));
      // Map centres on Singapore by default
      this.map.setCenter({lat: 1.352083, lng: 103.819836})
      this.map.setZoom(11);
      const infoWindow = new this.google.maps.InfoWindow();

      // Pan to user's location upon page load if navigator enabled
      this.markUserLocation(navigator, this.map, infoWindow, 15);

      // Load the GeoJson bins data onto the map 
      try {
        // file hosted on Google Cloud Platform
        const GCPpath = 'https://storage.googleapis.com/map-bins-data/';
        this.map.data.loadGeoJson(GCPpath + 'data/recyclebinsGeo.json');
        this.map.data.loadGeoJson(GCPpath + 'data/ewasteGeo.json');
        this.map.data.loadGeoJson(GCPpath + 'data/rvmGeo.json');
        this.map.data.loadGeoJson(GCPpath + 'data/secondhandcollecnGeo.json');
        this.map.data.loadGeoJson(GCPpath + 'data/cashfortrashGeo.json');
        this.map.data.loadGeoJson(GCPpath + 'data/lightingGeo.json'); 
        
        // style icons based on binType
        this.map.data.setStyle(function(feature) {
          // choose icon based on binType
          var iconPath = '';
          switch(feature.getProperty('binType')) {
            case 'recyclebins':
              // iconPath = webServer + 'icons/recycle.png';
              iconPath = GCPpath + 'icons/recycle.png';
              break;
            case 'ewaste':
              // iconPath = webServer + 'icons/magnet.png';
              iconPath = GCPpath + 'icons/magnet.png';
              break;
            case 'cashfortrash':
              iconPath = 'http://maps.google.com/mapfiles/ms/icons/dollar.png';
              break;
            case 'secondhandcollecn':
              // iconPath = webServer + 'icons/toy.png';
              iconPath = GCPpath + 'icons/toy.png';
              break;
            case 'rvm':
              iconPath = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
              break;
            case 'lighting':
              // iconPath = webServer + 'icons/lamp.png';
              iconPath = GCPpath + 'icons/lamp.png';
              break;
          }
          return /** @type {this.google.maps.Data.StyleOptions } */ {
            // showMarker acts as a toggle for us to show or 
            // hide the marker of the corresponding data feature
            visible: feature.getProperty('showMarker'),
            icon: {
              url: iconPath,
            }
          };
        });

      } catch(error) {
        console.log('Error happened here!');
        console.error(error);
      }

      // InfoWindow pops up with details for each bin when its marker is clicked
      this.map.data.addListener('click', (event) => {
        console.log('event is ----- ' + event);
        const address = event.feature.getProperty('address');
        const postcode = event.feature.getProperty('postcode');
        const position = event.feature.getGeometry().get();
        // "open in Google Maps" button in infoWindow
        const lat = position.lat();
        const lng = position.lng();
        const content = `
                  <div style="margin-left:20px; margin-bottom:20px;">
                    <h5>${address}</h5>
                    <p>${postcode}</p><br>
                    <button class="open-in-gmaps" onclick="window.open('https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}', '_blank')">
                      Open in Google Maps
                    </button>
                  </div>
                      `;
        // TODO: style Info window nicely
        infoWindow.setContent(content);
        infoWindow.setPosition(position);
        // Info window pops up above marker
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

      let originLocation = this.map.getCenter();

      autocomplete.addListener('place_changed', async () => {
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
        const originLatLng = { 
          lat: originLocation.lat(), 
          lng: originLocation.lng()
        };
        this.markLocation(this.map, infoWindow, originLatLng, place.name);
      });

      const nearMe = document.createElement("button");
      nearMe.textContent = "Pan to my location";
      nearMe.classList.add("custom-map-control-button");
      this.map.controls[this.google.maps.ControlPosition.TOP_CENTER].push(nearMe);
      nearMe.addEventListener("click", async () => {
        this.markUserLocation(navigator, this.map, infoWindow);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style scoped>
  #parent {
    height: 140vh;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
    margin: auto;
    white-space: normal;
  }
  #checkboxes {
    padding-left: 15px;
    padding-right: 15px;
    margin: auto;
    white-space: normal;
  }
  ul {
    list-style-type: none;
    overflow: hidden;
    float: center;
    margin: 0 auto;
  }
  :checked {
    background-color:#4d90fe !important;
  }
  #map {
    height: 60%;
    overflow: hidden;
    float: left;
    border: thin solid #333;
    margin: auto;
    padding-bottom: 15px
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