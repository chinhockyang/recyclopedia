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
    <div id="center">
      <h3 v-if="user">Welcome {{ this.yourName }}!</h3>
    </div>
    <div id="center">
      <div id="center">
        <template v-if="this.now === 'Welcome Greener'">
        <b-badge pill variant="success" style="width: 60%"><img src="https://www.flaticon.com/svg/vstatic/svg/628/628297.svg?token=exp=1618212197~hmac=1797f5b178d99fb91dc1f3a7b6981d42" style="width: 10%">  {{ this.now }}</b-badge>
        </template> 
        <template v-if="this.now === 'Bronze Greener'">
        <b-badge pill variant="danger" style="width: 30%"><img src="https://www.flaticon.com/svg/vstatic/svg/2583/2583434.svg?token=exp=1618212295~hmac=ffd49f29b5d10deeae2e0bd3c1cc85bf" style="width: 10%">  {{ this.now }}</b-badge>
        </template> 
        <template v-if="this.now === 'Silver Greener'">
        <b-badge pill variant="secondary" style="width: 28%"><img src="https://www.flaticon.com/svg/vstatic/svg/2583/2583319.svg?token=exp=1618212397~hmac=46d735cc48cd11df12c6a3ac3bea638d" style="width: 10%">  {{ this.now }}</b-badge>
        </template> 
        <template v-if="this.now === 'Gold Greener'">
        <b-badge pill variant="warning" style="width: 28%"><img src="https://www.flaticon.com/svg/vstatic/svg/2583/2583344.svg?token=exp=1618212442~hmac=a46695df96d9319ebf095b98433bf18d" style="width: 10%">  {{ this.now }}</b-badge>
        </template> 
      </div>
    </div>
    <br>
    <div> 
      <h5 id="center">Profile Information</h5>
       <div class="row p-3 mb-5">
        <div class="col-1 col-md-2 col-l-3"></div>
          <div class="col-10 col-md-8 col-l-6 bg-light rounded p-3">
            <form class="containter px-3"> 
                <div class="form-group">
                  <p style="font-size: 20px"><strong>Username:</strong> {{ this.yourName }}</p>
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#usernamemodal">Change Username</button>
                </div>
                <div class="form-group">
                  <p style="font-size: 20px"><strong>Email:</strong> {{ this.user.data.email }} </p>
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#emailmodal">Change Email</button>
                </div>
                <div class="form-group">
                  <p style="font-size: 20px"><strong>Password </strong></p>
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#passwordmodal">Change Password</button>
                </div>
            </form>
          </div>
       </div>
    </div>
    <div id="center">
      <button class="btn btn-success" @click.prevent="signOut">Sign out</button>
    </div>
    <div class="modal fade" id="usernamemodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Change Username</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" placeholder="Username" id="username" v-model="update.name" >
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" v-on:click="updateUsername" data-dismiss="modal" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="emailmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Change Email</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" placeholder="Email" id="email" v-model="update.email">
            <br>
            <div id="center">
              <p id="error" v-if="error">{{error}}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" v-on:click="updateEmail" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="passwordmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Change Email</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            <input type="password" class="form-control" placeholder="New Password" id="password" v-model="update.password">
            <br><input type="password" class="form-control" placeholder="Confirm password" id="cfmpw" v-model="update.cfmpw">
            <br>
            <div id="center">
              <p id="error" v-if="error">{{error}}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" v-on:click="updatePassword" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
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
      yourName: "",
      countPoints: 0,
      now: "", 
      update: {
        name: "",
        email: "",
        password: "", 
        cfmpw: ""
      }, 
      oldname: "",
      error: null,
      pass: false,
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
          location.reload()
        });
    }, 

     fetchName() {
      database.collection('tier').get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id == this.user.data.displayName) {
            this.yourName = doc.data().name
          }
        })
        
      })
    },   

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
          } else if (this.countPoints == 0) {
            this.now = "Welcome Greener"
            this.next = "Bronze Greener"
            this.remaining = 0
            this.max = 200
          }
        })
      })
    }, 

    updateUsername() {
      this.error = null
      this.pass = false 
      if (this.update.name != "") {
        database.collection('tier').doc(this.user.data.displayName).set({level: this.now, name: this.update.name})
        this.pass = true 
      }
      if (this.pass == true) {
        alert("Profile Information updated successfully!  Please sign in again.")
         this.signOut()
      }
    },

    updateEmail() {
      this.error = null
      this.pas = false 
      if (this.update.email != "") {
        firebaseApp.auth().currentUser.updateEmail(this.update.email).catch(err => {
          this.error = err.message;
        }).then(() => {
          if (this.error == null) {
            this.pass = true
          } else {
            this.pass = false
          }
        })
      }
      if (this.pass == true) {
        alert("Profile Information updated successfully!  Please sign in again.")
         this.signOut()
      }
      

    },

    updatePassword() {
      this.error=null
      this.pass = false
      if (this.update.password != "" && this.update.cfmpw != "") {
        if (this.update.password != this.update.cfmpw) {
          this.error="New passwords do not match"
        } else if (this.update.password.length < 6) {
          this.error = "Passwords should be at least 6 characters"
        } else {
          firebaseApp.auth().currentUser.updatePassword(this.update.password)
          this.pass = true 
        }
      }    
      if (this.pass == true) {
         alert("Profile Information updated successfully!  Please sign in again.")
         this.signOut()         
      }
    }

  },

  created() {
    this.fetchPoints()
    this.fetchName()
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