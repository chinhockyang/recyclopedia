<template>
<div>
    <section class="jumbotron py-3" id="recyclingjumb">
        <div class="container text-center">
            <h1 class="display-4"><strong>Recyclopedia</strong></h1>
            <p class="lead text-muted" style="color: white"><strong>The Recycling Hub for Singaporeans</strong></p> 
        </div>
        <div class="card w-75 mx-auto text-center">
            <div class="card-header btn" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <h5>Why Recycle?</h5>      
            </div>
            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                    <div class="col-s-6 container">
                        <div
                          id="carouselBasicExample"
                          class="carousel slide carousel-fade"
                          data-ride="carousel"
                          data-interval="false"
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
                                  src="static/slide-1.PNG"
                                  class="d-block w-100"
                                  alt="..."
                                />
                            </div>

                            <!-- Single item -->
                            <div class="carousel-item" style="overflow-x: auto; white-space: nowrap;">
                                <img
                                  src="static/slide-2.jpg"
                                  class="d-block w-100"
                                  alt="..."
                                />                                
                            </div>

                            <!-- Single item -->
                            <div class="carousel-item" style="overflow-x: auto; white-space: nowrap;">
                                <img
                                  src="static/slide-3.PNG"
                                  class="d-block w-100"
                                  alt="..."
                                />                                
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
                    </div>
            </div>
          </div>
        </div>
    </section>
    <div class="container mx-auto mt-3 text-center">     
        <h5>Our Recycling Efforts</h5>         
        <div
        id="carouselMultiItemExample3"
        class="carousel slide carousel-dark text-center mt-3"
        data-ride="carousel"                    
        data-interval="false"
        >
                    <!-- Inner -->
            <div class="carousel-inner">
                        <!-- Single item -->
                <div class="carousel-item active">
                    <div class="row w-95 mx-auto">
                        <div
                        class="card col-s-8 col-md-4 cat mx-auto" 
                        v-for="cat in category.slice(0,3)" 
                        :key="cat.name"
                        v-b-tooltip:hover.bottom
                        :title="'Click to see more recycling information of ' + cat.name"
                        @click="$bvModal.show(cat.name)">
                            <div class="card-body">                                         
                                <h3 class="display-3 my-2" v-if="cat.name == 'Plastic'">{{ shownPlastic.toFixed(0) }}</h3>
                                <h3 class="display-3 my-2" v-else-if="cat.name == 'Paper'">{{ shownPaper.toFixed(0) }}</h3>
                                <h3 class="display-3 my-2" v-else-if="cat.name == 'Glass'">{{ shownGlass.toFixed(0) }}</h3>
                                <h3 class="card-text">{{cat.name}}</h3>
                                <p class="text-muted">have been recycled in Recyclopedia</p>
                                <img 
                                    class="mb-3 rounded" 
                                    :src="cat.url"
                                    width="60%"
                                    height="50%"
                                    alt=""
                                    onerror="this.onerror=this.src='https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg';">                                                                                      
                                <b-modal :id="cat.name" :title="cat.name" size="xl" hide-footer>
                                    <category-info :category="cat.name" class="text-center"></category-info>
                                </b-modal>    
                            </div>
                        </div> 
                    </div>
                </div>
                    
                        <!-- Single item -->
                <div class="carousel-item">
                    <div class="row w-95 mx-auto">
                        <div 
                        class="card col-s-8 col-md-4 cat mx-auto" 
                        v-for="cat in category.slice(3,6)" 
                        :key="cat.name"          
                        v-b-tooltip:hover.bottom
                        :title="'Click to see more information of ' + cat.name + ' Recycling'"              
                        @click="$bvModal.show(cat.name)">
                            <div class="card-body">                                        
                                <h3 class="display-3 my-2">{{recycleData[cat.name]}}</h3>
                                <h3 class="card-text">{{cat.name}}</h3>
                                <p class="text-muted">have been recycled in Recyclopedia</p>
                                <img 
                                    class="mb-5 rounded" 
                                    :src="cat.url"             
                                    width="60%"
                                    height="50%"
                                    alt=""
                                    onerror="this.onerror=this.src='https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg';">                                                                 
                                <b-modal :id="cat.name" :title="cat.name" size="xl" hide-footer>
                                    <category-info :category="cat.name" class="text-center"></category-info>
                                </b-modal>    
                            </div>                                                 
                        </div> 
                    </div>
                </div>
            </div>
                    <!-- Inner -->                
                                      
                  <!-- Controls -->                  
            <ol class="carousel-indicator d-flex justify-content-center mb-5">
                <li
                    class="carousel-control-prev position-relative mx-3 p-1 mt-5"
                    style="background-color:grey;"
                    type="button"
                    data-target="#carouselMultiItemExample3"
                    data-slide="prev"                        
                >
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>      
                </li>
                      
                <li      
                    class="carousel-control-next position-relative mx-3 p-1 mt-5"
                    style="background-color:grey;"
                    type="button"
                    data-target="#carouselMultiItemExample3"                        
                    data-slide="next"                                        
                >
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>      
                </li>
            </ol>                         
        </div>         
    </div>    
    <div class="containter my-3">        
        <div class="container text-center mt-5 mb-3">
                <h5>Join us in Recycling to save our environment</h5>      
        </div>            
        <div class="containter w-75 mx-auto bg-light">            
            <div class="row mx-auto">            
            <div class="col-s-6 col-md my-3">
                <div class="card text-center" style="background-color: #E3E9BB;">
                    <div class="card-body">
                        <div class="card-block">
                        <h5 class="card-title">Find My Bin <b-icon icon="map-fill"></b-icon></h5>
                        <img 
                            class="mb-3 rounded" 
                            src="https://www.nea.gov.sg/images/default-source/our-serivces/img-recycle.jpg"             
                            width="60%"
                            height="60%"
                            alt=""
                            onerror="this.onerror=this.src='https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg';">                                                                 
                        <p class="card-text">
                            Find the nearest recycling bin in your community, never let inconvenience be an excuse for not recycling!
                        </p>
                        <a href="/map">
                            <button type="button" class="btn btn-success w-75 mx-auto">
                                Find My Bin
                            </button>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-s-6 col-md my-3">
                <div class="card text-center" style="background-color: #E3E9BB;">                                                                                              
                    <div class="card-body">
                        <div class="card-block">
                        <h5 class="card-title">Encyclopedia <b-icon icon="search"></b-icon></h5>
                        <img 
                            class="mb-3 rounded" 
                            src="https://www.nspackaging.com/wp-content/uploads/sites/4/2019/03/shutterstock_1492626947-740x520.jpg"             
                            width="58%"
                            height="60%"
                            alt=""
                            onerror="this.onerror=this.src='https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg';">                                                                 
                        <p class="card-text">
                            Find out what items can or cannot be recycled, and learn the proper steps to take when recycling.
                        </p>
                        <a href="/encyclopedia">
                            <button type="button" class="btn btn-success w-75 mx-auto">
                                Encyclopedia
                            </button>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-s-6 col-md my-3">
                <div class="card text-center" style="background-color: #E3E9BB;">                                                                                              
                    <div class="card-body">
                        <div class="card-block">
                        <h5 class="card-title">Quiz <b-icon icon="book"></b-icon></h5>
                        <img 
                            class="mb-3 rounded" 
                            src="https://cdn.mattressonline.co.uk/wp-content/uploads/2017/09/shutterstock_634701242-1024x783.jpg"             
                            width="63%"
                            height="60%"
                            alt=""
                            onerror="this.onerror=this.src='https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg';">                                                                 
                        <p class="card-text">
                            Test yourself to see if you are Recycling-Savvy!
                        </p>       
                        <a href="/quiz">
                            <button type="button" class="btn btn-success w-75 mx-auto">
                                Quiz
                            </button>
                        </a>
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
import gsap from 'gsap';
import CategoryInfoPage from './encyclopedia/CategoryInfoPage.vue'
import database from '../firebase.js'

export default {
  data(){
    return{
        category: [
            {name: "Plastic", url: "https://sustainable.columbia.edu/sites/default/files/styles/cu_crop/public/content/plastic_metal_glass%20recycling.jpeg?itok=KLZYxuG7"},
            {name: "Paper", url: "https://leetatseng.com/wp-content/uploads/2019/09/Eco-Friendly-Paper-Products.jpg"},
            {name: "Glass", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23FENdcS42Yd095RL-x6oiWtX_JdFNO9r8Q&usqp=CAU"},
            {name: "Metal", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRepvDtNmEgmZDu2zkGz-qscfTVzqio1Qb_7w&usqp=CAU"},
            {name: "Electronics", url: "https://www.vpirg.org/wp-content/uploads/2012/03/assorted-e-wastehomepage-400x266.jpg"},
            {name: "Others", url: "https://svswa.org/svswauploads/couchmattressfrig.jpg"},
        ],
        
        shownPlastic: 0,
        shownPaper: 0,
        shownGlass: 0,

        recycleData: {
            "Plastic": 0,
            "Paper": 0,
            "Glass": 0,
            "Metal": 0,
            "Electronics": 0,
            "Others": 0
        },          

        searchData: {
            "Plastic": 0,
            "Paper": 0,
            "Glass": 0,
            "Metal": 0,
            "Electronics": 0,
            "Others": 0
        },
    }
  },

  methods: {
      animateNumber: function(newValue, category) {          
          if (category == "Plastic") {
              gsap.to(this.$data, { duration: 3.5, shownPlastic: newValue });
          } else if (category == "Paper") {
              gsap.to(this.$data, { duration: 3.5, shownPaper: newValue });
          } else if (category == "Glass") {
              gsap.to(this.$data, { duration: 3.5, shownGlass: newValue });
          }
      },
      
      fetchItems: function() {                             
            database.collection('items')   
            .get()                                                      
            .then((querySnapShot)=>{
                let item={}            
                querySnapShot.forEach(doc=>{
                item=doc.data()                
                item.show = false
                item.id=doc.id                
                if (item.approved) {                    
                    this.recycleData[item.category] = this.recycleData[item.category] + item.amountRecycled;                    
                    this.searchData[item.category] = this.searchData[item.category] + item.amountSearched;                    
                }                
            })
            this.animateNumber(this.recycleData['Plastic'], 'Plastic');
            this.animateNumber(this.recycleData['Paper'], 'Paper');
            this.animateNumber(this.recycleData['Glass'], 'Glass');
            });                                     
        },
        
  },

  created() {
      this.fetchItems();        
  },


  components: {
      'category-info': CategoryInfoPage,      
  },

}

</script>

<style scoped>

.card-header:hover {
    background-color: #E3E9BB;;
    border: outset olivedrab;
    cursor: pointer;
}

.cat:hover {
    border: solid darkgreen;
    cursor: pointer;
}

#recyclingjumb {
  background-image: url("https://www.selwoodhousing.com/wp-content/uploads/2018/07/hands-holding-plastic-bottle-picture-id829504010.jpg");
  background-size: cover;
}
</style>
