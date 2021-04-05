<template>
  <div class="containter px-3"> 
    <br>
    <h3 v-if="user">Welcome {{user.data.displayName}}!</h3>
    <br>  
    <div> 
      <h6>Your Points: {{ countPoints }}</h6>
      <div class="progress">
         <div class="progress-bar progress-bar-success" role="progressbar" id="pointsBar" value="" max="200" style="width: ''">{{ remaining }}%</div>
      </div>
      <div class="level">
        <p style="font-size: 15px">Welcome Greener</p>
        <span>Bronze Greener</span>
      </div>
      <button v-on:click="this.updatePointsBar"></button>
    </div>
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
      d: "",
      countPoints: 0,
      remaining: 0
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
    }, 

    fetchPoints() {
      database.collection('users').get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {

          if (doc.data().username == this.user.data.displayName) {
            this.countPoints += doc.data().pts
            this.remaining = (this.countPoints/200) * 100
          }
        })
      })
    }, 

    updatePointsBar() {
      var pb = document.getElementById("pointsBar")
      pb.value = this.countPoints
      pb.style.width = this.remaining + "%"
    
    }
    
  
  }, 

  created() {
    this.fetchRecords()
    this.fetchPoints()
    this.updatePointsBar()
  }, 



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

.progress {
  position:relative;
  height:70px;
  width: 60%;
}

.progress-bar {
  background-color: rgb(96, 126, 45);
}

.raised {
  position:absolute;
  left:10px;
  top:9px;
}
.goal {
  position:absolute;
  right:10px;
  top:9px;
}

.level > p {
  display: inline;
}

.level span {
  margin-left: 41.5%;
  display: inline;
}

</style>