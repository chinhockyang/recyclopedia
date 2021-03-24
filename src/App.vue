<template>
  <div>
    <h1>Recyclopedia <img src="https://www.flaticon.com/svg/vstatic/svg/861/861054.svg?token=exp=1616520941~hmac=658e5a8f1d34c353f35d1f601baaf2d8" width="30" height="30"></h1>
    <nav-menu></nav-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import NavMenu from './components/NavMenu.vue'

export default {
  components: {
    'nav-menu': NavMenu
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
