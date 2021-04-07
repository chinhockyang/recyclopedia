<template>
<div class="container mt-3">     
    <h1>Browse Items By Category</h1>
    <div class="row mt-3">      
        <div class="col-md card m-2">                  
          <a href="/encyclopedia/browse/category-info/plastic">            
            <div class="card-body">
              <img src="https://mdbootstrap.com/img/new/standard/city/053.jpg" class="card-img w-100" />            
              <h3 class="card-title pt-3">Plastic</h3>
            </div> 
          </a>
        </div>

        <div class="col-md card m-2">                  
          <a href="/encyclopedia/browse/category-info/paper">
            <div class="card-body">
              <img src="https://mdbootstrap.com/img/new/standard/city/053.jpg" class="card-img w-100" />            
              <h3 class="card-title pt-3">Paper</h3>
            </div> 
          </a>
        </div>

        <div class="col-md card m-2">                  
          <a href="/encyclopedia/browse/category-info/glass">
            <div class="card-body">
              <img src="https://mdbootstrap.com/img/new/standard/city/053.jpg" class="card-img w-100" />            
              <h3 class="card-title pt-3">Glass</h3>
            </div> 
          </a>
        </div>
    </div>    

    <div class="row mt-2 mb-3">      
        <div class="col-md card m-2">                  
          <a href="/encyclopedia/browse/category-info/metal">
            <div class="card-body">
              <img src="https://mdbootstrap.com/img/new/standard/city/053.jpg" class="card-img w-100" />            
              <h3 class="card-title pt-3">Metal</h3>
            </div> 
          </a>
        </div>

        <div class="col-md card m-2">                  
          <a href="/encyclopedia/browse/category-info/electronics">
            <div class="card-body">
              <img src="https://mdbootstrap.com/img/new/standard/city/053.jpg" class="card-img w-100" />            
              <h3 class="card-title pt-3">Electronics</h3>
            </div> 
          </a>
        </div>

        <div class="col-md card m-2">                  
          <a href="/encyclopedia/browse/category-info/others">
            <div class="card-body">
              <img src="https://mdbootstrap.com/img/new/standard/city/053.jpg" class="card-img w-100" />            
              <h3 class="card-title pt-3">Others</h3>
            </div> 
          </a>
        </div>
    </div>    

</div>  
</template>


<script>

export default {
  data() {
    return {      
    }
  }
}

</script>

<style scoped>

.card:hover {
  background-color: #E3E9BB;
}

.card-title {
  color: green;
}

img:hover {
  transform: scale(1.05);
  transition: transform .2s;
}

a:hover {
  text-decoration: none;
}
</style>