<template>
  <div>    
      <encyclopedia-nav-bar></encyclopedia-nav-bar>
      <router-view></router-view>  
  </div>
</template>


<script>
import EncyclopediaNavBar from './EncyclopediaNavBar.vue'

export default {
  components: {
      'encyclopedia-nav-bar': EncyclopediaNavBar
  }
}

</script>

<style scoped>
* {
    text-align: center;
}
</style>