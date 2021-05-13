import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/glTransition'
  },
  {
    path: '/node',
    name: 'Node',
    component: () => import(/* webpackChunkName: "about" */ '../views/Node.vue')
  },
  {
    path: '/subtitle',
    name: 'Subtitle',
    component: () => import(/* webpackChunkName: "about" */ '../views/Subtitle.vue')
  },
  {
    path: '/ae',
    name: 'ae',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ae.vue')
  },
  {
    path: '/three',
    name: 'three',
    component: () => import(/* webpackChunkName: "about" */ '../views/Three.vue')
  },
  {
    path: '/overlay',
    name: 'overlay',
    component: () => import(/* webpackChunkName: "about" */ '../views/Overlay.vue')
  },
  {
    path: '/channel',
    name: 'channel',
    component: () => import(/* webpackChunkName: "about" */ '../views/Channel.vue')
  },
  {
    path: '/matting',
    name: 'matting',
    component: () => import(/* webpackChunkName: "about" */ '../views/Matting.vue')
  },
  {
    path: '/pendant',
    name: 'pendant',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pendant.vue')
  },
  {
    path: '/filter',
    name: 'filter',
    component: () => import(/* webpackChunkName: "about" */ '../views/Filter.vue')
  },
  {
    path: '/transition',
    name: 'transition',
    component: () => import(/* webpackChunkName: "about" */ '../views/Transition.vue')
  },
  {
    path: '/fault',
    name: 'fault',
    component: () => import(/* webpackChunkName: "about" */ '../views/Fault.vue')
  },
  {
    path: '/glTransition',
    name: 'glTransition',
    component: () => import(/* webpackChunkName: "about" */ '../views/GlTransition.vue')
  },
  {
    path: '/Webgl',
    name: 'Webgl',
    component: () => import(/* webpackChunkName: "about" */ '../views/WebGL.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
