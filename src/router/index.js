import Vue from 'vue'
import Router from 'vue-router'
import search from '@/components/search'
import singerList from '@/components/singerList'
import personal from '@/components/personal'
Vue.use(Router)

export default new Router({
  routes: [
    {
      //默认为搜索页
      path: '/',
      component: search
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/singerList',
      component: singerList
    },
    {
      path: '/personal',
      component: personal
    }

  ]
})
