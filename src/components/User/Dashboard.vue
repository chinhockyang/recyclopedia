<template>
  <div class="containter px-3"> 
    <nav class="nav nav-light justify-content-center">
           <ul class="nav nav-tabs mt-4 mb-3 mx-auto" id="pills-tab" role="tablist">
               <li>
                    <router-link to="/addNewRecord" 
                    class="nav-link"
                    id="quick-search-tab" 
                    data-toggle="pill"                     
                    role="tab" 
                    >Add New Record</router-link>
               </li>

                <li>
                    <router-link to="/points" 
                    class="nav-link"
                    id="quick-search-tab" 
                    data-toggle="pill"                     
                    role="tab" 
                    >My Points</router-link>
               </li>

               <li>
                    <router-link to="/past" 
                    class="nav-link"
                    id="quick-search-tab" 
                    data-toggle="pill"                     
                    role="tab" 
                    >View Past Records</router-link>
               </li>
           </ul>                        
       </nav> 
    <div id="center">
      <h3 v-if="user">Welcome {{user.data.displayName}}!</h3>
    </div>
    <div id="center">
      <div id = "level">
        <img src="https://static.wikia.nocookie.net/farmville/images/e/e3/Sunrise_Seed-icon.png/revision/latest?cb=20130305213231" style="width: 30px"><p id="tier"> Welcome Greener</p>
      </div>
    </div>
    <br>
    <br>
    <div id="center">
      <button class="btn btn-success" @click.prevent="signOut">Sign out</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { firebaseApp } from '../../firebase.js'

export default {
  data() {
    return {
      pastRecords: [], 
    
    }
  },
  
  computed: {
    ...mapGetters({
      user: "user"
    })
  },

  methods: {
    signOut() {
      firebaseApp.auth().signOut().then(() => {
          this.$router.push({path: '/login'});
        });
    }, 
  }
};
</script>

<style> 
#tier {
  display: inline;
  font-size: 15px;
  color: green
}

#level {
  background-color: rgb(221, 221, 130);
  width: 13%
}
</style>