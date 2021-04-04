<template>
<div>
  <div class="card" style="height:450px; max-width: 285px; cursor:pointer;" data-toggle="modal" :data-target="'#' + item.name"> 
      <img :src="item.imageUrl" class="card-img-thumbnail rounded border-dark" alt="No image yet!" onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';">
      <div class="card-body">
        <h5 class="card-title">{{item.name}}</h5>
        <h6 class="card-subtitle mb-2">{{item.category}}</h6>        
        {{item.instruction}}
        {{item.disposal}}
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
              <div class="alert alert-success" v-if="item.recyclable">This item is Recyclable.</div>
              <div class="alert alert-danger" v-else>This item is not Recyclable</div>      
            </div>
            <div class="col-7 text-center">
              <strong>Category:</strong>
              <p>{{item.category}}</p>              
              <strong>Instructions:</strong>

              <div class="card w-75 mx-auto">
                <img :src="instruction.imageURL" class="card-img img-thumbnail mx-auto" 
                    onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';">
                <div class="card-body">
                  <p class="card-text">{{instruction.detail}}</p>
                </div>              
              </div>

              <div class="card w-75 mx-auto">
                <img :src="disposal.imageURL" class="card-img img-thumbnail mx-auto" 
                    onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';">
                <div class="card-body">
                  <p class="card-text">{{disposal.detail}}</p>
                </div>              
              </div>

            </div>
          </div>          
        </div>
      </div>
    </div>
  </div>
</div>  
</template>


<script>
import database from '../../firebase.js'

export default {
  data() {
    return {
      instruction: {},
      disposal: {}
    }
  },
  methods: {
    fetchItems:function(){
      database.collection('instructions').where('detail', '==', this.item.instruction).get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id            
            this.instruction = item
        })});  

      database.collection('disposal').where('detail', '==', this.item.disposal).get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            this.disposal = item
        })});  
    }
  },

  // Takes in an item object, and display as a mini information card
  // So that this item card can be reused in different pages on the app
  props: {
    item: Object
  },

  created() {
    this.fetchItems();
  }
}

</script>

<style scoped>

</style>