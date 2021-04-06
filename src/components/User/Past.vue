<template> 
<div class="containter px-3"> 
    <br>
    <div>
      <h5>Past Recycling Records</h5>
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
    <div> 
        <h5>Past Points Transactions</h5>
    </div>
</div>

</template>

<script>
import { mapGetters } from "vuex";
import database from '../../firebase.js'

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
  
  }, 

  created() {
    this.fetchRecords()
  }, 



};
</script>

<style scoped> 
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