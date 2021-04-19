<template>
  <div class="container">
    <br>
    <h2 id="center">Register</h2>
    <div class="row p-3 mb-5">
    <div class="col-1 col-md-2 col-l-3"></div>
    <div class="col-10 col-md-8 col-l-6 bg-light rounded p-3">
      <div id="center">
      <form> 
        <div>
          <label for="username">Username:<span style="color:red;" title="required"> *</span></label>
            <br><input type="text" class="form-control" id="username" name="username" required v-model="form.username"/>
        </div>
        <br>
        <div>
          <label for="email">Email:<span style="color:red;" title="required"> *</span></label>
            <br><input type="email" class="form-control" id="email" name="email" required v-model="form.email"/>       
        </div>
        <br>
        <div>
          <label for="password">Password:<span style="color:red;" title="required"> *</span></label>
            <br><input type="password" class="form-control" id="password" name="password" required v-model="form.password"/>       
        </div>
        <br>
        <div>
          <label for="cfmpassword">Confirm Password:<span style="color:red;" title="required"> *</span></label>
            <br><input type="password" class="form-control" id="cfmpassword" name="cfmpassword" required v-model="form.cfmpassword"/>       
        </div>
        <div>   
          <div id="center">
          <p id="error" v-if="error">{{error}}</p>
          </div>
          <br>
          <div id="center">
              <button @click.prevent="submit" class="btn btn-success">Register</button>
          </div>
          <br>
        </div>
        <div id="center">
        <p>Already have an account? <router-link to="/login">Login here!</router-link></p>
        </div>
      </form>
      </div>
    </div>
    </div>
  </div>
</template>


<script>
import { firebaseApp } from '../../firebase.js'
import database from '../../firebase.js'

export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        cfmpassword:""
      },
      error: null
    };
  },
  methods: {
    submit() {
      this.error=null
      if (this.form.username == "" || this.form.email=="" || this.form.password=="" || this.form.cfmpassword=="") {
        this.error = "Please fill in all fields."
      } else if (this.form.password != this.form.cfmpassword) {
        this.error="Passwords do not match"
      } else {
      firebaseApp.auth().createUserWithEmailAndPassword(this.form.email, this.form.password).then(data => {
          data.user
            .updateProfile({
              displayName: this.form.username
            })
            .then(() => {});
        })
        .catch(err => {
          this.error = err.message;
        })
        .then(()=> {
          if (this.error==null) {
            alert("Your account has been successfully created!")
            firebaseApp.auth().signOut()
            firebaseApp.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
            database.collection('tier').doc(this.form.username).set({level: "Welcome Greener", name: this.form.username})
            firebaseApp.auth().currentUser.sendEmailVerification()
            this.$router.push({path: './dashboard'})
          }
        });
      }       
    },  
  }
};
</script>

<style> 
#center { 
    display: flex;
    justify-content: center;
    align-items:center
}

#error {
    color: red
}
</style>