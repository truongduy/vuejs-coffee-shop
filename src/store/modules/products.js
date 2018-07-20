import { ApiService } from '@/utils/common'

export default {
  namespaced: true,
  state: {
    product: {
      name: '',
      image: '',
      price: '',
      category: '',
      description: ''
    },
    error: null,
    products: []
  },

  getters: {
    product (state) {
      return state.product
    }
  },

  mutations: {
    setError (state, error) {
      state.error = error
    },
    setProduct (state, product) {
      state.product = product
    },
    setProducts (state, products) {
      state.products = products
    },
    resetProduct (state) {
      state.product = {
        name: '',
        image: '',
        price: '',
        category: '',
        description: ''
      }
    }
  },

  actions: {
    addProduct (context, product) {
      return ApiService.post('products', product).then(({ data }) => {
        context.commit('setProduct', data)
      }).catch(({ response }) => {
        context.commit('setError', response.data.errors)
      })
    },
    delete (context, id) {
      return ApiService.delete(`products/${id}`).then(({ data }) => {
        context.dispatch('getProducts')
      })
    },
    updateProduct (context, { id, product }) {
      return ApiService.update(`products/${id}`, product).then(({ data }) => {
        context.commit('setProduct', data)
      }).catch(({ response }) => {
        context.commit('setError', response.data.errors)
      })
    },
    detailProduct (context, params) {
      return ApiService.get('products', params).then(({ data }) => {
        context.commit('setProduct', data)
        return data
      }).catch(({ response }) => {
        context.commit('setError', response.data.errors)
      })
    },
    getProducts (context) {
      return ApiService.get('products', '').then(({ data }) => {
        context.commit('setProducts', data)
      }).catch(({ response }) => {
        context.commit('setError', response.data.errors)
      })
    },
    resetProduct (context) {
      context.commit('resetProduct')
    }
  }
}
