import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueRouter);

const myRouter = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router: myRouter
}).$mount('#app')
