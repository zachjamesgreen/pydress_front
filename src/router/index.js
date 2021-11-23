import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/contact/:id?',
    name: 'Show',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Show.vue')
  },
  {
    path: '/create',
    name: 'CreateContact',
    component: () => import(/* webpackChunkName: "CreateContact" */ '../views/CreateContact.vue')
  },
  {
    path: '/edit/:id',
    name: 'EditContact',
    component: () => import(/* webpackChunkName: "EditContact" */ '../views/EditContact.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
