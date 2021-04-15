<template>
<div> 
    <div class="jumbotron jumbotron-fluid" id="donationjumb" >
  <div class="container">
    <h1 class="display-4"><strong>You can make a difference.</strong></h1>
    <p class="lead"><strong>Over the years, more corporations, foundations and individuals have stepped forward to support the Garden City Fund as they understood the 
      importance of their involvement to conserve our natural heritage and unique biodiversity.</strong></p>
  </div>
</div>
<br>
<div class="containter px-3" style="float:left">
<iframe width="550" height="310" src="https://www.youtube.com/embed/l6P22HBnZ44" title="YouTube video player" 
 frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>
 </div>
    <div class="containter px-3" style="float-right; margin-left: 10px"> 
        <p style="font-size: 20px"><strong>Make a donation today!</strong></p>
        <p style="font-size: 15px">You can  play a part in protecting and enhancing our natural heritage.</p>
        <p style="font-size: 15px">Your donation will go towards <strong>supporting the research and outreach efforts</strong> to help protect, conserve and enhance our natural heritage.</p>
        <p style="font-size: 15px">Learn more at <a href= "https://www.gardencityfund.gov.sg/">https://www.gardencityfund.gov.sg/</a></p>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL9bNIk4c3ib8JXCfzqcOzqYxnAFzZQIGmjOa-WCNWJpzNisCg4aUzVD5KYTRmL4AeveU&usqp=CAU" style="display: inline">
        <button style="margin-left: 60px" v-on:click="checkPoints" class="btn btn-success btn-lg" >Click to Donate</button>
        <br><br>
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
        // if (this.countPoints < 300) {
        //     alert("Sorry, you do not have enough points to make a donation!")
        // } else {
            this.$router.push({path: '/publicDonation'});
        }
    
      
  }, 

  created() {
    this.fetchPoints()
  }, 

};

</script>

<style> 
#donationjumb {
  background-image: url("https://athome.reachtheworld.org/wp-content/uploads/2020/09/Singapore.jpg");
  background-size: cover;
}

</style>
