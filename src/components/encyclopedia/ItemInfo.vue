<template>
<div class="containter">
    <div class="row">      
        <div class="col-12 col-md-8 card mx-auto bg-light rounded">
            <img 
            :src="item.imageUrl" 
            class="card-img-thumbnail 
            mx-auto mb-3 mt-1"
            style="max-width: 300px; max-height: 300px;" 
            alt="No image yet!" 
            onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';">
            <h3 class="card-title display-5">{{item.name}}</h3>
            <h5 class="card-subtitle text-muted mt-2">Category: <span class="badge badge-secondary">{{item.category}}</span></h5>            
            <div class="alert alert-success mt-3" v-if="item.recyclable">This item is Recyclable.</div>
            <div class="alert alert-danger mt-3" v-else>This item is not Recyclable</div>             
        </div>        
    </div>
    <div class="row">
      <table class="table table-hover table-bordered col-12 col-md-8 mx-auto mt-3 mb-0">
        <tbody>
          <tr class="bg-light" v-if="item.recyclable && item.instruction">
            <td colspan="2">
              <h5>Basic Instructions</h5>
            </td>
          </tr>
          
          <tr v-if="item.recyclable && item.instruction" style="overflow-x: hidden;">
            <td style="width: 40%">
              <img :src="instruction.imageUrl" class="img-thumbnail mx-auto" style="width: 300px;" alt="No image yet!" onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';">
            </td>
            <td style="width: 60%" class="align-middle">          
              <p>{{instruction.detail}}</p>
            </td>
          </tr>

          <tr class="bg-light">
            <td colspan="2">
              <h5>Disposal</h5>
            </td>
          </tr>

          <tr>
            <td style="width: 40%">
              <img :src="disposal.imageUrl" class="img-thumbnail mx-auto" style="width: 300px;" alt="No image yet!" onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';">
            </td>
            <td style="width: 60%" class="align-middle">          
              <p>{{disposal.detail}}</p>
            </td>
          </tr>
          <tr class="bg-light" v-if="similarItems.length > 0">
            <td colspan="2">
              <h5>Similar Items</h5>
            </td>
          </tr>              
        </tbody>
      </table>
      <table class="table table-hover col-12 col-md-8 mx-auto mt-0" style="display: block; overflow-x: auto; white-space: nowrap;" v-if="similarItems.length > 0">
        <tbody>          
          <tr>
            <td colspan="2">          
              <div class="container" style="pointer-events:none;"> 
                <ul>                                            
                  <li  v-for="i in similarItems" :key="i.name"
                    class="mt-3 mx-2" style="display: inline-block;"
                  >                                
                    <div class="card" style="width: 200px; height: 400px; white-space: normal;">                      
                      <img 
                        :src="i.imageUrl" 
                        class="card-img-thumbnail" 
                        style="width: 100%; height:50%;" 
                        alt="No image yet!" 
                        onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';"
                      >

                      <span class="card-body" style="overflow-wrap: break-word; word-wrap: break-word;">
                        <p v-if="i.name.length > 100" style="font-size: 80%;">                            
                              {{i.name.substring(0,100)}}                            
                              <span :title="i.name">...</span>
                        </p>
                        <p v-else style="font-size: 85%;">
                            {{i.name}}                                                        
                        </p>                                                  
                          <span class="badge badge-secondary">{{i.category}}</span><br>
                          <span class="badge badge-success" v-if="i.recyclable">Recyclable</span>
                          <span class="badge badge-danger" v-else>Not Recyclable</span>                        
                      </span>                                                      
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