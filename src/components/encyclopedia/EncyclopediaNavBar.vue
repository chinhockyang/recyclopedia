<template>
   <div>    
        <h3>The Recycling Encyclopedia</h3> 
        <ul>
            <li><router-link to="/encyclopedia/quick-search">Quick Search </router-link></li> 
            <li><router-link to="/encyclopedia/browse">Browse by Category </router-link></li>
            <li><router-link to="/encyclopedia/can-recycle/true">What Can I Recycle? </router-link></li>
            <li><router-link to="/encyclopedia/can-recycle/false">What Can't I Recycle?</router-link></li>
            <li><router-link to="/encyclopedia/add">Add to Recyclopedia</router-link></li>
        </ul>               
    </div>
</template>

<script>
export default {  
}
</script>

<style scoped>

div {
    background: darkolivegreen;
    color: white;
    border-style: solid;
    border-color:black;
    border-width: 2px;            
    min-width: 50%;
    max-width: 75%;
    margin-left: auto;
    margin-right: auto;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

li {
    list-style-type: none;
    display: inline-block;
}

a{
    color: #fff;
    text-decoration: none;    
    padding: 2px 4px;
    margin: 5px;
    border-radius: 6px;
}
.router-link-active{
    background: #eee;
    color: #444;
}
</style>