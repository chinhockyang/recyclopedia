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
               <li>
                    <router-link to="/dashboard" 
                    class="nav-link"
                    id="quick-search-tab" 
                    data-toggle="pill"                     
                    role="tab" 
                    >Profile Information</router-link>
               </li>
           </ul>                        
       </nav> 
    <div>
      <past-records></past-records>
      <br>
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
        <tr v-for="(item, index) in pastRecordsVisible" v-bind:key="index">
          <td>{{ index + 1}}</td>
          <td v-for="(value, key, index) in item" v-bind:key="index">{{ value }}</td>
        </tr>
      </table>

      <pagination 
        :items="pastRecords" 
        @page:update="updatePageRecycled"
        :currentPage="currentPageRecycled"
        :pageSize="pageSize">
      </pagination>

    </div>
    <br>
    <div> 
        <h5>Past Donations</h5>
        <table> 
        <tr>
          <th>No.</th>
          <th>Date Donated</th>
          <th>Organization/Honoree Name</th> 
          <th>Donation Amount</th>
        </tr>
        <tr v-for="(item, index) in pastDonationsVisible" v-bind:key="index">
          <td>{{ index + 1}}</td>
          <td v-for="(value, key, index) in item" v-bind:key="index">{{ value }}</td>
        </tr>
      </table>

      <pagination 
        :items="pastDonations" 
        @page:update="updatePageDonations"
        :currentPage="currentPageDonations"
        :pageSize="pageSize">
      </pagination>

    </div>
    <br>
    <div> 
        <h5>Past Points Transactions</h5>
        <table> 
        <tr>
          <th>No.</th>
          <th>Date Transacted</th>
          <th>Action</th> 
          <th>Points</th>
        </tr>
        <tr v-for="(item, index) in pastTransVisible" v-bind:key="index">
          <td>{{ index + 1}}</td>
          <td v-for="(value, key, index) in item" v-bind:key="index">{{ value }}</td>
        </tr>
      </table>

      <pagination 
        :items="pastTrans" 
        @page:update="updatePageTrans"
        :currentPage="currentPageTrans"
        :pageSize="pageSize">
      </pagination>
    </div>
</div>

</template>

<script>
import { mapGetters } from "vuex";
import database from '../../firebase.js'
import pastRecords from '.././charts/pastRecords.vue'
import Pagination from '../encyclopedia/Pagination.vue'

export default {
  components: {
    'past-records': pastRecords,
    'pagination': Pagination
  }, 

  data() {
    return {
      pastRecords: [], 
      pastDonations: [], 
      pastTrans : [],

      //currentPage: page of pagination - 1
      //pageSize: number of items shown per page
      currentPageRecycled: 0,
      currentPageDonations: 0,
      currentPageTrans: 0,
      pageSize: 10,
      pastRecordsVisible: [],
      pastDonationsVisible: [],
      pastTransVisible: []
    }
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },

  methods: {
    
    fetchRecords() {
      database.collection('records').orderBy("day", "asc").get().then((snapshot) => {
        let rec = {}
        snapshot.docs.forEach((doc) => {
          if (doc.data().username == this.user.data.displayName) {
            rec = [doc.data().date, 'A'+doc.data().serialNo, doc.data().itemCat, doc.data().quantity, doc.data().points]
            this.pastRecords.push(rec);
          }
        })
      })
    },

    fetchDonations() {
        database.collection('donation').orderBy("day", "asc").get().then((snapshot) => {
            let donation = {}
            snapshot.docs.forEach((doc) => {
                if (doc.data().username == this.user.data.displayName) {
                    donation = [doc.data().date, doc.data().who,'$2.00'] 
                    this.pastDonations.push(donation)
                }
            })
        })
    },

    fetchPast() {
      database.collection('users').orderBy("day", "asc").get().then((snapshot) => {
        let old = {} 
        snapshot.docs.forEach((doc) => {
          if (doc.data().username == this.user.data.displayName) {
            old = [doc.data().date, doc.data().action, doc.data().pts ]
            this.pastTrans.push(old)
          }
        })
      })
    },

    //updates the page number of pagination
    updatePageRecycled: function(pageNumber) {
      this.currentPageRecycled = pageNumber;        
    },
    updatePageDonations: function(pageNumber) {
      this.currentPageDonations = pageNumber;        
    },
    updatePageTrans: function(pageNumber) {
      this.currentPageTrans = pageNumber;        
    },

    //slice list to get only the items on the current page
    updateVisibleRecycled() {
      this.pastRecordsVisible = this.pastRecords.slice(this.currentPageRecycled * this.pageSize, parseInt((this.currentPageRecycled * this.pageSize) + this.pageSize));
      console.log("this.pastRecords.length is...");
      console.log(this.pastRecords.length);
      console.log("this.pastRecordsVisible.length is...");
      console.log(this.pastRecordsVisible.length);
      // if there are 0 items on current page, go back 1 page
      if (this.pastRecordsVisible.length == 0 && this.currentPage > 0) {
        this.updatePageRecycled(this.currentPageRecycled - 1);
      }
    },

    updateVisibleDonated() {
      this.pastDonationsVisible = this.pastDonations.slice(this.currentPageDonations * this.pageSize, parseInt((this.currentPageDonations * this.pageSize) + this.pageSize));
      console.log("this.pastDonationsVisible.length is...");
      console.log(this.pastDonationsVisible.length);
      // if there are 0 items on current page, go back 1 page
      if (this.pastDonationsVisible.length == 0 && this.currentPage > 0) {
        this.updatePageDonations(this.currentPageDonations - 1);
      }
    },

    updateVisibleTrans() {
      this.pastTransVisible = this.pastTrans.slice(this.currentPageTrans * this.pageSize, parseInt((this.currentPageTrans * this.pageSize) + this.pageSize));
      console.log("this.pastTransVisible.length is...");
      console.log(this.pastTransVisible.length);
      // if there are 0 items on current page, go back 1 page
      if (this.pastTransVisible.length == 0 && this.currentPage > 0) {
        this.updatePageTrans(this.currentPageTrans - 1);
      }
    },
  
  }, 

  created() {
    this.fetchRecords()
    this.fetchDonations()
    this.fetchPast()
  }, 

  beforeUpdate() {
    this.updateVisibleRecycled();
    this.updateVisibleDonated();
    this.updateVisibleTrans();
  }

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