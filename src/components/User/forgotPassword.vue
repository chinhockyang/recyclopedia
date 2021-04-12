<template>
  <div class="container">
    <br>
    <h2 id="center">Forgot Password</h2>
    <div class="row p-3 mb-5">
    <div class="col-1 col-md-2 col-l-3"></div>
    <div class="col-10 col-md-8 col-l-6 bg-light rounded p-3">
      <div id="center">
      <form> 
        <div>
          <p style="font-size:15px">To reset your password, please enter the email address registered to your account.</p>
          <input type="email" placeholder="Email" class="form-control" id="email" name="email" required v-model="email"/>   
          <br>    
          <div id="center">
            <p id="error" v-if="error">{{error}}</p>
          </div>
          <div id="center">
          <button @click.prevent="changePassword" class="btn btn-success">Submit</button>
          </div>
        </div>
      </form>
      </div>
      </div>
  </div>
  </div>
</template>

<script>
import { firebaseApp } from '../../firebase.js'

export default {
  data() {
    return {
        email: "", 
        error: null
    };
  },
  methods: {
      changePassword() {
          firebaseApp.auth().sendPasswordResetEmail(this.email).then(() => {})
          .catch(function(error) {
              this.error = error.message
          }).then(()=> {
          if (this.error==null) {
              alert("Password reset email has been sent to your account")
              this.$router.push({path: './login'})
          }
        })
      }
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