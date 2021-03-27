<template>
<div id=add-item>
    <h1>Add Item to Recyclopedia!</h1>
    <form id="add-item-form">
        <label>Item Name:</label><br>
        <input type="text" v-model="item.name" required/>

        <p style="color:black">Is the Item Recyclable?</p>
        <label for="recyclable">Yes</label>
        <input type="radio" id="recyclable" v-model="item.recyclable" :value=true>
        <label for="non-recyclable">No</label>
        <input type="radio" id="non-recyclable" v-model="item.recyclable" :value=false><br><br>

        <label>Category:</label><br>
        <select v-model="item.category">          
          <option  v-for="option in categoryOption" :key="option">
            {{option}}
          </option>
        </select><br><br>

        <label>Additional Instructions:</label><br>      
        <textarea row="10" cols="40" v-model="item.description" form="add-item-form">
            Enter text here...
        </textarea><br><br>

        <button v-on:click.prevent="addItem">Add Item</button>        
    </form>
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
#add-item *{
    box-sizing: border-box;
}

#add-item{
    margin: 20px auto;
    max-width: 500px;
}
p{
    align-content: center;
    color:ivory;
}
label{    
    margin: 20px 0 10px;
    width:50%;
    align-content:left;
}
input[type="text"]{    
    padding: 8px;
    width:50%;
}
</style>
