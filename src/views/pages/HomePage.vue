<template>
  <v-layout row wrap>
    <Banner />
    <ProductsHome />
  </v-layout>
</template>

<script>
import Banner from '@/views/components/Banner'
import ProductsHome from '@/views/components/ProductsHome'
export default {
  name: 'HomePage',
  components: {
    Banner,
    ProductsHome
  }
}
</script>
