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
        <router-link to="/donation"><button style="margin-left: 30px" class="btn btn-success" >Click to Donate</button></router-link>
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
      remaining: 0
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
    this.fetchPoints()
    this.updatePointsBar()
  }, 



};
</script>

<style scoped> 
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
  display: inline;
}

</style>