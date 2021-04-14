<template>
<div>  
  <div class="card" style="height:450px; max-width: 285px; cursor:pointer;" data-toggle="modal" :data-target="'#' + item.name"> 
      <img 
        :src="item.imageUrl" 
        class="card-img-thumbnail rounded border-dark" 
        alt="No image yet!" 
        onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';"
        style="width: 100%; height: 55%;">
      <div class="card-body">
        <h5 class="card-title">
          <span v-if="item.name.length > 30" style="font-size: 70%;">
            {{item.name}}
          </span>
          <span v-else>
            {{item.name}}
          </span>
        </h5>        
        <h6 class="card-subtitle mb-2 badge badge-secondary">{{item.category}}</h6><br>      
        <p class="card-text badge badge-success" v-if="item.recyclable">Recyclable</p>
        <p class="card-text badge badge-danger" v-else>Not Recyclable</p>        
      </div>            
  </div>

  <div class="modal fade" :id="item.name" tabindex="-1" role="dialog" aria-labelledby="itemModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">        
        <div class="modal-header">
          <h3 class="modal-title display-5" id="itemModalLabel">{{item.name}}</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <item-info :item="item"></item-info>
        </div>
      </div>
    </div>
  </div>
</div>  
</template>


<script>
//import database from '../../firebase.js'
import ItemInfo from './ItemInfo.vue'

export default {

  data() {
    return {
      instruction: {},
      disposal: {}
    }
  },
  
  // Takes in an item object, and display as a mini information card
  // So that this item card can be reused in different pages on the app
  props: {
    item: Object
  },

  components: {
    'item-info': ItemInfo
  }
}

</script>

<style scoped>

</style>