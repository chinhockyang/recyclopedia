<template>
  <div>  
    <ul>
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/map" exact>Find My Bin</router-link></li>
        <li><router-link to="/encyclopedia/quick-search">Encyclopedia</router-link></li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
</style>
