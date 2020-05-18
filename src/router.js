import Vue from 'vue'
import Router from 'vue-router'
import Activity from './views/activity'
import list from "./views/list";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Activities',
      component: Activity
    },
    {
      path: '/list',
      name: 'My list',
      component: list
    }
  ]
})
