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
      <div id="center"> 
       <button type="button" class="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#exampleModal">Tier Information</button>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Tier Levels</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <table> 
                <tr> 
                  <th style="width:100px">Tier</th>
                  <th style="width:100px">Points</th> 
                </tr>
                <tr> 
                  <td>Welcome Greener <img src="https://i.ibb.co/f8J98b9/sprout.png" style="width: 10%"></td> 
                  <td>0-199</td> 
                </tr> 
                <tr>
                  <td>Bronze Greener <img src="https://i.ibb.co/FmqYLRk/medal.png" style="width: 10%"></td>
                  <td>200-599</td> 
                </tr> 
                <tr>
                  <td>Silver Greener <img src="https://i.ibb.co/mRzBQ94/medal-1.png" style="width: 10%"></td> 
                  <td>600-999</td> 
                </tr> 
                <tr>
                  <td>Gold Greener <img src="https://i.ibb.co/R7L35jS/medal-2.png" style="width: 10%"></td> 
                  <td>> 1000</td> 
                </tr> 
              </table>
              <br>
              <h6>How to earn more points?</h6>
              <ol> 
                <li>Recycle more!  Every recycled item earns you 5 points.</li> 
                <li>Complete the Weekly Quiz Challenge!</li> 
              </ol>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div> 
        <p style="font-size: 20px" id="center"><strong>Browse Rewards</strong></p>
      </div> 
      <div id="center"> 
       <button type="button" class="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#rewardsModal">View My Rewards</button>
        <div class="modal fade" id="rewardsModal" tabindex="-1" role="dialog" aria-labelledby="rewardsModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="rewardsModalLabel">All Rewards</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" v-for="(item, index) in allRewards" v-bind:key="index">
                   <div class="card" style="width: 100%;">
                    <img :src="item[3]" class="card-img-top" alt="Card image cap">
                    <div class="card-body">
                      <p class="card-text"><strong>{{ item[0] }}: {{ item[1] }}</strong><br>{{ item[2] }}<br>Expires: {{ item[4] }}</p>
                    </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="false">        
    <div class="carousel-inner">
      <div class="carousel-item active">
      <div class="container w-80 mx-auto mt-3 row" id="center">  
      <div class="card" style="width: 15rem; margin-left: 20px">
        <img src="https://i.ibb.co/t2WFg71/639-6390556-lunch-break-bamboo-cutlery-set-sustainable-cutlery-hd.png" style="height:200px" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">$2 off </h5>
          <p class="card-text" style="font-size: 18px">Bamboo Cutlery</p>
          <h6>Your Sustainable Store</h6>
          <br>
          <p class="card-text" style="font-size: 15px"><img src="https://i.ibb.co/1nMWYd4/coupon.png" style="width: 10%"><strong>    100 points</strong></p>
          <a class="btn btn-success" v-on:click="claimReward1">Claim</a>
        </div>
      </div>
     <div class="card" style="width: 15rem; margin-left: 20px">
        <img src="https://i.ibb.co/nzDSZYV/Bamboo-Cotton-Swab-Black-1024x1024-2x.png" style="height:200px" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">20% off </h5>
          <p class="card-text" style="font-size: 18px">Bamboo Cotton Swabs</p>
          <h6>The Humble Co.</h6>
          <br>
          <p class="card-text" style="font-size: 15px"><img src="https://i.ibb.co/1nMWYd4/coupon.png" style="width: 10%"><strong>    200 points</strong></p>
          <a class="btn btn-success" v-on:click="claimReward2">Claim</a>
        </div>
      </div>
      <div class="card" style="width: 15rem; margin-left: 20px">
        <img src="https://i.ibb.co/kQxmBtq/BBLTISS12-BXCRT.png" style="height:200px" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Buy 1 get 1 Free </h5>
          <p class="card-text" style="font-size: 18px">BAMBOOLOO® Tissues</p>
          <h6>The Green Collective SG</h6>
          <br>
          <p class="card-text" style="font-size: 15px"><img src="https://i.ibb.co/1nMWYd4/coupon.png" style="width: 10%"><strong>    200 points</strong></p>
          <a class="btn btn-success" v-on:click="claimReward3">Claim</a>
        </div>
      </div>
      <div class="card" style="width: 15rem; margin-left: 20px">
        <img src="https://i.ibb.co/YZxdH5R/product-title-paris-garden-spectrumstoresg-700x.jpg" style="height:200px" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">20% off </h5>
          <p class="card-text" style="font-size: 18px">Biodegradable Pot</p>
          <h6>Spectrum Store SG</h6>
          <br>
          <p class="card-text" style="font-size: 15px"><img src="https://i.ibb.co/1nMWYd4/coupon.png" style="width: 10%"><strong>    300 points</strong></p>
          <a class="btn btn-success" v-on:click="claimReward4">Claim</a>
        </div>
      </div>
      </div>
      </div>
      <div class="carousel-item">
      <div class="container w-80 mx-auto mt-3 row" id="center">  
      <div class="card" style="width: 15rem; margin-left: 20px">
        <img src="https://i.ibb.co/tsqGBL5/eco-friendly-products-10.jpg" style="height:200px" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Buy 2 get 1 Free </h5>
          <p class="card-text" style="font-size: 18px">Laundry Egg</p>
          <h6>ecoegg</h6>
          <br>
          <p class="card-text" style="font-size: 15px"><img src="https://i.ibb.co/1nMWYd4/coupon.png" style="width: 10%"><strong>    300 points</strong></p>
          <a class="btn btn-success" v-on:click="claimReward5">Claim</a>
        </div>
      </div>
     <div class="card" style="width: 15rem; margin-left: 20px">
        <img src="https://i.ibb.co/GxCJrbd/eco-friendly-products-6.jpg" style="height:200px" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">15% off </h5>
          <p class="card-text" style="font-size: 18px">Natural Deodorant</p>
          <h6>iHerb</h6>
          <br>
          <p class="card-text" style="font-size: 15px"><img src="https://i.ibb.co/1nMWYd4/coupon.png" style="width: 10%"><strong>    300 points</strong></p>
          <a class="btn btn-success" v-on:click="claimReward6">Claim</a>
        </div>
      </div>
      <div class="card" style="width: 15rem; margin-left: 20px">
        <img src="https://i.ibb.co/9pSXYbX/eco-friendly-products-2.png" style="height:200px" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">$3 off </h5>
          <p class="card-text" style="font-size: 18px">Reusable Tea Infusers</p>
          <h6>Forty Two</h6>
          <br>
          <p class="card-text" style="font-size: 15px"><img src="https://i.ibb.co/1nMWYd4/coupon.png" style="width: 10%"><strong>    300 points</strong></p>
          <a class="btn btn-success" v-on:click="claimReward7">Claim</a>
        </div>
      </div>
      <div class="card" style="width: 15rem; margin-left: 20px">
        <img src="https://i.ibb.co/h9r8zMn/eco-friendly-products-5.jpg" style="height:200px" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">20% off </h5>
          <p class="card-text" style="font-size: 18px">Beeswax Food Wraps</p>
          <h6>Minimakers</h6>
          <br>
          <p class="card-text" style="font-size: 15px"><img src="https://i.ibb.co/1nMWYd4/coupon.png" style="width: 10%"><strong>    300 points</strong></p>
          <a class="btn btn-success" v-on:click="claimReward8">Claim</a>
        </div>
      </div>
      </div>
      </div>
    </div>  
    <ol class="carousel-indicator d-flex justify-content-center mb-4">
        <li
          class="carousel-control-prev position-relative m-3 p-1"
          style="background-color:grey;"
          type="button"
          data-target="#carouselExampleIndicators"
          data-slide="prev"          
        >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>      
        </li>                      
        <li      
            class="carousel-control-next position-relative m-3 p-1"
            style="background-color:grey;"
            type="button"
            data-target="#carouselExampleIndicators"
            data-slide="next"                            
        >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>      
        </li>
      </ol>
  </div>
    <br>
    <div id="center"> 
        <p style="font-size: 20px"><strong>What else can your points do?</strong></p>
        </div>
        <div id="center"> 
        <p style="font-size: 15px">Turn every <strong>300 points</strong> into a <strong>$2 donation</strong> to the <strong>Garden City Fund</strong>, managed by the National
        Parks Board.</p></div>
        <div id="center">
        <p style="font-size: 15px">Your donation will go towards supporting the research and outreach efforts to help protect, conserve and enhance our natural heritage.</p></div>
        <div id="center">
        <p style="font-size: 15px">Learn more at <a href= "https://www.gardencityfund.gov.sg/">https://www.gardencityfund.gov.sg/</a></p></div><div id="center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL9bNIk4c3ib8JXCfzqcOzqYxnAFzZQIGmjOa-WCNWJpzNisCg4aUzVD5KYTRmL4AeveU&usqp=CAU" style="display: inline">
        <button style="margin-left: 40px" v-on:click="checkPoints" class="btn btn-success btn-lg" >Click to Donate</button>
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
      allRewards: [],
      id: "", 
      deduct: {
          pts: 0, 
          username: "", 
          action: "", 
          date: "", 
          day: 0
      },
      claimed: {
        username: "",
        img: "",
        name: "", 
        place: "", 
        promo: "", 
        expiry: ""
      }
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
            this.$router.push({path: '/donationForm'});
        }
    }, 

    fetchRewards() {
      database.collection('userRewards').get().then((snapshot) => {
        let rew = []
        snapshot.docs.forEach((doc) => {
          if (doc.data().username == this.user.data.displayName) {
            rew = [doc.data().promo, doc.data().name, doc.data().place, doc.data().img, doc.data().expiry]
            this.allRewards.push(rew);
          }
        })
      })
    }, 

    claimReward1() {
      if (this.countPoints < 100) {
            alert("Sorry, you do not have enough points to claim this reward!")
      } else {
       database.collection('rewards').get().then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().name == "Bamboo Cutlery") {
              this.claimed.username = this.user.data.displayName
              this.claimed.name = "Bamboo Cutlery"
              this.claimed.img = doc.data().img 
              this.claimed.place = doc.data().place
              this.claimed.promo = doc.data().promo
              this.claimed.expiry = "31 Dec 2021"
              this.deduct.pts=doc.data().points
              this.deduct.username = this.user.data.displayName
              this.deduct.action ="Claimed Reward: Bamboo Cutlery"
              var date = new Date
              var options = {month: 'long'}
              var d = new Intl.DateTimeFormat('en-US', options)
              var month = d.format(date)
              this.deduct.day = parseInt(date.getDate())
              this.deduct.date = date.getDate() + ' ' + month + ' ' + date.getFullYear()
              database.collection('userRewards').add(this.claimed)
              database.collection('users').add(this.deduct)
            }
          })
        })
        alert("You have successfully claimed this reward!")
        this.$router.push({path: '/points'})
        location.reload()
      }
    }, 

    claimReward2() {
      if (this.countPoints < 200) {
            alert("Sorry, you do not have enough points to claim this reward!")
      } else {
       database.collection('rewards').get().then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().name == "Bamboo Cotton Swabs") {
              this.claimed.username = this.user.data.displayName
              this.claimed.name = "Bamboo Cotton Swabs"
              this.claimed.img = doc.data().img 
              this.claimed.place = doc.data().place
              this.claimed.promo = doc.data().promo
              this.claimed.expiry = "31 Dec 2021"
              this.deduct.pts=doc.data().points
              this.deduct.username = this.user.data.displayName
              this.deduct.action ="Claimed Reward: Bamboo Cotton Swabs"
              var date = new Date
              var options = {month: 'long'}
              var d = new Intl.DateTimeFormat('en-US', options)
              var month = d.format(date)
              this.deduct.day = parseInt(date.getDate())
              this.deduct.date = date.getDate() + ' ' + month + ' ' + date.getFullYear()
              database.collection('userRewards').add(this.claimed)
              database.collection('users').add(this.deduct)
            }
          })
        })
        alert("You have successfully claimed this reward!")
        this.$router.push({path: '/points'})
        location.reload()
      }
    }, 

    claimReward3() {
      if (this.countPoints < 200) {
            alert("Sorry, you do not have enough points to claim this reward!")
      } else {
       database.collection('rewards').get().then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().name == "BAMBOOLOO® Tissues") {
              this.claimed.username = this.user.data.displayName
              this.claimed.name = "BAMBOOLOO® Tissues"
              this.claimed.img = doc.data().img 
              this.claimed.place = doc.data().place
              this.claimed.promo = doc.data().promo
              this.claimed.expiry = "31 Dec 2021"
              this.deduct.pts=doc.data().points
              this.deduct.username = this.user.data.displayName
              this.deduct.action ="Claimed Reward: BAMBOOLOO® Tissues"
              var date = new Date
              var options = {month: 'long'}
              var d = new Intl.DateTimeFormat('en-US', options)
              var month = d.format(date)
              this.deduct.day = parseInt(date.getDate())
              this.deduct.date = date.getDate() + ' ' + month + ' ' + date.getFullYear()
              database.collection('userRewards').add(this.claimed)
              database.collection('users').add(this.deduct)
            }
          })
        })
        alert("You have successfully claimed this reward!")
        this.$router.push({path: '/points'})
        location.reload()
      }
    }, 

    claimReward4() {
      if (this.countPoints < 300) {
            alert("Sorry, you do not have enough points to claim this reward!")
      } else {
       database.collection('rewards').get().then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().name == "Biodegradable Pot") {
              this.claimed.username = this.user.data.displayName
              this.claimed.name = "Biodegradable Pot"
              this.claimed.img = doc.data().img 
              this.claimed.place = doc.data().place
              this.claimed.promo = doc.data().promo
              this.claimed.expiry = "31 Dec 2021"
              this.deduct.pts=doc.data().points
              this.deduct.username = this.user.data.displayName
              this.deduct.action ="Claimed Reward: Biodegradable Pot"
              var date = new Date
              var options = {month: 'long'}
              var d = new Intl.DateTimeFormat('en-US', options)
              var month = d.format(date)
              this.deduct.day = parseInt(date.getDate())
              this.deduct.date = date.getDate() + ' ' + month + ' ' + date.getFullYear()
              database.collection('userRewards').add(this.claimed)
              database.collection('users').add(this.deduct)
            }
          })
        })
        alert("You have successfully claimed this reward!")
        this.$router.push({path: '/points'})
        location.reload()
      }
    }, 

    claimReward5() {
      if (this.countPoints < 300) {
            alert("Sorry, you do not have enough points to claim this reward!")
      } else {
       database.collection('rewards').get().then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().name == "Laundry Egg") {
              this.claimed.username = this.user.data.displayName
              this.claimed.name = "Laundry Egg"
              this.claimed.img = doc.data().img 
              this.claimed.place = doc.data().place
              this.claimed.promo = doc.data().promo
              this.claimed.expiry = "31 Dec 2021"
              this.deduct.pts=doc.data().points
              this.deduct.username = this.user.data.displayName
              this.deduct.action ="Claimed Reward: Laundry Egg"
              var date = new Date
              var options = {month: 'long'}
              var d = new Intl.DateTimeFormat('en-US', options)
              var month = d.format(date)
              this.deduct.day = parseInt(date.getDate())
              this.deduct.date = date.getDate() + ' ' + month + ' ' + date.getFullYear()
              database.collection('userRewards').add(this.claimed)
              database.collection('users').add(this.deduct)
            }
          })
        })
        alert("You have successfully claimed this reward!")
        this.$router.push({path: '/points'})
        location.reload()
      }
    }, 

    claimReward6() {
      if (this.countPoints < 300) {
            alert("Sorry, you do not have enough points to claim this reward!")
      } else {
       database.collection('rewards').get().then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().name == "Natural Deodorant") {
              this.claimed.username = this.user.data.displayName
              this.claimed.name = "Natural Deodorant"
              this.claimed.img = doc.data().img 
              this.claimed.place = doc.data().place
              this.claimed.promo = doc.data().promo
              this.claimed.expiry = "31 Dec 2021"
              this.deduct.pts=doc.data().points
              this.deduct.username = this.user.data.displayName
              this.deduct.action ="Claimed Reward: Natural Deodorant"
              var date = new Date
              var options = {month: 'long'}
              var d = new Intl.DateTimeFormat('en-US', options)
              var month = d.format(date)
              this.deduct.day = parseInt(date.getDate())
              this.deduct.date = date.getDate() + ' ' + month + ' ' + date.getFullYear()
              database.collection('userRewards').add(this.claimed)
              database.collection('users').add(this.deduct)
            }
          })
        })
        alert("You have successfully claimed this reward!")
        this.$router.push({path: '/points'})
        location.reload()
      }
    }, 

    claimReward7() {
      if (this.countPoints < 300) {
            alert("Sorry, you do not have enough points to claim this reward!")
      } else {
       database.collection('rewards').get().then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().name == "Reusable Tea Infusers") {
              this.claimed.username = this.user.data.displayName
              this.claimed.name = "Reusable Tea Infusers"
              this.claimed.img = doc.data().img 
              this.claimed.place = doc.data().place
              this.claimed.promo = doc.data().promo
              this.claimed.expiry = "31 Dec 2021"
              this.deduct.pts=doc.data().points
              this.deduct.username = this.user.data.displayName
              this.deduct.action ="Claimed Reward: Reusable Tea Infusers"
              var date = new Date
              var options = {month: 'long'}
              var d = new Intl.DateTimeFormat('en-US', options)
              var month = d.format(date)
              this.deduct.day = parseInt(date.getDate())
              this.deduct.date = date.getDate() + ' ' + month + ' ' + date.getFullYear()
              database.collection('userRewards').add(this.claimed)
              database.collection('users').add(this.deduct)
            }
          })
        })
        alert("You have successfully claimed this reward!")
        this.$router.push({path: '/points'})
        location.reload()
      }
    }, 

    claimReward8() {
      if (this.countPoints < 300) {
            alert("Sorry, you do not have enough points to claim this reward!")
      } else {
       database.collection('rewards').get().then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.data().name == "Beeswax Food Wraps") {
              this.claimed.username = this.user.data.displayName
              this.claimed.name = "Beeswax Food Wraps"
              this.claimed.img = doc.data().img 
              this.claimed.place = doc.data().place
              this.claimed.promo = doc.data().promo
              this.claimed.expiry = "31 Dec 2021"
              this.deduct.pts=doc.data().points
              this.deduct.username = this.user.data.displayName
              this.deduct.action ="Claimed Reward: Beeswax Food Wraps"
              var date = new Date
              var options = {month: 'long'}
              var d = new Intl.DateTimeFormat('en-US', options)
              var month = d.format(date)
              this.deduct.day = parseInt(date.getDate())
              this.deduct.date = date.getDate() + ' ' + month + ' ' + date.getFullYear()
              database.collection('userRewards').add(this.claimed)
              database.collection('users').add(this.deduct)
            }
          })
        })
        alert("You have successfully claimed this reward!")
        this.$router.push({path: '/points'})
        location.reload()
      }
    }, 



      
  }, 

  created() {
    this.fetchPoints()
    this.fetchRewards()
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