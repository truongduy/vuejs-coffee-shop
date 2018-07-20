<template>
  <v-flex xs12 class="banner">
    <v-parallax
      dark
      src="/static/images/banner.jpg"
    >
      <v-layout
        align-center
        column
        justify-center
      >
        <img class="logo" src="/static/images/logo-coffee.png" />
        <span class="slogan">Coffee makes everything possible</span>
      </v-layout>
    </v-parallax>
  </v-flex>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style lang="scss" scoped>
.banner {
  .logo {
    max-width: 150px;
    margin-bottom: 10px;
  }
  .slogan {
    display: block;
    max-width: 500px;
    color: white;
    font-weight: bold;
    font-size: 40px;
    text-transform: uppercase;
    text-shadow: 2px 2px 6px #222;
  }
}
</style>
