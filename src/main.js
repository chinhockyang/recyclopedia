import Vue from 'vue'
import App from './App.vue'
import { firebaseApp } from './firebase.js'
import Routes from './routes.js'
import VueRouter from 'vue-router'
import store from './store.js'

Vue.config.productionTip = false

Vue.use(VueRouter);

const myRouter = new VueRouter({
  routes: Routes,
  mode: 'history'
});

firebaseApp.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  render: h => h(App),
  router: myRouter, 
  store
}).$mount('#app')
