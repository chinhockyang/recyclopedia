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
           </ul>                        
       </nav> 
    <div id="center">
      <h3 v-if="user">Welcome {{user.data.displayName}}!</h3>
    </div>
    <div id="center">
      <div id = "level">
        <img src="https://static.wikia.nocookie.net/farmville/images/e/e3/Sunrise_Seed-icon.png/revision/latest?cb=20130305213231" style="width: 30px"> {{ this.now }}
      </div>
    </div>
    <br>
    <br>
    <div> 
      <h5 id="center">Profile Information</h5>
       <div class="row p-3 mb-5">
        <div class="col-1 col-md-2 col-l-3"></div>
          <div class="col-10 col-md-8 col-l-6 bg-light rounded p-3">
            <form class="containter px-3"> 
                <div class="form-group">
                  <label><strong>Username:</strong> {{ this.user.data.displayName }} </label>
                  <br><input type="text" class="form-control" placeholder="Change username" id="username" v-model="update.name" >
                </div>
                <div class="form-group">
                  <label><strong>Email:</strong> {{ this.user.data.email }} </label>
                  <br><input type="text" class="form-control" placeholder="Change email" id="email" v-model="update.email">
                </div>
                <div class="form-group">
                  <label><strong>Password: </strong></label>
                  <br><input type="password" class="form-control" placeholder="Change password" id="password" v-model="update.password">
                  <br><input type="password" class="form-control" placeholder="Confirm password" id="cfmpw" v-model="update.cfmpw">
                </div>
                <div id="center">
                    <p id="error" v-if="error">{{error}}</p>
                </div>
                <div id="center">
                  <button @click.prevent="updateInfo" class="btn btn-success" >Update Profile</button>
                </div>
            </form>
          </div>
       </div>
    </div>
    <br>
    <div id="center">
      <button class="btn btn-success" @click.prevent="signOut">Sign out</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { Auth } from '@../../firebase/auth';
import { firebaseApp } from '../../firebase.js'
import database from '../../firebase.js'

export default {
  data() {
    return {
      countPoints: 0,
      now: "", 
      update: {
        name: "",
        email: "",
        password: "", 
        cfmpw: ""
      }, 
      error: null,
      pass: false
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

    /* getTier() {
      database.collection('tier').doc(this.user.data.displayName).get().then((doc) => {
          this.level = doc.data().level
      })
    }, 
 */
    fetchPoints() {
      database.collection('users').get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {

          if (doc.data().username == this.user.data.displayName) {
            this.countPoints += doc.data().pts 
            if (this.countPoints < 200) {
                this.now = "Welcome Greener"
            } else if (this.countPoints >= 200 && this.countPoints < 600) {
                this.now = "Bronze Greener"
            } else if (this.countPoints >= 600 && this.countPoints < 1000) {
                this.now = "Silver Greener" 
            } else {
                this.now = "Gold Greener"
            }
            database.collection('tier').doc(this.user.data.displayName).set({"level": this.now}) 
          } else if (this.countPoints == 0) {
            this.now = "Welcome Greener"
            this.next = "Bronze Greener"
            this.remaining = 0
            this.max = 200
          }
        })
      })
    }, 

    updateInfo() {
      this.error=null
      this.pass = false
      if (this.update.name != "") {
        firebaseApp.auth().currentUser.updateProfile({
            displayName: this.update.name
        })
        this.pass = true
      } else if (this.update.password != "" && this.update.cfmpw != "") {
        if (this.update.password != this.update.cfmpw) {
          this.error="New passwords do not match"
        } else if (this.update.password.length <= 6) {
          this.error = "Passwords should be at least 6 characters"
        } else {
          firebaseApp.auth().currentUser.updatePassword(this.update.password)
          this.pass = true 
        }
      } else if (this.update.email != "") {
        firebaseApp.auth().currentUser.updateEmail(this.update.email).catch(err => {
          this.error = err.message;
        }).then(() => {
          if (this.error == null) {
          this.pass = true 
          }
        })
      } 
      if (this.pass == true) {
         alert("Profile Information updated successfully!")
      }
    }

  },

  created() {
    this.fetchPoints()
  },  

}
</script>

<style scoped> 
#tier {
  display: inline;
  font-size: 15px;
  color: green
}

#level {
  background-color: rgb(221, 221, 130);
  width: 13%
}

#center { 
    display: flex;
    justify-content: center;
    align-items:center
}

#error {
    color: red
}
</style>