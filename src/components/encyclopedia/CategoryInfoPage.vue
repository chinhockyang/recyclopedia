<template>
  <div class>  
      <h1>{{category.name}}</h1>      
      <h2>Can Recycle</h2>
      <ul>
          <li v-for="item in canRecycle" :key="item.name" v-on:click="item.show = !item.show">              
              {{item.name}}
              <item-card v-show="item.show" :item="item"></item-card>
          </li>
      </ul>

      <h2>Cannot Recycle</h2>
      <ul>
          <li v-for="item in cannotRecycle" :key="item.name" v-on:click="item.show = !item.show">
              {{item.name}}
              <item-card v-show="item.show" :item="item" v-on:click="item.show = !item.show"></item-card>
          </li>
      </ul>
  </div>
</template>


<script>
import database from '../../firebase.js'
import ItemCard from './ItemCard.vue'

export default {  
  data(){
    return{                
        category: "",
        canRecycle: [],
        cannotRecycle: [],
    }
  }, 

  methods:{   
    fetchItems: function() {
        database.collection('items').where('category','==', this.category).get().then((querySnapShot)=>{
                let item={}            
                querySnapShot.forEach(doc=>{
                item=doc.data()
                item.show=false
                item.id=doc.id                
                if (item.approved & item.recyclable) {                                                    
                    this.canRecycle.push(item);
                } else if (item.approved & !item.recyclable) {
                    this.cannotRecycle.push(item);
                }     
            })});         
     }
    },

    created: function() {                           
        this.category = this.$route.params.id.charAt(0).toUpperCase() + this.$route.params.id.slice(1);
        this.fetchItems();        
    },

    watch: {
        $route: function(val) {
            this.category = val.params.id.charAt(0).toUpperCase() + val.params.id.slice(1);
            this.canRecycle = [],
            this.cannotRecycle = []
            this.fetchItems();
        }
    },

    components: {
        'item-card': ItemCard
    }
}    

</script>

<style scoped>
.info {    
    margin: 30px auto;
    padding: 0 5px;    
    box-sizing: border-box;
    width: 100%;
    max-width: 1000px;
    border-color: black;
    border-style: solid;
}

ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li{
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 8px;
}


</style>