import { ApiService } from '@/utils/common'

export default {
  namespaced: true,
  state: {
    category: {
      name: '',
      image: '',
      // productCount: '',
      description: ''
    },
    error: null,
    categories: []
  },

  getters: {
    category (state) {
      return state.category
    }
  },

  mutations: {
    setError (state, error) {
      state.error = error
    },
    setCategory (state, category) {
      state.category = category
    },
    setCategories (state, categories) {
      state.categories = categories
    },
    resetCategory (state) {
      state.category = {
        name: '',
        image: '',
        description: ''
      }
    }
  },

  actions: {
    addCategory (context, category) {
      return ApiService.post('category', category).then(({ data }) => {
        context.commit('setCategory', data)
      }).catch(({ response }) => {
        context.commit('setError', response.data.errors)
      })
    },
    delete (context, id) {
      return ApiService.delete(`category/${id}`).then(({ data }) => {
        context.dispatch('getCategories')
      })
    },
    updateCategory (context, { id, category }) {
      return ApiService.update(`category/${id}`, category).then(({ data }) => {
        context.commit('setCategory', data)
      }).catch(({ response }) => {
        context.commit('setError', response.data.errors)
      })
    },
    detailCategory (context, params) {
      return ApiService.get('category', params).then(({ data }) => {
        context.commit('setCategory', data)
      }).catch(({ response }) => {
        context.commit('setError', response.data.errors)
      })
    },
    getCategories (context) {
      return ApiService.query('category', '').then(({ data }) => {
        context.commit('setCategories', data)
      }).catch(({ response }) => {
        context.commit('setError', response.data.errors)
      })
    },
    resetCategory (context) {
      context.commit('resetCategory')
    }
  }
}
