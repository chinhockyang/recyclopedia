<template>
<div class="tab-pane fade show active" id="browse" role="tabpanel" aria-labelledby="browse-tab">    
    <category-navbar></category-navbar>
    <router-view></router-view>    
</div>
</template>

<script>
import CategoryNavBar from './CategoryNavBar.vue'

export default {
  data(){
    return{
        categoryOption: [
                   "Plastic",
                   "Paper",
                   "Glass",
                   "Metal",
                   "Electronics",
                   "Others"
               ]
    }
  },

  components: {
      'category-navbar': CategoryNavBar      
  }
}

</script>

<style scoped>

.router-link-active{
    background: #444;
    color: #eee;
}

</style>