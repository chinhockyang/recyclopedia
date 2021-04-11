<template>
  <div class="form-group">    
    <div class="input-group">
          <input type="text" class="form-control" v-model="search" @focus="modal = true">                      
          <b-button v-b-tooltip.hover.bottom :title="toolTipText" variant="outline-secondary" v-if="modal == true" @click="modal = false">
              <small>^</small>
          </b-button>          
          <div class="input-group-append">            
            <button @click.prevent="submitSearch" class="btn btn-outline-success">{{buttonName}}</button>
          </div>
          <div class="container">                        
            <ul v-if="modal == true">      
              <li 
                v-for="item in filteredList"
                :key="item"
                @click="selectSearch(item)"
                  >
                {{item}}
              </li>
            </ul>                                                                    
          </div>                              
    </div>    
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
        modal: false,

        toolTipText: 'Close Recommendation'
    }
  },

  props: {
      // Array of items to be searched for
      itemsList: Array,
      buttonName: String,
      toolTip: String
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
          this.modal = false;
          this.$emit('searched', this.search);           
      }
  }, 
  
  created() {
    if (this.toolTip) {
      this.toolTipText = this.toolTip;
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
    margin-right: 100px;
    margin-left: auto;            
    background-color: #E3E9BB;
}

li:hover {
  background-color: darkslategray;
  color: white;
}

</style>