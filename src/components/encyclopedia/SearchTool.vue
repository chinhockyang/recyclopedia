<template>
  <div>    
    <input type="text" v-model="search" @focus="modal = true"> 

    <ul v-if="modal == true">      
      <li 
        v-for="item in filteredList"
        :key="item"
        @click="selectSearch(item)"
        >
        {{item}}
      </li>
    </ul>    
    
    <button v-show="modal == true" @click="modal = false">Close Suggestion</button><br>       
    <button @click="submitSearch">Search</button>
  </div>
</template>


<script>
export default {  
  data(){
    return{  
        // Filtered Recommendation List based on the search entered
        // Search is v-model with the input field
        filteredList: [],
        search: '',

        // if modal: true, the list of recommendations gets displayed
        modal: false
    }
  },

  props: {
      // Array of items to be searched for
      itemsList: Array
  },

  methods:{
      // filter the recommendation list based on the searched item
      // if there is no items searched yet, will display the top 10 recycled items
      // will show only 5 recommendations at most
      filterList: function(){                
        if (this.search.length == 0) {            
          let tempArray = this.itemsList.slice(0,10);          
          this.filteredList = tempArray;
        }  else {
          this.filteredList = this.itemsList.filter(item => {
            return item.toLowerCase().includes(this.search.toLowerCase())
          }).slice(0,10);
        }        
      },

      // Function called when an item is selected from the recommendation list
      // Set the search data, empty the filtered recommendation list, close the recommendations
      selectSearch: function(item) {
        this.search = item;
        this.modal = false;
        this.filteredList = [];
      },

      // pass back the search data to the parent component
      // SearchTool has an event called "searched" that parent component can perform a function on triggered
      // this.search passed up to parent through that function
      submitSearch: function() {
          this.$emit('searched', this.search);      
      }
  },  

  beforeUpdate() {
    // to get an updated recommendation list 
    this.filterList();
  },

  watch: {
    // if search is changed, update the filtered list
    search: function() {
      this.filterList();
    }
  }
}
</script>

<style scoped>

ul{    
    list-style-type: none;
    padding: 0; 
    margin-top: 0%;       
}
li{    
    text-align: center;    
    padding: 5px;
    margin-top: 0%;
    border: 1px solid #222;
    margin-left: auto;    
    margin-right: auto;    
    width:50%;
    background-color: lightgray;
}

li:hover {
  background-color: darkslategray;
  color: white;
}

input[type="text"]{    
    padding: 8px;
    width:50%;
    margin-bottom: 0%;
}

</style>