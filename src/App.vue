<template>
  <div>
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
