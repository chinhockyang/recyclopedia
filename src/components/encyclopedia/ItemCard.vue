<template>
<div>
  <div class="card" style="height:450px; max-width: 285px; cursor:pointer;" data-toggle="modal" :data-target="'#' + item.name"> 
      <img :src="item.imageUrl" class="card-img-thumbnail rounded border-dark" alt="No image yet!" onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';">
      <div class="card-body">
        <h5 class="card-title">{{item.name}}</h5>
        <h6 class="card-subtitle mb-2">{{item.category}}</h6>
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
          <div class="row">
            <div class="col-5">
              <img :src="item.imageUrl" class="img w-100" 
                    onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';">
            </div>
            <div class="col-7">
              <strong>Category:</strong>
              <p>{{item.category}}</p>              
              <strong>Instructions:</strong>
              <p>{{item.description}}</p>
              <div class="alert alert-success" v-if="item.recyclable">This item is Recyclable.</div>
              <div class="alert alert-danger" v-else>This item is not Recyclable</div>      
            </div>
          </div>          
        </div>
      </div>
    </div>
  </div>
</div>  
</template>


<script>

export default {
  // Takes in an item object, and display as a mini information card
  // So that this item card can be reused in different pages on the app
  props: {
    item: Object
  }
}

</script>

<style scoped>

</style>