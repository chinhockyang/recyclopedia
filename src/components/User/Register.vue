<template>
  <div class="container">
    <h3>Register</h3>
      <form> 
        <div>
          <label for="username">Username</label>
            <br><input type="text" id="username" name="username" required v-model="form.username"/>
        </div>
        <br>
        <div>
          <label for="email">Email</label>
            <br><input type="email" id="email" name="email" required v-model="form.email"/>       
        </div>
        <br>
        <div>
          <label for="password">Password</label>
            <br><input type="password" id="password" name="password" required v-model="form.password"/>       
        </div>
        <br>
        <div>
          <label for="cfmpassword">Confirm Password</label>
            <br><input type="password" id="cfmpassword" name="cfmpassword" required v-model="form.cfmpassword"/>       
        </div>
        <br>
        <div>   

          <p v-if="error">{{error}}</p>
          <br>
              <button @click.prevent="submit">Register</button>
        </div>
        <p>Already have an account? <router-link to="/login">Login here!</router-link></p>
      </form>
  </div>
</template>


<script>
import { firebaseApp } from '../../firebase.js'

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
            this.$router.push({path: './dashboard'})
          }
        });
      }       
    },  
  }
};
</script>