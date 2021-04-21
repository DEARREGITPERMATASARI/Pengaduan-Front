import Vue from 'vue'
import store from '../store/index.js'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Pengisian from '../views/Pengisian.vue'
import Pengaduan from '../views/Pengaduan.vue'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/',
    name: 'Home',
    components: {default: Home,  header: Navbar, footer: Footer},
  },
  {
    path: '/pengisian',
    name: 'Pengisian',
    components: {default: Pengisian,  header: Navbar, footer: Footer},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/pengaduan',
    name: 'pengaduan',
    components: {default: Pengaduan,  header: Navbar, footer: Footer},
    meta: {
      requiresAuth: true
    }
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})  

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next() 
  }
})

export default router