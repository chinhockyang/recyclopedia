<template> 
<div class="containter px-3"> 
    <br>
      <h5>Your Points: {{ countPoints }}</h5>
      <div class="progress">
         <div class="progress-bar progress-bar-success" role="progressbar" id="pointsBar" value="" max="200" style="width: ''">{{ remaining }}%</div>
      </div>
      <div class="level">
        <p style="font-size: 15px">Welcome Greener</p>
        <span>Bronze Greener</span>
      </div>
      <button v-on:click="this.updatePointsBar"></button>
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
      level: ""
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
                this.level = "Welcome Greener"
            } else if (this.countPoints >= 200 && this.countPoints < 600) {
                this.level = "Bronze Greener"
            } else if (this.countPoints >= 600 && this.countPoints < 1000) {
                this.level = "Silver Greener" 
            } else {
                this.level = "Gold Greener"
            }
            database.collection('tier').doc(this.user.data.displayName).set({"level": this.level}) 
            this.remaining = (this.countPoints/200) * 100
          }
        })
      })
    }, 

    updatePointsBar() {
      var pb = document.getElementById("pointsBar")
      pb.value = this.countPoints
      pb.style.width = this.remaining + "%"
    
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
    this.updatePointsBar()
  }, 

};
</script>

<style> 
.progress {
  position:relative;
  height:70px;
  width: 60%;
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

</style>