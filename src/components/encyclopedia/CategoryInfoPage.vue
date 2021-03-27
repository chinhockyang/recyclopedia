<template>
  <div class>       
      <h1>{{category}}</h1>
      <div>
        <p>Total Searched: {{totalSearched}}</p>
        <p>Total Recycled: {{totalRecycled}}</p>
      </div>      
      <div style="position: relative; text-align:center">
        <bar-chart :category="category" :recyclable="true" class="chart-left"></bar-chart>
        <bar-chart :category="category" :recyclable="false" class="chart-right"></bar-chart>
      </div>
      <div style="position: relative">
        <pie-chart :category="category" chartType="searchCount" class="chart-left"></pie-chart>        
        <pie-chart :category="category" chartType="itemsCount" class="chart-right"></pie-chart>
      </div>
  </div>
</template>


<script>
import database from '../../firebase.js'
import BarChart from './charts/BarChart.vue'
import PieChart from './charts/PieChart.vue'

export default {  
  data(){
    return{                
        category: "",
        totalSearched: 0,
        totalRecycled: 0,
        canRecycle: [],
        cannotRecycle: []
    }
  }, 

  methods:{   
    fetchItems: function() {
        database.collection('items').where('category','==', this.category).get().then((querySnapShot)=>{
                let item={}            
                querySnapShot.forEach(doc=>{
                item=doc.data()
                item.show=false
                item.id=doc.id                                
                if (item.approved & item.recyclable) { 
                    this.canRecycle.push(item);
                    this.totalSearched = this.totalSearched + item.amountSearched
                    this.totalRecycled = this.totalRecycled + item.amountRecycled;                    
                } else if (item.approved & !item.recyclable) {
                    this.cannotRecycle.push(item);
                    this.totalSearched = this.totalSearched + item.amountSearched
                }                
            })});         
     }
    },

    created: function() {                           
        this.category = this.$route.params.id.charAt(0).toUpperCase() + this.$route.params.id.slice(1);
        this.fetchItems();        
    },

    watch: {
        $route: function(val) {
            this.category = val.params.id.charAt(0).toUpperCase() + val.params.id.slice(1);
            this.canRecycle = [],
            this.cannotRecycle = [],
            this.totalSearched = 0,
            this.totalRecycled = 0,
            this.fetchItems();
        }
    },

    components: {        
        'bar-chart': BarChart,
        'pie-chart': PieChart
    }
}    

</script>

<style scoped>

.chart-left {        
    text-align: center;    
    margin-left: 10%;
    margin-bottom: 2%;
    float: left;
}

.chart-right {        
    text-align: center;    
    margin-right: 10%;
    margin-bottom: 2%;
    float: right;    
}

.info {    
    margin: 30px auto;
    padding: 0 5px;    
    box-sizing: border-box;
    width: 100%;
    max-width: 1000px;
    border-color: black;
    border-style: solid;
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


</style>