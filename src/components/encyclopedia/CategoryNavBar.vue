<template>
   <div>         
        <router-link to="/encyclopedia/browse/category-info/plastic">Plastic</router-link>          
        <router-link to="/encyclopedia/browse/category-info/paper">Paper</router-link>  
        <router-link to="/encyclopedia/browse/category-info/glass">Glass</router-link>  
        <router-link to="/encyclopedia/browse/category-info/metal">Metal</router-link>  
        <router-link to="/encyclopedia/browse/category-info/electronics">Electronics</router-link>  
        <router-link to="/encyclopedia/browse/category-info/others">Others</router-link>      
    </div>
  
</template>

<script>
export default {  
}
</script>

<style scoped>
a{
    color: black;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}

.router-link-active{
    background: olivedrab;
    color: white;
}
</style>