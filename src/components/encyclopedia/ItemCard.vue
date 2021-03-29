<template>
  <div class="card" style="height:450px;"> 
      <img :src="item.imageUrl" class="card-img-top img-thumbnail" alt="No image yet!" onerror="this.onerror=this.src='https://www.brandturbo.com/images/images/en/imageNoImageSmall.gif';">
      <div class="card-body">
        <h5 class="card-title">{{item.name}}</h5>
        <h6 class="card-subtitle mb-2">{{item.category}}</h6>
        <p class="card-text">Reyclable: <span v-if="item.recyclable">Yes</span><span v-else>No</span></p>        
      </div>            
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