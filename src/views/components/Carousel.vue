<template>
  <v-carousel light>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      tag="a"
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'Carousel',
  props: ['items']
}
</script>
