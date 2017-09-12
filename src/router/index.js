import Vue from 'vue'
import VueRouter from 'vue-router'

import strategy from './DateTitleStrategy'
import ListView from '../views/List.vue'
import PostView from '../views/Post.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: ListView
  },
  {
    path: '/post/(.*)',
    name: 'post',
    component: PostView
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})

export { strategy }
