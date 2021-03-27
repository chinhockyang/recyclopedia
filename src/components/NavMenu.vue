<template> 
<header>
  <div>
    <nav class="navbar navbar-expand-sm bg-success navbar-light">
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
          <a class="nav-link" href="/login">Account</a>
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
