import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {Auth} from '@/services'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: '/myprofile',
    name: 'myprofile',
    component: () => import(/* webpackChunkName: "myprofile" */ '../views/myProfile.vue')
  },
  {
    path: '/competitors',
    name: 'competitors',
    component: () => import(/* webpackChunkName: "competitors" */ '../views/Competitors.vue')
  },
  {
    path: '/tournaments',
    name: 'tournaments',
    component: () => import(/* webpackChunkName: "tournaments" */ '../views/Tournaments.vue')
  },
  {
    path: '/brackets/:id',
    name: 'brackets',
    component: () => import(/* webpackChunkName: "brackets" */ '../views/Brackets.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  const javneStranice = ["/login", "/signup"]
  const loginPotreban = !javneStranice.includes(to.path)
  const user = Auth.getUser()
  if(loginPotreban && !user){
    next('/login')
    return
  }
  if(user && !loginPotreban){
    next('/')
    return
  }
  next()


})

export default router
