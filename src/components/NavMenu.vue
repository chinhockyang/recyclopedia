<template> 
<header>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light">
      <a class="navbar-brand">
        <img src="https://www.recycling.com/wp-content/uploads/recycling%20symbols/black/Black%20Recycling%20Symbol%20%28U%2B267B%29.png" alt="Logo" style="width:40px;">
      </a>
      <a class="navbar-brand">Recyclopedia</a>  
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="/" exact>Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/map" exact>Find My Bin</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/encyclopedia/quick-search">Encyclopedia</a>
        </li>
        <li class="nav-item">
          <template v-if="user.loggedIn">
            <a class="nav-link" href="/dashboard">My Account</a>
          </template> 
          <template v-else>
            <a class="nav-link" href="/login">Account</a>
          </template>
        </li>
      </ul>
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
  height: 100px;
}
</style>
