import Vue from 'vue'
import Router from 'vue-router'
import LayoutAdmin from '@/layouts/LayoutAdmin'
import HomePage from '@/pages/HomePage'
import LayoutClient from '@/layouts/LayoutClient'
import ProductsList from '@/components/ProductsList'
import Register from '@/pages/Register'
import UserList from '@/components/UserList'
import CategoryList from '@/components/CategoryList'
import Login from '@/pages/Login'
import ProductEdit from '@/pages/ProductEdit'
import CategoryEdit from '@/pages/CategoryEdit'

import HomePage2 from '@/views/pages/HomePage'
import ProductDetail from '@/views/pages/ProductDetail'
import Order from '@/views/pages/Order'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
      component: LayoutAdmin,
      children: [
        {
          path: '',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'product-edit/:id?',
          name: 'ProductEdit',
          component: ProductEdit
        },
        {
          path: 'users',
          name: 'Users',
          component: UserList
        },
        {
          path: 'products',
          name: 'Products',
          component: ProductsList
        },
        {
          path: 'categories',
          name: 'Categories',
          component: CategoryList
        },
        {
          path: 'category-edit/:id?',
          name: 'CategoryEdit',
          component: CategoryEdit
        }
      ]
    },
    {
      path: '/',
      component: LayoutClient,
      children: [
        {
          path: '',
          name: 'HomePage2',
          component: HomePage2
        },
        {
          path: '/product/:id',
          name: 'ProductDetail',
          component: ProductDetail
        },
        {
          path: '/order',
          name: 'OrderPage',
          component: Order
        }
      ]
    }
  ]
})
