<template> 
<header>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <a class="navbar-brand" href="/" exact>
        <img src="https://www.recycling.com/wp-content/uploads/recycling%20symbols/black/Black%20Recycling%20Symbol%20%28U%2B267B%29.png" alt="Logo" style="width:40px;">
      </a>
      <a class="navbar-brand" href="/" exact>Recyclopedia</a>  

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav m-3">
            <li class="nav-item">
              <router-link class="nav-link" to="/" exact>Home</router-link>
            </li>
            <li class="nav-item"  style="width: 140%">
              <router-link class="nav-link" to="/map">Find My Bin</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" id="nav-bar-encyclopedia" to="/encyclopedia/">Encyclopedia</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/Quiz">Quiz</router-link>
            </li>
            <li class="nav-item">
              <template v-if="user.loggedIn">            
                <a class="nav-link" href="/dashboard">Account</a>
              </template> 
              <template v-else>  
                <a class="nav-link" href="/login">Account</a> 
              </template>
            </li>
          </ul>      
      </div>
    </nav>
  </div>
</header>
</template> 

<script> 
import { mapGetters } from "vuex";


export default {
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
}
</script>

<style>
.navbar {
  background-color: #E3E9BB;  
}

.navbar-nav > .nav-item {
  background-color: #E3E9BB;    
}

</style>
