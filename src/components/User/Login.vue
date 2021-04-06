<template>
  <div class="container">
    <h3>Login</h3>
      <form> 
        <div>
          <label for="email">Email</label>
            <br><input type="email" id="email" name="email" required v-model="form.email"/>       
        </div>
        <br>
        <div>
          <label for="password">Password</label>
            <br><input type="password" id="password" name="password" required v-model="form.password"/>       
        </div>
        <div>   
          <p v-if="error">{{error}}</p>
          <br>
          <button @click.prevent="submit">Login</button>
        </div>
        <p>No account yet? <router-link to="/register">Register here!</router-link></p>
      </form>
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