<template>
  <v-flex xs12>
    <v-layout row wrap>
      <v-flex xs12>
        <v-tabs
          fixed-tabs
          slot="extension"
          v-model="currentItem"
          color="transparent"
        >
          <v-tab
            v-for="(item, index) in categories"
            :key="index"
            :href="`#category-${index}`"
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </v-flex>
    </v-layout>
    <v-container grid-list-xl>
      <v-layout>
        <v-flex xs12>
          <v-tabs-items v-model="currentItem">
            <v-tab-item
              v-for="(item, index) in categories"
              :id="`category-${index}`"
              :key="index"
              class="text-xs-left"
            >
              <v-layout row wrap align-center>
                <v-flex
                  v-for="(itemPro, index) in products"
                  :key="index"
                  v-if="itemPro.category.name === item.name"
                  xs3
                  class="mb-2"
                >
                  <v-card hover>
                    <v-card-media
                      :src="itemPro.image"
                      height="200px"
                    ></v-card-media>
                    <v-card-title>
                      <div>
                        <h3 class="headline">{{itemPro.name}}</h3>
                        <div class="grey--text">{{itemPro.description}}</div>
                        <span class="price d-block pt-2 title text--lighten-2 red--text">
                          {{itemPro.price | currency}} vnđ
                        </span>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn color="success" block @click.prevent="addToCart(itemPro)">
                        <v-icon class="mr-2">shopping_cart</v-icon>
                        Add to cart
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'ProductsHome',
  data () {
    return {
      currentItem: `category-0`
    }
  },
  computed: {
    ...mapState('categories', ['categories']),
    ...mapState('products', ['products']),
    ...mapGetters('orders', ['order']),
    ...mapGetters('auth', ['currentUser'])
  },
  mounted () {
    this.getCategories()
    this.getProducts()
    if (this.currentUser) {
      this.order.user = this.currentUser._id
    }
  },
  methods: {
    ...mapActions('categories', ['getCategories']),
    ...mapActions('products', ['getProducts']),
    ...mapActions('orders', ['setOrderItems']),
    addToCart (item) {
      this.setOrderItems(item)
    }
  }
}
</script>
