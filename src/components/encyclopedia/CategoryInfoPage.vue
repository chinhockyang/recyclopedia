<template>
  <div class="containter">
      
      <div class="row">
        <div class="col-2"></div>
        <div class="card col-8 my-3 p-3">
            <h1 class="card-title display-4">{{category}}</h1>
            <p class="card-subtitle text-muted">Total Searched: {{totalSearched}}</p>
            <p class="card-subtitle text-muted">Total Recycled: {{totalRecycled}}</p>
            <div>
              <a :href="'/encyclopedia/can-recycle/true/' + category" class="btn btn-outline-success mx-2 mt-2" role="button">{{category}} that can be recycled</a>
              <a :href="'/encyclopedia/can-recycle/false/' + category" class="btn btn-outline-danger mt-2" role="button">{{category}} that cannot be recycled</a>
            </div>
        </div>
        <div class="col-2"></div>
      </div>
      
      <div class="accordion col-12 mx-auto" role="tablist">        
        <div class="card">
          <div class="card-header" id="headingTwo">
            <button class="btn btn-outline-light" style="text-decoration:none; color:green;" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                <h5>Recycling Records of {{category}} in Recyclopedia</h5>
            </button>            
          </div>
          <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">                        
            <div class="card-body mb-3">
              <h5 class="mt-3 ml-5">Commonly Recycled {{category}}</h5>
              <div
                    id="carouselMultiItemExample"
                    class="carousel slide carousel-dark text-center"
                    data-ride="carousel"
                    data-interval="false"
                  >
                  
                  <!-- Controls -->                  
                  <ol class="carousel-indicator d-flex justify-content-center mb-4">
                      <li
                        class="carousel-control-prev position-relative m-3 p-1"
                        style="background-color:green;"
                        type="button"
                        data-target="#carouselMultiItemExample"
                        data-slide="prev"
                        v-show="mostRecycled.length > 3"
                      >
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>      
                      </li>
                      
                      <li      
                        class="carousel-control-next position-relative m-3 p-1"
                        style="background-color:green;"
                        type="button"
                        data-target="#carouselMultiItemExample"
                        data-slide="next"                
                        v-show="mostRecycled.length > 3"
                      >
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>      
                      </li>
                    </ol>
                    
                    <!-- Inner -->
                    <div class="carousel-inner">
                        <!-- Single item -->
                        <div class="carousel-item active">
                            <div class="container" style="overflow-x: auto; white-space: nowrap;">
                              <span v-for="i in mostRecycled.slice(0,3)" :key="i.name">                                  
                                  <div class="card mx-2" style="pointer-events:none; display:inline-block; white-space: normal;">
                                      <item-card :item="i" style="width: 250px;"></item-card>
                                  </div>                                 
                              </span>            
                          </div>
                        </div>
                    
                    
                        <!-- Single item -->
                        <div class="carousel-item">
                            <div class="container" style="overflow-x: auto; white-space: nowrap;">
                              <span v-for="i in mostRecycled.slice(3,6)" :key="i.name">                                  
                                  <div class="card mx-2" style="pointer-events:none; display:inline-block; white-space: normal;">
                                      <item-card :item="i" style="width: 250px;"></item-card>
                                  </div>                              
                              </span>                                             
                            </div>
                      </div>
                    </div>
                    <!-- Inner -->                     
                </div>                
                <h5 class="mt-5">Top Recycled {{category}} in Recyclopedia</h5>
                <div class="row">
                        <div class="col">
                            <div class="chart mt-1">
                              <h5 class="lead">Recycled in Recyclopedia</h5>    
                                <bar-chart :category="category" class="chart-canvas"></bar-chart>
                            </div>
                        </div>                        
                </div>
            </div>
          </div>
        </div>
        <div class="card mb-3">
          <div class="card-header" id="headingOne">            
              <button class="btn btn-outline-light" style="text-decoration:none; color:green;" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                <h5>Search Records of {{category}} in Recyclopedia</h5>
              </button>            
          </div>
          <div id="collapseThree" class="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
            <div class="card-body">                
                <div class="card p-3 mt-3">
                  <h5 class="mt-3 ml-5">Commonly Searched {{category}}</h5>
                  <div
                    id="carouselMultiItemExample2"
                    class="carousel slide carousel-dark text-center"
                    data-ride="carousel"                    
                    data-interval="false"
                  >
                  
                  <!-- Controls -->                  
                  <ol class="carousel-indicator d-flex justify-content-center mb-4">
                      <li
                        class="carousel-control-prev position-relative m-3 p-1"
                        style="background-color:green;"
                        type="button"
                        data-target="#carouselMultiItemExample2"
                        data-slide="prev"
                        v-show="mostSearched.length > 3"
                      >
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>      
                      </li>
                      
                      <li      
                        class="carousel-control-next position-relative m-3 p-1"
                        style="background-color:green;"
                        type="button"
                        data-target="#carouselMultiItemExample2"                        
                        data-slide="next"                
                        v-show="mostSearched.length > 3"
                      >
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>      
                      </li>
                    </ol>
                    
                    <!-- Inner -->
                    <div class="carousel-inner">
                        <!-- Single item -->
                        <div class="carousel-item active">
                            <div class="container" style="overflow-x: auto; white-space: nowrap;">
                              <span v-for="i in mostSearched.slice(0,3)" :key="i.name">                                  
                                  <div class="card mx-2" style="pointer-events:none; display:inline-block; white-space: normal;">
                                      <item-card :item="i" style="width: 250px;"></item-card>
                                  </div>                                 
                              </span>            
                          </div>
                        </div>
                    
                    
                        <!-- Single item -->
                        <div class="carousel-item">
                            <div class="container" style="overflow-x: auto; white-space: nowrap;">
                              <span v-for="i in mostSearched.slice(3,6)" :key="i.name">                                  
                                  <div class="card mx-2" style="pointer-events:none; display:inline-block; white-space: normal;">
                                      <item-card :item="i" style="width: 250px;"></item-card>
                                  </div>                              
                              </span>                                             
                            </div>
                      </div>
                    </div>
                    <!-- Inner -->                     
                  </div>
                  <h5 class="mt-5">Search Statistics of {{category}} in Recyclopedia</h5>
                  <div class="row">
                    <div class="col mt-3">
                        <div class="chart justify-content-center">
                            <h5 class="lead">Commonly searched Recyclable {{category}}</h5>
                            <horizontal-bar-chart :category="category" :recyclable="true" class="chart-canvas"></horizontal-bar-chart>
                        </div>
                    </div>
                    <div class="col mt-3">
                        <div class="chart">
                            <h5 class="lead">Commonly searched Non-Recyclable {{category}}</h5>
                            <horizontal-bar-chart :category="category" :recyclable="false" class="chart-canvas"></horizontal-bar-chart>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="card p-3">
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-5">
                            <div class="chart mt-1">
                              <h5 class="lead">Items in Recyclopedia</h5>    
                                <pie-chart :category="category" chartType="itemsCount" class="chart-canvas"></pie-chart>                                      
                            </div>
                        </div>       
                        <div class="col-5">
                            <div class="chart">       
                                <h5 class="lead">Searches in Recyclopedia</h5>                 
                                <pie-chart :category="category" chartType="searchCount" class="chart-canvas"></pie-chart>
                            </div>
                        </div>                                                                                          
                    </div>                                
                </div>
            </div>
          </div>
        </div>      
      </div>
  </div>
  
</template>


<script>
import database from '../../firebase.js'
import BarChart from './charts/BarChart.vue'
import HorizontalBarChart from './charts/HorizontalBarChart.vue'
import PieChart from './charts/PieChart.vue'
import ItemCard from './ItemCard.vue'

export default {  
  data(){
    return{                        
        totalSearched: 0,
        totalRecycled: 0,
        canRecycle: [],
        cannotRecycle: [],
        allItem: [],
        mostRecycled: [],
        mostSearched: [],
        posters: []
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
                    this.allItem.push(item);
                    this.totalSearched = this.totalSearched + item.amountSearched
                    this.totalRecycled = this.totalRecycled + item.amountRecycled;                    
                } else if (item.approved & !item.recyclable) {
                    this.cannotRecycle.push(item);
                    this.allItem.push(item);
                    this.totalSearched = this.totalSearched + item.amountSearched
                }
                this.mostSearched = this.allItem.sort((a,b) => (a.amountSearched < b.amountSearched) ? 1 : -1);
                this.mostRecycled = this.canRecycle.sort((a,b) => (a.amountRecycled < b.amountRecycled) ? 1 : -1);
            })});         
     },

     fetchPoster: function() {
        database.collection('poster').where('category','==', this.category).get().then((querySnapShot)=>{
                let item={}            
                querySnapShot.forEach(doc=>{
                item=doc.data()
                item.show=false
                item.id=doc.id 
                this.posters.push(item);
            })});          
     }
    },

    created: function() {                                   
        this.fetchItems();      
        this.fetchPoster();  
    },

    components: {        
        'bar-chart': BarChart,
        'horizontal-bar-chart': HorizontalBarChart,
        'pie-chart': PieChart,
        'item-card': ItemCard
    },

    props: {
      'category': String
    }
}    

</script>

<style scoped>
.carousel-control-top-prev-icon,
.carousel-control-top-next-icon {
  height: 50px;
  width: 50px;
  background-color: palegreen;  
  background-size: 100%, 100%;    
  background-image: none;
  align-content: center;
}

.carousel-control-top-next-icon:after
{
  content: '>';
  font-size: 35px;
  color: white;
}

.carousel-control-top-prev-icon:after {
  content: '<';
  font-size: 35px;
  color: white;
}

.carousel-control-top-prev-icon:hover {
  background-color: darkgreen;
  color: white;
}

.carousel-control-top-next-icon:hover {
  background-color: darkgreen;  
  color: white;
}
</style>