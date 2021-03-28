<template>
  <div class="tab-pane fade show active" id="can-recycle" role="tabpanel" aria-labelledby="can-recycle-tab">
    <h1>What I {{ topic }} Recycle</h1>    
    <input type="text" v-model="search" placeholder="Search title.."/><br><br>      
    
    <pagination 
      :items="filteredList" 
      @page:update="updatePage"
      :currentPage="currentPage"
      :pageSize="pageSize">
    </pagination>

    <ul>
        <li v-for="item in visibleItems"
            v-bind:key="item.name"
            v-on:click="item.show = !item.show">
            {{item.name}}            
            <item-card v-show="item.show" :item="item"></item-card>
        </li>
    </ul><br><br>

    <input type="checkbox" id="plastic" value="Plastic" v-model="checkedList" checked>
    <label for="plastic">Plastic</label>
    <input type="checkbox" id="paper" value="Paper" v-model="checkedList" checked>
    <label for="paper">Paper</label>
    <input type="checkbox" id="glass" value="Glass" v-model="checkedList" checked>
    <label for="glass">Glass</label>
    <input type="checkbox" id="metal" value="Metal" v-model="checkedList" checked>
    <label for="metal">Metal</label>
    <input type="checkbox" id="electronics" value="Electronics" v-model="checkedList" checked>
    <label for="electronics">Electronics</label>
    <input type="checkbox" id="others" value="Others" v-model="checkedList" checked>
    <label for="others">Others</label><br><br>
    
    <div v-if="canRecycle">
      <input type="radio" id="recycled" value="recycled" v-model="sort">
      <label for="recycled">Sort By Amount Recycled</label><br>
      <input type="radio" id="searched" value="searched" v-model="sort">
      <label for="searched">Sort By Amount Searched</label><br>
    </div>
  </div>
</template>


<script>
import database from '../../firebase.js'
import ItemCard from './ItemCard.vue'
import Pagination from './Pagination.vue'

export default {

  data(){
    return{
        // whether the page shows "can" or "cannot"
        topic: 'can',

        // whether the page renders items for "can" or "cannot" recycle
        canRecycle: true,

        // what is entered in the search
        search: '',

        //itemsList is all the items that can/cannot be recycled retrieved from database
        //visibleItems is the items shown all the current page (of pagination)
        itemsList: [],        
        visibleItems: [],        
        
        //currentPage: page of pagination - 1
        //pageSize: number of items shown per page
        currentPage: 0,
        pageSize: 3,        

        //items to be shown (filter)
        checkedList: ['Plastic', 'Paper', 'Glass', 'Metal', 'Electronics', 'Others'],
        sort: "searched"
    }
  },
  
  methods:{
    fetchItems:function(){
      var sortReq = (this.sort == "searched") ? "amountSearched" : "amountRecycled";
      database.collection('items')
      .orderBy(sortReq, "desc")    
      .get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id            
            if (this.canRecycle == true) {
              if (item.approved & item.recyclable) {                
                this.itemsList.push(item);
              } 
            } else {
              if (item.approved & !item.recyclable) {                
                this.itemsList.push(item);
              }
            }            
            })})    
      },

      //updates the page number of pagination
      updatePage: function(pageNumber) {
        this.currentPage = pageNumber;
        this.updateVisibleItems();
      },

      //slice filteredList to get only the items on the current page
      updateVisibleItems: function() {
        this.visibleItems = this.filteredList.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);

        // if there are 0 items on current page, go back 1 page
        if (this.visibleItems.length == 0 && this.currentPage > 0) {
          this.updatePage(this.currentPage - 1);
        }
      },
  },

  computed: {
    // filter itemsList based on the search data
    filteredList: function() {
      return this.itemsList
      .filter(item => this.checkedList.includes(item.category))
      .filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
        });
    }
  },

  watch: {
    //render "can" or "cannot" based on $route param 
    canRecycle: function(val) {      
      return this.topic = eval(val) ? 'can' : 'cannot';
    }, 

    // if $route param changed to false (cannot recycle)
    // clear the itemsList and retrieve from database again
    $route: function(val) {
      this.canRecycle = eval(val.params.id);
      this.sort = "searched";
      this.itemsList = [];
      this.visibleItems = [];
      this.fetchItems();
      this.updateVisibleItems();
    },

    sort: function() {      
      this.itemsList = [];
      this.visibleItems = [];
      this.fetchItems();
      this.updateVisibleItems();
    }
  },

  created() {    
    this.canRecycle = eval(this.$route.params.id);    
    this.fetchItems();    
  },  

  beforeUpdate() {
    this.updateVisibleItems();
  },

  components: {
    'item-card': ItemCard,
    'pagination': Pagination
  }
}

</script>

<style scoped>
#can-recycle {
  text-align: center;
}

#itemsList{
    width: 100%;
    max-width: 1000px;
    margin: 30px auto;
    padding: 0 5px;
    box-sizing: border-box;
}
ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li{
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 8px;
}

input[type="text"]{    
    padding: 8px;
    width:50%;
}

</style>