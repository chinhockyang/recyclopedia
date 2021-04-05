<template>
  <div class="containter px-3"> 
    <br>
    <h3 v-if="user">Welcome {{user.data.displayName}}!</h3>
    <div>
          <ul class="navbar-nav m-3">
            <li class="nav-item">
              <router-link class="nav-link" to="/addNewRecord" exact>Add New Recycling Record</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/points">My Points</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/past">View Past Records</router-link>
            </li>
          </ul>
    </div>
    
    <button @click.prevent="signOut">Sign out</button>
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

</style>