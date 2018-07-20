
import { ApiService } from '@/utils/common'

export default {
  namespaced: true,
  state: {
    users: [],
    user: {
      username: '',
      fullName: '',
      email: '',
      password: '',
      phone: '',
      dateOfBirth: '',
      gender: false,
      image: ''
    },
    error: null,
    currentUser: {}
  },

  getters: {
    currentUser (state) {
      if (ApiService.getToken('user')) {
        state.currentUser = JSON.parse(ApiService.getToken('user'))
      }
      return state.currentUser
    },

    listUser (state) {
      return state.users
    }
  },

  mutations: {
    setUser (state, user) {
      state.currentUser = user
    },
    setError (state, error) {
      state.error = error
    },
    setUsers (state, users) {
      state.users = users
    }
  },

  actions: {
    register (context, dataUser) {
      return ApiService.post('users', dataUser).then(({data}) => {
        context.commit('setUser', data)
        ApiService.saveToken('user', JSON.stringify(data))
      }).catch(({ response }) => {
        context.commit('setError', response.data.errors)
      })
    },
    login (context, user) {
      return ApiService.post('users/login', {user: user})
        .then(({ data }) => {
          context.commit('setUser', data.user)
          ApiService.saveToken('user', JSON.stringify(data.user))
        })
        .catch(({ response }) => {
          context.commit('setError', response.data.errors)
        })
    },
    getUsers (context) {
      return ApiService.query('users', '')
        .then(({ data }) => {
          context.commit('setUsers', data)
        })
    },
    setUser ({ commit }) {
      const user = JSON.parse(ApiService.getToken('user'))
      commit('setUser', user)
    },
    logout ({ commit }) {
      ApiService.destroyToken('user')
      commit('setUser', {})
    }
  }
}
