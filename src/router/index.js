import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home');
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue');
const DRN = () => import(/* webpackChunkName:"DRN" */ '@/views/DRN/Index');
const Admin = () => import(/* webpackChunkName:"Admin" */ '@/views/Admin/index');
const Be = () => import(/* webpackChunkName:"Be" */ '@/views/Admin/be');
const NotFound = () => import(/* webpackChunkName:"404" */ './404');
const Be_Bookmarks = () => import(/* webpackChunkName:"Be" */ '@/components/Be/Bookmarks/Index');

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
  },
  {
    path: '/admin',
    name:'Admin',
    component: Admin
  },
  {
    path: '/be',
    component: Be,
    children:[
      {
        path: '',
        component: Be_Bookmarks
      },{
        path: 'bookmarks',
        name: 'Be_Bookmarks',
        component: Be_Bookmarks
      },
      {
        path: '*',
        component:NotFound
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component:NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
