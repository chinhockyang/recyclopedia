<template>
<div class="containter">
    <div class="row">      
        <div class="col-12 col-md-8 card mx-auto bg-light rounded">
            <img :src="item.imageUrl" class="card-img-thumbnail mx-auto my-2" style="max-width: 200px;" alt="No image yet!" onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';">
            <h3 class="card-title display-5">{{item.name}}</h3>
            <h5 class="card-subtitle text-muted">{{item.category}}</h5>            
            <div class="alert alert-success mt-3" v-if="item.recyclable">This item is Recyclable.</div>
            <div class="alert alert-danger mt-3" v-else>This item is not Recyclable</div>             
        </div>        
    </div>
    <div class="row">
      <table class="table table-hover table-bordered col-12 col-md-8 mx-auto mt-3">
        <tbody>
          <tr class="bg-light" v-if="item.recyclable">
            <td colspan="2">
              <h5>Basic Instructions</h5>
            </td>
          </tr>
          
          <tr v-if="item.recyclable">
            <td style="width: 30%">
              <img :src="instruction.imageUrl" class="img-thumbnail mx-auto" style="max-width: 150px;" alt="No image yet!" onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';">
            </td>
            <td style="width: 70%" class="align-middle">          
              <p>{{instruction.detail}}</p>
            </td>
          </tr>

          <tr class="bg-light">
            <td colspan="2">
              <h5>Disposal</h5>
            </td>
          </tr>

          <tr>
            <td style="width: 30%">
              <img :src="disposal.imageUrl" class="img-thumbnail mx-auto" style="max-width: 150px;" alt="No image yet!" onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';">
            </td>
            <td style="width: 70%" class="align-middle">          
              <p>{{disposal.detail}}</p>
            </td>
          </tr>
      
          <tr class="bg-light">
            <td colspan="2">
              <h5>Similar Items</h5>
            </td>
          </tr>

          <tr>
            <td colspan="2">          
              <div class="container">
                <ul class="row">
                  <li  v-for="i in similarItems" :key="i.name"
                    class="col-s-6 col-m-4 mx-auto mt-3"                
                  >            
                    <div class="card" style="width: 200px;">
                      <img :src="i.imageUrl" class="card-img-thumbnail mx-auto" style="width: 100%" alt="No image yet!" onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';">                    
                      <p class="card-body">
                        {{i.name}}
                      </p>  
                    </div>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
      
        </tbody>
      </table>
    </div>
</div>  
</template>


<script>
import database from '../../firebase.js'

export default {
  data() {
    return {
      instruction: {},
      disposal: {},
      similarItems: []
    }
  },
  methods: {
    fetchInstructions:function(){
      database.collection('instructions').where('detail', '==', this.item.instruction).get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id            
            this.instruction = item
        })});
    },
    
    fetchDisposal: function() {
      database.collection('disposal').where('detail', '==', this.item.disposal).get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            this.disposal = item
        })});  
    },

    fetchSimilarItem: function(val) {                  
        database.collection('items').where('name', '==', val).get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            if (item.approved){
              this.similarItems.push(item)
            }             
        })});      
    }    
  },

  watch: {
    item: function() {        
        this.similarItems = [];
        this.fetchInstructions();
        this.fetchDisposal();        
        for (let i = 0; i < this.item.similarItem.length; i++) {          
          this.fetchSimilarItem(this.item.similarItem[i]);    
        }
    }
  },

  props: {
    item: Object
  },

  created() {    
    this.fetchInstructions();
    this.fetchDisposal();
    for (let i = 0; i < this.item.similarItem.length; i++) {
      this.fetchSimilarItem(this.item.similarItem[i]);    
    }
  }
}

</script>

<style scoped>
ul{    
    list-style-type: none;
    padding: 0;    
}

</style>