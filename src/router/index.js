import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home');
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue');
const DRN = () => import(/* webpackChunkName:"DRN" */ '@/views/DRN/Index');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children:[
      {
        path: '',
        name: 'DRN',
        component: DRN
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
