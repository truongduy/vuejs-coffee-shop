<template>
  <section class="store-product">
    <Breadcrumb />
    <v-container grid-list-xl>
      <v-layout class="pt-5" wrap>
        <v-flex md6 mx-auto class="carousel-left">
          <Carousel :items="sliders" />
        </v-flex>
        <v-flex md6 class="text-xs-left">
          <h1 class="display-1 mb-3 font-weight-bold">{{product.name}}</h1>
          <div class="mb-3">
            <span class="display-1 red--text text--lighten-2">{{product.price | currency}} vnđ</span>
          </div>
          <div class="mb-3">{{product.description}}</div>
          <v-layout>
            <v-flex md6>
              <v-text-field
                v-model="quantity"
                label="Quantity"
                type="number"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-btn color="success" large block>
            <v-icon class="mr-2">shopping_cart</v-icon>
            Add to cart
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import Carousel from '@/views/components/Carousel'
import Breadcrumb from '@/views/components/Breadcrumb'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ProductDetail',
  components: {
    Carousel,
    Breadcrumb
  },
  data () {
    return {
      sliders: [
        { src: 'http://10.0.4.36:3000/images/upload/shirt.jpg' }
      ],
      quantity: 1
    }
  },
  computed: {
    ...mapState('products', ['product'])
  },
  mounted () {
    this.detailProduct(this.$route.params.id).then((data) => {
      this.sliders.unshift({ src: data.image })
    })
  },
  methods: {
    ...mapActions('products', ['detailProduct'])
  }
}
</script>

<style lang="scss">
.store-product {
  .jumbotron__image {
    max-width: 90%;
  }
  .carousel-left {
    max-width: 500px;
  }
}
</style>
