<template>
<div class="container tab-pane fade show active" id="add" role="tabpanel" aria-labelledby="add-tab">
    <h1>Add Item to Recyclopedia!</h1>
    <div class="row p-3 mb-5">
        <div class="col-1 col-m-2 col-l-3"></div>
        <div class="col-10 col-m-8 col-l-6 bg-light rounded p-3">            
            <form class="containter px-3"> 
                <div class="form-group">
                    <label>Item Name:</label>
                    <input type="text" class="form-control" v-model="item.name" required/>
                </div>

                <p style="color:black">Is the Item Recyclable?</p>
                <div class="form-check form-check-inline">        
                    <input class="form-check-input" type="radio" id="recyclable" v-model="item.recyclable" :value=true>            
                    <label class="form-check-label" for="recyclable">Yes</label>            
                </div>      
                <div class="form-check form-check-inline">            
                    <input class="form-check-input" type="radio" id="non-recyclable" v-model="item.recyclable" :value=false>
                    <label class="form-check-label" for="non-recyclable">No</label>            
                </div><br><br>

                <div class="form-group">            
                    <label>Category:</label>
                    <select class="form-control" v-model="item.category">          
                        <option  v-for="option in categoryOption" :key="option">
                            {{option}}
                        </option>
                    </select>            
                </div>

                <div class="form-group">
                    <label>Additional Instructions:</label><br>      
                    <textarea class="form-control" v-model="item.description" form="add-item-form">
                        Enter text here...
                    </textarea>
                </div>
                <button type="submit" class="btn btn-success" v-on:click.prevent="addItem">Add Item</button>
            </form>

        </div>
        <div class="col-1 col-m-2 col-l-3"></div>
    </div>
</div>
</template>

<script>
import database from '../../firebase.js'

export default {
    data(){
        return{           
            itemsList: [],
            categoryOption: [
                   "Plastic",
                   "Paper",
                   "Glass",
                   "Metal",
                   "Electronics",
                   "Others"
               ],
           item:{
               name:"",
               category: "",               
               recyclable: false,
               amountRecycled: 0,
               amountSearched: 0,
               imageUrl: "",
               description: "",               
               approved: false
           }
        }
    },
    
    methods:{
      addItem:function(){
          if (this.item.name.length == 0) {
              alert("Please fill in a name for your item!");
              return;
          } else if (this.item.category.length == 0) {
              alert("Please give your item a category!");
              return;
          }

          var lowerCaseItemsList = [];
          for (let i in this.itemsList) {              
              lowerCaseItemsList.push(this.itemsList[i].toLowerCase());
          }
          
          if (lowerCaseItemsList.includes(this.item.name.toLowerCase())) {              
              alert("You cannot add an existing item");              
          } else {
              database.collection('items').add(this.item);
              alert(this.item.name + " is being submitted!");
              this.item.name="";
              this.item.category="";
          }          
      },

      fetchItems:function(){
        database.collection('items').get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id            
            this.itemsList.push(item.name) 
            })})    
      }      
  },
  
  created() {
    this.fetchItems();
  }
}
</script>

<style scoped>

</style>
