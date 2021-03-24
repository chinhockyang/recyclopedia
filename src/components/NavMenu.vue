<template> 
<header class="navbar navbar-inverse navbar-fixed-top bs-docs-nav" role="banner">
  <div class="container">
    <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
      <ul class="nav navbar-nav navbar-right">
        <li>
          <router-link to="/" exact>Home</router-link>
        </li>
        <li>
          <router-link to="/map" exact>Find My Bin</router-link> 
        </li>
        <li>
          <router-link to="/encyclopedia/quick-search">Encyclopedia</router-link>
        </li>
        <li>
          <router-link to="/login">Account</router-link>
        </li>
      </ul>
    </nav>
  </div>
</header>
</template> 



<style scoped>
@import 'https://fonts.googleapis.com/css?family=Montserrat|Open+Sans';
.navbar-brand {
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase
}

.navbar .nav {
  font-family: 'Open Sans', sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 1.2rem
}

.navbar-inverse {
  background-color: #003300
}

.navbar-inverse {
  border-color: #003300
}

.navbar-inverse .navbar-brand {
  color: #FFFFFF
}

.navbar-inverse .navbar-brand:hover {
  color: #FFCC00
}

.navbar-inverse .navbar-nav>li>a {
  color: #FFFFFF
}

.navbar-inverse .navbar-nav>li>a:hover,
.navbar-inverse .navbar-nav>li>a:focus {
  color: #FFCC00
}
</style>
