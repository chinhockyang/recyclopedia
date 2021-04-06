import Home from './components/Home.vue'
import Quiz from './components/Quiz.vue'
import myMap from './components/map/Map.vue'

import EncyclopediaHome from './components/encyclopedia/EncyclopediaHome.vue'
import QuickSearch from './components/encyclopedia/QuickSearch.vue'
import BrowseCategory from './components/encyclopedia/BrowseCategory.vue'
import CanRecycle from './components/encyclopedia/CanRecycle.vue'
import CategoryInfoPage from './components/encyclopedia/CategoryInfoPage.vue'
import AddItem from './components/encyclopedia/AddItem.vue'

import Login from './components/User/Login.vue'
import Register from './components/User/Register.vue'
import Dashboard from './components/User/Dashboard.vue'
import addNewRecord from './components/User/addNewRecord.vue'
import Points from './components/User/Points.vue'
import Donation from './components/User/Donation.vue'
import Past from './components/User/Past.vue'

export default [
  { path: '/', component: Home },
  { path: '/map', component: myMap },
  
  { path: '/encyclopedia', component: EncyclopediaHome, children: [
    { path: '', component: QuickSearch},
    { path: '/encyclopedia/quick-search', component: QuickSearch},
    { path: '/encyclopedia/browse/', component: BrowseCategory, children: [        
        { path: '/encyclopedia/browse/category-info/:id', component: CategoryInfoPage, props: true}
    ]},
    { path: '/encyclopedia/can-recycle/:id', component: CanRecycle, props: true},        
    { path: '/encyclopedia/add', component: AddItem}
  ]}, 

  { path: '/login', component: Login }, 
  { path: '/register', component: Register }, 
  { path: '/dashboard', component: Dashboard },
  { path: '/addNewRecord', component: addNewRecord },
  { path: '/points', component: Points},
  { path: '/donation', component: Donation}, 
  { path: '/past', component: Past},
  { path: '/quiz', component: Quiz }

]