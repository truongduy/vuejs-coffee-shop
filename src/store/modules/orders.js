import { ApiService } from '@/utils/common'

export default {
  namespaced: true,

  state: {
    order: {
      user: '',
      orderItems: [],
      totalPrice: 0
    }
  },

  getters: {
    order (state) {
      return state.order
    }
  },

  mutations: {
    setOrder (state, order) {
      state.order = order
    }
  },

  actions: {
    getOrder (context) {
      const order = JSON.parse(ApiService.getToken('order'))
      if (order) {
        context.commit('setOrder', order)
      }
    },
    setOrderItems ({commit, state}, item) {
      let cloneOrder = JSON.parse(JSON.stringify(state.order))
      let cloneOrderItem = cloneOrder.orderItems
      let matchedOrder = cloneOrderItem.filter(({ product }) => product === item._id)[0]
      if (matchedOrder) {
        matchedOrder.quantity++
      } else {
        let orderItem = {
          product: item._id,
          image: item.image,
          price: item.price,
          name: item.name,
          quantity: 1
        }

        cloneOrderItem.push(orderItem)
      }
      cloneOrder.totalPrice += parseInt(item.price)
      commit('setOrder', cloneOrder)
      ApiService.saveToken('order', JSON.stringify(cloneOrder))
    },
    updateQuantity ({commit, state}, itemProduct) {
      const order = JSON.parse(ApiService.getToken('order'))
      let cloneOrder = JSON.parse(JSON.stringify(order))
      let cloneOrderItem = cloneOrder.orderItems
      let matchedOrder = cloneOrderItem.filter(({ product }) => product === itemProduct.product)[0]
      if (matchedOrder) {
        if (matchedOrder.quantity > itemProduct.quantity) {
          const number = matchedOrder.quantity - itemProduct.quantity
          cloneOrder.totalPrice -= parseInt(itemProduct.price) * number
        } else {
          const number = itemProduct.quantity - matchedOrder.quantity
          cloneOrder.totalPrice += parseInt(itemProduct.price) * number
        }
        matchedOrder.quantity = itemProduct.quantity
      }
      commit('setOrder', cloneOrder)
      ApiService.saveToken('order', JSON.stringify(cloneOrder))
    },
    saveOrder (context, order) {
      return ApiService.post('orders', {order: order}).then(({data}) => {
        const order = { user: '', orderItems: [], totalPrice: 0 }
        context.commit('setOrder', order)
        ApiService.destroyToken('order')
      }).catch(({ response }) => {
        context.commit('setError', response.data.errors)
      })
    },
    deleteItemOrder (context, itemProduct) {
      const order = JSON.parse(ApiService.getToken('order'))
      let cloneOrder = JSON.parse(JSON.stringify(order))
      cloneOrder.orderItems = cloneOrder.orderItems.filter(({ product }) => product !== itemProduct.product)
      cloneOrder.totalPrice -= itemProduct.quantity * itemProduct.price
      console.log(cloneOrder)
      context.commit('setOrder', cloneOrder)
      ApiService.saveToken('order', JSON.stringify(cloneOrder))
    }
  }
}
