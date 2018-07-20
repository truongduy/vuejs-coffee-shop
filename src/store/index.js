import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import products from './modules/products'
import categories from './modules/categories'
import orders from './modules/orders'

Vue.use(Vuex)

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {

}

const modules = {
  auth,
  products,
  categories,
  orders
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
