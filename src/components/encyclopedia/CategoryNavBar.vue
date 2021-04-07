<template>
   <div>
        <router-link to="/encyclopedia/browse/category-info/plastic" exact>Plastic</router-link>          
        <router-link to="/encyclopedia/browse/category-info/paper" exact>Paper</router-link>  
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
a {
    color: black;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}

a:hover {    
    color: olivedrab;
    text-decoration: none;
}

a.active {
    background: olivedrab;
    color: white;
}

</style>