<template>
  <div class="container">
    <br>
    <h1 id="center">Login</h1>
    <div class="row p-3 mb-5">
    <div class="col-1 col-md-2 col-l-3"></div>
    <div class="col-10 col-md-8 col-l-6 bg-light rounded p-3">
      <div id="center">
      <form> 
        <div>
          <label for="email">Email</label>
            <br><input type="email" class="form-control" id="email" name="email" required v-model="form.email"/>       
        </div>
        <br>
        <div>
          <label for="password">Password</label>
            <br><input type="password" class="form-control" id="password" name="password" required v-model="form.password"/>       
        </div>
        <div>   
          <div id="center">
          <p id="error" v-if="error">{{error}}</p>
          </div>
          <br>
          <div id="center">
          <button @click.prevent="submit" class="btn btn-success">Login</button>
          </div>
        </div>
        <br>
        <div id="center">
        <p>No account yet? <router-link to="/register">Register here!</router-link></p>
        </div>
        <div id="center">
          <router-link to="/forgotpw">Forgot Password</router-link>
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
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebaseApp.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.push({ path: './dashboard' });
        })
        .catch(err => {
          this.error = err.message;
        });
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