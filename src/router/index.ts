import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
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
    path: '/js/form-validator',
    name: 'js-form-validator',
    component: () => import('@/views/js/form-validator.vue')
  },
  {
    path:'/template/setup-script-template',
    name:'template-setup-script-template',
    component: ()=> import('@/views/template/setup-script-template.vue')
  },
{
    path:'/template/setup-template',
    name:'template-setup-template',
    component: ()=> import('@/views/template/setup-template.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
