<template>
  <section class="store-product">
    <Breadcrumb />
    <v-container grid-list-xl>
      <v-layout class="pt-5" wrap>
        <v-flex md12>
          <v-card class="mb-5">
            <v-data-table
              :headers="headers"
              :items="order.orderItems"
              hide-actions
              class="table-list table-product"
            >
              <template slot="items" slot-scope="props">
                <td><img class="thumb" :src="props.item.image"/></td>
                <td>
                  <router-link :to="{path: `/product/${props.item.product}`}"><div class="blue--text subheading">{{props.item.name}}</div></router-link>
                  <a href="#" class="caption" @click.prevent="deleteItem(props.item)">Delete</a>
                </td>
                <td>{{props.item.price | currency}} vnđ</td>
                <td>
                  <v-text-field
                    type="number"
                    min="1"
                    v-model="props.item.quantity"
                    @click.prevent="updateOrder(props.item)"
                    v-on:keyup="updateOrder(props.item)"
                  ></v-text-field>
                </td>
              </template>
              <template slot="footer">
                <td colspan="100%" class="py-3">
                  <v-layout align-center>
                    <v-spacer></v-spacer>
                    <span class="subheading mr-5">CART SUBTOTAL:</span>
                    <span class="grey--text title">{{order.totalPrice | currency}} vnđ</span>
                  </v-layout>
                </td>
              </template>
            </v-data-table>
          </v-card>
          <div class="text-xs-right">
            <div class="caption grey--text">Bạn sẽ được chuyển đến trang hoàn tất giao dịch của mình</div>
            <v-btn to="/" depressed outline large class="v-btn--router grey--text text--darken-1">Tiếp tục mua hàng</v-btn>
            <v-btn :disabled="order.orderItems.length <= 0" @click.prevent="save" large class="v-btn--router mx-0 blue darken-3 white--text">
              Thanh toán
              <v-icon class="ml-2">arrow_forward</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import Breadcrumb from '@/views/components/Breadcrumb'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'OrderPage',
  data () {
    return {
      headers: [
        { text: 'Image', value: 'image', align: 'center' },
        { text: 'Name', value: 'name', align: 'center' },
        { text: 'Price', value: 'price', align: 'center' },
        { text: 'Quantity', value: 'quantity', align: 'center', width: '50px' }
      ],
      search: null
    }
  },
  components: {
    Breadcrumb
  },
  computed: {
    ...mapGetters('orders', ['order'])
  },
  mounted () {
    this.getOrder()
  },
  methods: {
    ...mapActions('orders', ['getOrder', 'updateQuantity', 'saveOrder', 'deleteItemOrder']),
    updateOrder (item) {
      this.updateQuantity(item)
    },
    save () {
      this.saveOrder(this.order).then(() => {
        this.$router.push('/')
      })
    },
    deleteItem (item) {
      this.deleteItemOrder(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-product {
  table.table tbody td {
    font-size: 18px;
  }
  .thumb {
    width: 70px;
    height: 70px;
    padding: 5px;
    border-radius: 100%;
  }
  a {
    text-decoration: none;
  }
}
</style>
