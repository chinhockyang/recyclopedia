<template>
  <div class="containter">
      
      <div class="row">
        <div class="col-2"></div>
        <div class="card col-8 my-3 p-3">
            <h1 class="card-title display-4">{{category}}</h1>
            <p class="card-subtitle text-muted">Total Searched: {{totalSearched}}</p>
            <p class="card-subtitle text-muted">Total Recycled: {{totalRecycled}}</p>
        </div>
        <div class="col-2"></div>
      </div>
      
      <h3>About Recycling {{category}}</h3>
      <div class="row mt-3 mb-5">
        <div class="col-s-3"></div>
        <div class="col-s-6 container">
          <div
            id="carouselBasicExample"
            class="carousel slide carousel-fade"
            data-ride="carousel"
          >
  
              <!-- Indicators -->
              <ol class="carousel-indicators">
                <li
                  type="button"      
                  data-target="#carouselBasicExample"
                  data-slide-to="0"
                  class="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></li>
                <li
                  type="button"      
                  data-target="#carouselBasicExample"
                  data-slide-to="1"
                  aria-label="Slide 2"
                ></li>                
              </ol>

              <!-- Inner -->
              <div class="carousel-inner">
                  <!-- Single item -->
                  <div class="carousel-item active">
                      <img
                          src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
                          class="d-block w-100"
                          alt="..."
                      />
                      <div class="carousel-caption d-none d-md-block">
                          <h5>First slide label</h5>
                          <p>
                              Nulla vitae elit libero, a pharetra augue mollis interdum.
                          </p>
                      </div>
                  </div>

                  <!-- Single item -->
                  <div class="carousel-item">
                      <img
                          src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
                          class="d-block w-100"
                          alt="..."
                      />
                      <div class="carousel-caption d-none d-md-block">
                          <h5>Second slide label</h5>
                          <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          </p>
                      </div>
                </div>    
              </div>
              <!-- Inner -->

              <!-- Controls -->
              <button
                class="carousel-control-prev"
                type="button"
                data-target="#carouselBasicExample"
                data-slide="prev"
                style="border: none; background-color: transparent; cursor:pointer;"
              >
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>    
              </button>
              
              <button
                  class="carousel-control-next"
                  type="button"
                  data-target="#carouselBasicExample"
                  data-slide="next"
                  style="border: none; background-color: transparent; cursor:pointer;" 
              >
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>    
              </button>
            </div>
          </div>          
        <div class="col-s-3"></div>
      </div>

      <h3>Most Recycled {{category}}</h3>
      <div class="row mt-3 mb-5">
        <div class="col-2"></div>
        <div class="col-8">
            <!-- Carousel wrapper -->
            <div
              id="carouselMultiItemExample"
              class="carousel slide carousel-dark text-center"
              data-ride="carousel"
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
                    <div class="container mb-3">
                        <div class="row">               
                          <div class="col-l-1"></div>                                             
                          <span v-for="i in mostRecycled.slice(0,3)" :key="i.name">                                
                                <div class="col-10 mt-1">
                                  <div class="card mx-2" style="pointer-events:none">
                                    <item-card :item="i" style="width: 280px;"></item-card>
                                  </div>                                
                                </div>                                
                          </span>                          
                          <div class="col-l-1"></div>                                             
                        </div>                         
                    </div>
                </div>

                <div class="carousel-item">
                    <div class="container mb-3">                        
                        <div class="row">               
                          <div class="col-1"></div>                                             
                          <span v-for="i in mostRecycled.slice(3,6)" :key="i.name">                                
                                <div class="col-10 mt-1">
                                  <div class="card mx-2" style="pointer-events:none">
                                    <item-card :item="i" style="width: 280px;"></item-card>
                                  </div>                                
                                </div>                                
                          </span>                          
                          <div class="col-1"></div>                                             
                        </div>            
                    </div>
                </div>
            </div>
            <!-- Inner -->
          </div>
            <!-- Carousel wrapper -->
        </div>
        <div class="col-2"></div>
      </div>

      <h3>Recyclopedia Statistics of {{category}}</h3>
      <div class="row m-5">    
          <div class="col-s-2"></div>              
          <div class="col col-s-4">              
              <div class="card p-3">
                <div class="row">
                    <div class="col mt-3">
                        <div class="chart justify-content-center">
                            <h5 class="lead">Commonly searched Recyclable {{category}}</h5>
                            <bar-chart :category="category" :recyclable="true" class="chart-canvas"></bar-chart>
                        </div>
                    </div>
                    <div class="col mt-3">
                        <div class="chart">
                            <h5 class="lead">Commonly searched Non-Recyclable {{category}}</h5>
                            <bar-chart :category="category" :recyclable="false" class="chart-canvas"></bar-chart>
                        </div>
                    </div>
                </div>
              </div>
          </div>
          <div class="col col-s-4">
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
            <div class="col-s-2"></div>        
        </div>          
  </div>
</template>


<script>
import database from '../../firebase.js'
import BarChart from './charts/BarChart.vue'
import PieChart from './charts/PieChart.vue'
import ItemCard from './ItemCard.vue'

export default {  
  data(){
    return{                
        category: "",
        totalSearched: 0,
        totalRecycled: 0,
        canRecycle: [],
        cannotRecycle: [],
        mostRecycled: []        
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
                this.mostRecycled = this.canRecycle.sort((a,b) => (a.amountRecycled > b.amountRecycled) ? 1 : -1);
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
        'pie-chart': PieChart,
        'item-card': ItemCard
    }
}    

</script>

<style scoped>
/*
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
*/

</style>