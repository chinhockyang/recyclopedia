<template>
  <div>      
    <h1>Welcome to the Recycling Encyclopedia!</h1>
    <h2>Search to see if something is recyclable!</h2>
    
    <search-tool 
      :itemsList="itemsList"
      @searched="searchItem">
    </search-tool>         

    <item-card 
      :item="item"
      v-show="itemSearched">
    </item-card>    
  
    <p>Not seeing what you are looking for?</p>
    <a href='/encyclopedia/add' exact>Request for it to be added to Recyclopedia!</a><br><br>
  </div>
</template>


<script>
import database from '../../firebase.js'
import SearchTool from './SearchTool.vue'
import ItemCard from './ItemCard.vue'
import firebase from "firebase"

export default {  
  data(){
    return{
        //itemsList contains all the items in database
        //use this list of items to pass to the Search Tool as prop
        itemsList: [],        

        //itemSearched is what is passed from the Search Tool
        //searched by the user
        itemSearched: "",
        item: {},
    }
  },

  methods:{
    // query for all item names in the database
    // pass the item names to the Search Tool for recommendation purpose    
    fetchItems:function(){      
      database.collection('items').orderBy('amountRecycled', 'desc').get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            if (item.approved) {              
              this.itemsList.push(item.name) 
            }            
            })})            
      },
      
      // query for item from database based on what is passed from Search Tool
      // assign item to the item.
      // Amount Searched will increase by 1 for a successful search
      searchItem:function(value) {             
        this.itemSearched = value;
        database.collection('items').where('name', '==', this.itemSearched).get().then((querySnapShot)=>{
          let item={}
            querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            if (item.approved) {                
                database.collection('items').doc(doc.id).update({
                  'amountSearched': firebase.firestore.FieldValue.increment(1)
                });
                item.amountSearched++;
                this.item = item;
            }            
            })})            
      }
  },

  created() {
    this.fetchItems();    
  },

  components: {
    'search-tool': SearchTool,
    'item-card': ItemCard,    
  }
}

</script>

<style scoped>
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