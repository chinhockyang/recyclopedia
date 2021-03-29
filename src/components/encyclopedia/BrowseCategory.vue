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
#browse-category {
  text-align: center;
}

ul{    
    list-style-type: none;    
    display: flex;
    flex-wrap: wrap;    
}

li {
  width: 46%;
  margin-left: 2%;
  margin-right: 2%;
}

#itemsList{
    width: 100%;
    max-width: 1000px;
    margin: 30px auto;
    padding: 0 5px;
    box-sizing: border-box;
}

.router-link-active{
    background: #444;
    color: #eee;
}

</style>