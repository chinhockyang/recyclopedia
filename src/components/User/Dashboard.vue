<template>
  <div class="containter px-3"> 
    <br>
    <h3 v-if="user">Welcome {{user.data.displayName}}!</h3>
    <br>  
    <div> 
      <h6>Past Recycling Records</h6>
      <table> 
        <tr>
          <th>No.</th>
          <th>Date Recycled</th>
          <th>Bin Serial Number</th> 
          <th>Item Category</th>
          <th>Quantity</th>
          <th>Points Earned</th>
        </tr>
        <tr v-for="(item, index) in pastRecords" v-bind:key="index">
          <td>{{ index + 1}}</td>
          <td v-for="(value, key, index) in item" v-bind:key="index">{{ value }}</td>
        </tr>
      </table>
    
    </div>
    <br>
    <router-link to="/addNewRecord"><button>Add New Recycling Record</button></router-link>
    <br><br>
    <button @click.prevent="signOut">Sign out</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { firebaseApp } from '../../firebase.js'
import database from '../../firebase.js'

export default {
  data() {
    return {
      pastRecords: [], 
      d: ""
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

    fetchRecords() {
      database.collection('records').get().then((snapshot) => {
        let rec = {}
        snapshot.docs.forEach((doc) => {
          if (doc.data().username == this.user.data.displayName) {
            rec = [doc.data().date, 'A'+doc.data().serialNo, doc.data().itemCat, doc.data().quantity, doc.data().points]
            this.pastRecords.push(rec);
          }
        })
      })
    }
    
  
  }, 

  created() {
    this.fetchRecords()
  }
};
</script>

<style> 
table {
  font-family: "Inconsolata", sans-serif;
  border-collapse: collapse;
  width: 60%;
}

td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
} 

th {
  background-color: rgb(184, 216, 128);
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

</style>