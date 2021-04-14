import HomePage from './components/HomePage.vue'
import myMap from './components/map/Map.vue'
import Quiz from './components/Quiz/QuizStart.vue'
import QuizQuestions from './components/Quiz/QuizQuestions.vue'
import QuizAnswers from './components/Quiz/QuizAnswers.vue'

import EncyclopediaHome from './components/encyclopedia/EncyclopediaHome.vue'
import QuickSearch from './components/encyclopedia/QuickSearch.vue'
import CanRecycle from './components/encyclopedia/CanRecycle.vue'
import AddItem from './components/encyclopedia/AddItem.vue'

import Login from './components/User/Login.vue'
import Register from './components/User/Register.vue'
import Dashboard from './components/User/Dashboard.vue'
import addNewRecord from './components/User/addNewRecord.vue'
import Points from './components/User/Points.vue'
import donationForm from './components/User/donationForm.vue'
import Donation from './components/User/Donation.vue'
import Past from './components/User/Past.vue'
import forgotPassword from './components/User/forgotPassword.vue'

export default [
  { path: '/', component: Home },
  { path: '/map/:id?', component: myMap, props: true },
  
  { path: '/encyclopedia', component: EncyclopediaHome, children: [
    { path: '', component: QuickSearch},
    { path: '/encyclopedia/quick-search', component: QuickSearch},    
    { path: '/encyclopedia/can-recycle/:id/:category?', component: CanRecycle, props: true},        
    { path: '/encyclopedia/add', component: AddItem}    
  ]}, 

  { path: '/login', component: Login }, 
  { path: '/register', component: Register }, 
  { path: '/forgotpw', component: forgotPassword },
  { path: '/dashboard', component: Dashboard },
  { path: '/addNewRecord', component: addNewRecord },
  { path: '/points', component: Points},
  { path: '/donationForm', component: donationForm}, 
  { path: '/donation', component: Donation}, 
  { path: '/past', component: Past},
  { path: '/quiz', component: Quiz },
  { path: '/quiz/questions', component: QuizQuestions},
  { path: '/quiz/answers', component: QuizAnswers}

]