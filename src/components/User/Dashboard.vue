<template>
  <div> 
    <p v-if="user">Welcome {{user.data.displayName}}!</p>   
    <button @click.prevent="signOut">Sign out</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { firebaseApp } from '../../firebase.js'

export default {
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
    }
  }
};
</script>