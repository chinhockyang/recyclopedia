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
                    >My Rewards</router-link>
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
    </div>
    <br>
    <div>
      <h5 id="center">Activity History</h5><br>
      <div id="center">
        <table> 
        <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Action</th> 
          <th>Points</th>
        </tr>
        <tr v-for="(item, index) in pastTransVisible" v-bind:key="index">
          <td>{{ (index + 1) + (currentPageTrans*pageSize) }}</td>
          <td v-for="(value, key, index) in item" v-bind:key="index">{{ value }}</td>
        </tr>
      </table>
      </div>
      </div>
      <div id="center">
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
      pastTrans : [],

      //currentPage: page of pagination - 1
      //pageSize: number of items shown per page
      currentPageTrans: 0,
      pageSize: 10,
      pastTransVisible: []
    }
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },

  methods: {

    fetchPast() {
      database.collection('users').orderBy("day", "desc").get().then((snapshot) => {
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
    updatePageTrans: function(pageNumber) {
      this.currentPageTrans = pageNumber;        
    },

    //slice list to get only the items on the current page

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
    this.fetchPast()
  }, 

  beforeUpdate() {
    this.updateVisibleTrans();
  }

};
</script>

<style scoped> 
table {
  font-family: "Inconsolata", sans-serif;
  border-collapse: collapse;
  width: 100%;
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

.nav-tabs > li > a {
    color: black;
}
.nav-tabs > li > a:hover {
    background-color: lightgray;
}
.nav-tabs > li > a.active {
    color: white;
    background-color: olivedrab;
}

</style>