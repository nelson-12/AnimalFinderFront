import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Home from '@/components/Home'
import AnimalEncontrei from '@/components/Show'
import AnimalAdd from '@/components/Animal/Add'
import AnimalIndex from '@/components/Animal/List'
import AnimalShow from '@/components/Animal/Show'
import AnimalEdit from '@/components/Animal/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/animal/index',
      name: 'AnimalIndex',
      component: AnimalIndex
    },
    {
      path: '/animal/show/:id',
      name: 'AnimalShow',
      component: AnimalShow
    },
    {
      path: '/animal/add',
      name: 'Add',
      component: AnimalAdd
    },
    {
      path: '/animal/edit/:id',
      name: 'AnimalEdit',
      component: AnimalEdit
    },
    {
      path: '/animal/encontrei/:id',
      name:  'AnimalEncontrei',
      component: AnimalEncontrei
    }
  ]
})
