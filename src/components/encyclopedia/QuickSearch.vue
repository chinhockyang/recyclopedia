<template>
  <div class="container tab-pane fade show active" id="quick-search" role="tabpanel" aria-labelledby="quick-search-tab">      
    <div class="jumbotron">
      <h3 class="display-6">
        Recyclopedia's Recycling Encyclopedia <b-icon icon="binoculars-fill"></b-icon>
      </h3>
      <p class="lead">Search to see if something is recyclable!</p>
      <div class="container w-75 mx-auto">           
        <search-tool        
          :itemsList="itemsList"
          :buttonName="'Search'"
          @searched="searchItem">
        </search-tool>
      </div>
    </div>           

    <div class="containter row mb-5">      
      <div class="col">
          <item-info            
            :item="item"
            v-show="item">
          </item-info>
      </div>      
    </div>

    <div class="alert alert-warning alert-dismissible" v-show="alert">
      <button type="button" class="close" data-dismiss="alert" @click="closeAlert">&times;</button>      
      <p>Not seeing what you are looking for?</p>
      <a href='/encyclopedia/add' exact>Request for it to be added to Recyclopedia!</a><br><br>
    </div>
  </div>
</template>


<script>
import database from '../../firebase.js'
import SearchTool from './SearchTool.vue'
import ItemInfo from './ItemInfo.vue'
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
        item: "",        

        alert: false,

        dummyItem:{
               name:"For Testing",
               category: "For Testing",               
               recyclable: true,
               amountRecycled: 0,
               amountSearched: 0,
               imageUrl: "",
               description: "",               
               approved: true
           }
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
        this.item = "";        

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
                this.alert = false;
            }            
            })});

            if (this.item == "") {
              this.alert = true;
            }             
      },

      closeAlert: function() {
        this.alert = false;
      }
  },

  created() {
    this.fetchItems();    
  },  

  components: {
    'search-tool': SearchTool,
    'item-info': ItemInfo,    
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