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
      <div id = "center">
      <h5 style="display:inline">Your Points: {{ countPoints }}</h5>
      </div>
      <div id = "center">
      <b-progress :max="max">
        <b-progress-bar :value="countPoints" :label="`${remaining.toFixed(1)}%`" ></b-progress-bar>
      </b-progress>
      </div>
      <div id = "center">
      <div class="level">
        <p style="font-size: 15px">{{ this.now }}</p>
        <span style="margin-left: 485px">{{ this.next }}</span>
      </div>
      </div>
      <br><br>
      <div> 
        <p style="font-size: 20px"><strong>What can your points do?</strong></p>
        <p style="font-size: 15px">Turn every <strong>300 points</strong> into a <strong>$2 donation</strong> to the <strong>Garden City Fund</strong>, managed by the National
        Parks Board.</p>
        <p style="font-size: 15px">Your donation will go towards supporting the research and outreach efforts to help protect, conserve and enhance our natural heritage.</p>
        <p style="font-size: 15px">Learn more at <a href= "https://www.gardencityfund.gov.sg/">https://www.gardencityfund.gov.sg/</a></p>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL9bNIk4c3ib8JXCfzqcOzqYxnAFzZQIGmjOa-WCNWJpzNisCg4aUzVD5KYTRmL4AeveU&usqp=CAU" style="display: inline">
        <button style="margin-left: 100px" v-on:click="checkPoints" class="btn btn-success" >Click to Donate</button>
        <br>
        <p style="font-size: 15px"><strong>Terms and Conditions</strong></p>
        <ul> 
            <li style="font-size: 14px">Multiple redemptions allowed.</li>
            <li style="font-size: 14px">All proceeds will go to the Garden City Fund by the National Parks Board.</li>
            <li style="font-size: 14px">Not entitled to tax relief.</li> 
        </ul>
      </div> 
    <div>  
    <br>
    <p style="font-size: 20px"><strong>Tier Levels</strong></p>
    <table> 
      <tr> 
        <th style="width:100px">Tier</th>
        <th style="width:100px">Points</th> 
      </tr>
      <tr> 
        <td>Welcome Greener <img src="https://i.ibb.co/f8J98b9/sprout.png" style="width: 8%"></td> 
        <td>0-199</td> 
      </tr> 
      <tr>
        <td>Bronze Greener <img src="https://i.ibb.co/FmqYLRk/medal.png" style="width: 8%"></td>
        <td>200-599</td> 
      </tr> 
      <tr>
        <td>Silver Greener <img src="https://i.ibb.co/mRzBQ94/medal-1.png" style="width: 8%"></td> 
        <td>600-999</td> 
      </tr> 
      <tr>
        <td>Gold Greener <img src="https://i.ibb.co/R7L35jS/medal-2.png" style="width: 8%"></td> 
        <td>> 1000</td> 
      </tr> 
    </table>
    <br>
    </div>
    </div>
</template> 

<script>
import { mapGetters } from "vuex";
import database from '../../firebase.js'

export default {
  data() {
    return {
      countPoints: 0,
      remaining: 0, 
      now: "", 
      next: "",
      max: 0,
    }
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },

  methods: {
      fetchPoints() {
      database.collection('users').get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {

          if (doc.data().username == this.user.data.displayName) {
            this.countPoints += doc.data().pts 
            if (this.countPoints < 200) {
                this.now = "Welcome Greener"
                this.next = "Bronze Greener"
                this.remaining = (this.countPoints/200) * 100
                this.max = 200
            } else if (this.countPoints >= 200 && this.countPoints < 600) {
                this.now = "Bronze Greener"
                this.next = "Silver Greener"
                this.remaining = 100-((600-this.countPoints)/600 * 100)
                this.max = 600
            } else if (this.countPoints >= 600 && this.countPoints < 1000) {
                this.now = "Silver Greener" 
                this.next = "Gold Greener"
                this.remaining = 100-((1000-this.countPoints)/1000 * 100)
                this.max = 1000
            } else {
                this.now = "Gold Greener"
                this.next = ""
                this.remaining = 100
                this.max = 100
            }
          } else if (this.countPoints == 0) {
            this.now = "Welcome Greener"
            this.next = "Bronze Greener"
            this.remaining = 0
            this.max = 200
          }
        })
      })
    }, 
    
    checkPoints() {
        if (this.countPoints < 300) {
            alert("Sorry, you do not have enough points to make a donation!")
        } else {
            this.$router.push({path: '/donation'});
        }
    }
      
  }, 

  created() {
    this.fetchPoints()
  }, 

};
</script>

<style scoped> 
.progress {
  position:relative;
  height:70px;
  width: 700px;
}

.progress-bar {
  background-color: rgb(96, 126, 45);
}

.level > p {
  display: inline;
}

.level span {
  margin-left: 41.5%;
  position: relative;
  display: inline;
}

table {
  font-family: "Inconsolata", sans-serif;
  border-collapse: collapse;
  width: 40%;
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