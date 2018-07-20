<template>
  <v-card>
    <v-card-title>
      Products
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="products"
      class="elevation-1 table-list"
    >
      <template slot="items" slot-scope="props">
        <td><img class="avatar" :src="props.item.image"/></td>
        <td>{{props.item.name}}</td>
        <td>{{props.item.price}}</td>
        <td>{{props.item.category.name}}</td>
        <!-- <td>{{props.item.quantity || 0}}</td> -->
        <td>
          <v-btn flat icon :to="{name: 'ProductEdit', params: {id: props.item._id}}">
            <v-icon color="info">edit</v-icon>
          </v-btn>
          <v-btn flat icon @click.prevent="deleteProduct(props.item._id)">
            <v-icon color="error">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="footer">
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProductsList',
  computed: {
    ...mapState('products', ['products'])
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.slug === undefined) {
      return next((vm) => vm.resetProduct())
    }
    return next()
  },
  mounted () {
    this.getProducts()
  },
  data () {
    return {
      headers: [
        { text: 'Image', value: 'image', align: 'center' },
        { text: 'Name', value: 'name', align: 'center' },
        { text: 'Price', value: 'price', align: 'center' },
        { text: 'Category', value: 'category', align: 'center' },
        // { text: 'Quantity', value: 'quantity', align: 'center' },
        { text: 'Action', value: 'action', align: 'center' }
      ],
      search: null
    }
  },
  methods: {
    ...mapActions('products', ['getProducts', 'resetProduct', 'delete']),
    deleteProduct (id) {
      this.delete(id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar {
    width: 60px;
    height: 60px;
    padding: 5px;
    border-radius: 50%;
  }
</style>
