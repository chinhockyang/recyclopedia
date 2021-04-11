<template>
<div class="container mt-3 w-75 mx-auto">     
    <h1 class="mt-3">Browse Items By Category</h1>
    <p class="mx-3 mt-5 mb-5">{{paragraph}}</p>    
    <div class="container w-80 mx-auto mt-3 row">      
        <div class="col-md card m-2">                  
          <a href="/encyclopedia/browse/category-info/plastic">            
            <div class="card-body" style="width: 300px; height:280px">
              <img 
              src="https://sustainable.columbia.edu/sites/default/files/styles/cu_crop/public/content/plastic_metal_glass%20recycling.jpeg?itok=KLZYxuG7"
              style="max-width: 225px; max-height: 2500px;"
              class="card-img-top w-100"
              />              
            </div> 
            <h3 class="card-title">Plastic</h3>
          </a>
        </div>

        <div class="col-md card m-2">                  
          <a href="/encyclopedia/browse/category-info/paper">
            <div class="card-body" style="width: 300px; height:280px">
              <img 
              src="https://leetatseng.com/wp-content/uploads/2019/09/Eco-Friendly-Paper-Products.jpg"
              class="card-img-top w-100"
              style="width: 250px; height: 250px;"
              />              
            </div> 
            <h3 class="card-title">Paper</h3>
          </a>
        </div>

        <div class="col-md card m-2">                  
          <a href="/encyclopedia/browse/category-info/glass">
            <div class="card-body" style="width: 300px; height:280px">
              <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23FENdcS42Yd095RL-x6oiWtX_JdFNO9r8Q&usqp=CAU"               
              class="card-img-top w-100"
              style="max-width: 200px; max-height: 250px;"
              />                          
            </div> 
            <h3 class="card-title">Glass</h3>
          </a>
        </div>
    </div>    

    <div class="container w-80 mx-auto mt-3 mb-5 row">
        <div class="col-md card m-2">                  
          <a href="/encyclopedia/browse/category-info/metal">
            <div class="card-body" style="width: 300px; height:280px; text-align:center;">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRepvDtNmEgmZDu2zkGz-qscfTVzqio1Qb_7w&usqp=CAU" 
                class="card-img-top w-100"
                style="max-width: 200px; max-height: 250px;"
              />                          
            </div> 
            <h3 class="card-title">Metal</h3>
          </a>
        </div>

        <div class="col-md card m-2">
          <a href="/encyclopedia/browse/category-info/electronics">
            <div class="card-body" style="width: 300px; height:280px">
              <img 
              src="https://www.vpirg.org/wp-content/uploads/2012/03/assorted-e-wastehomepage-400x266.jpg"
              class="card-img-top w-100"
              style="width: 250px; height: 200px;"
              />              
            </div> 
            <h3 class="card-title">Electronics</h3>
          </a>
        </div>

        <div class="col-md card m-2">                  
          <a href="/encyclopedia/browse/category-info/others">
            <div class="card-body" style="width: 300px; height:280px">
              <img 
              src="https://svswa.org/svswauploads/couchmattressfrig.jpg"
              class="card-img-top w-100"
              style="max-width: 250px; max-height: 300px;"
              />              
            </div> 
            <h3 class="card-title">Others</h3>
          </a>
        </div>
    </div>    
</div>  
</template>


<script>

export default {
  data() {
    return {      
      paragraph:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
  }
}

</script>

<style scoped>

.card:hover {
  border: green solid;
  opacity: 1;
}

a:hover {
  text-decoration: none;  
}

.card-title {
  color: green;
}

</style>