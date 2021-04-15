<template>
   <div class="container">
       <nav class="nav nav-light justify-content-center">
           <ul class="nav nav-tabs mt-4 mb-3 mx-auto" id="pills-tab" role="tablist">
               <li>
                    <router-link to="/encyclopedia/quick-search" 
                    class="nav-link"
                    id="quick-search-tab" 
                    data-toggle="pill"                     
                    role="tab" 
                    aria-controls="quick-search" 
                    aria-selected="true"
                    >Quick Search </router-link>
               </li>

               <li>
                    <router-link to="/encyclopedia/can-recycle/true" 
                    class="nav-link"
                    id="can-recycle-tab" 
                    data-toggle="pill"
                    role="tab" 
                    aria-controls="can-recycle" 
                    aria-selected="false"
                    >What Can I Recycle?</router-link>
               </li>

               <li>
                    <router-link to="/encyclopedia/can-recycle/false" 
                    class="nav-link"
                    id="can-recycle-tab" 
                    data-toggle="pill"
                    role="tab" 
                    aria-controls="can-recycle" 
                    aria-selected="false"
                    >What Can't I Recycle?</router-link>
               </li>

               <li>
                    <router-link to="/encyclopedia/add" 
                    class="nav-link"
                    id="add-tab" 
                    data-toggle="pill"
                    role="tab" 
                    aria-controls="add" 
                    aria-selected="false"
                    >Add to Recyclopedia</router-link>
               </li>
           </ul>                        
       </nav>        
    </div>
</template>

<script>
export default {  
}
</script>

<style scoped>

.nav-tabs > li > a {
    color: black;
}

.nav-tabs > li > a:hover {
    background-color: lightgray;
}

.nav-tabs > li > a.active {
    color: white;
    background-color: olivedrab;
}


</style>