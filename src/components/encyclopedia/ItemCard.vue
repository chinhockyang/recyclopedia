<template>
  <div class="item-card"> 
      <h2>{{item.name}}</h2>
      <h3>{{item.category}}</h3>
      <p>Reyclable: <span v-if="item.recyclable">Yes</span><span v-else>No</span></p>
      <p>Amount Recycled: {{item.amountRecycled}}</p>
      <p>Amount Searched: {{item.amountSearched}}</p>
  </div>
</template>


<script>

export default {
  // Takes in an item object, and display as a mini information card
  // So that this item card can be reused in different pages on the app
  props: {
    item: Object
  }
}

</script>

<style scoped>

.item-card {    
    margin: 30px auto;
    padding: 0 5px;    
    box-sizing: border-box;
    width: 100%;
    max-width: 1000px;
    border-color: black;
    border-style: solid;
}

</style>