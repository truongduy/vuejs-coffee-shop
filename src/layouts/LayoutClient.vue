<template>
  <v-app>
    <v-toolbar color="blue darken-3" clipped-left dark fixed app>
      <router-link to="/">
        <img class="logo" src="@/assets/logo-coffee.png" />
      </router-link>
      <v-toolbar-title>Coffee Shop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">
          Trang chủ
        </v-btn>
        <v-btn flat>
          Giới thiệu
        </v-btn>
        <v-btn flat>
          Shop
        </v-btn>
        <v-btn flat>
          Liên hệ
        </v-btn>
        <v-toolbar-items v-if="!isAuthen">
          <v-btn flat slot="activator" @click.stop="dialog = true">
            <v-list-tile-title>
              Đăng ký
            </v-list-tile-title>
          </v-btn>
          <v-btn flat @click.stop="dialogLogin = true">
            <v-list-tile-title>
              Đăng nhập
            </v-list-tile-title>
          </v-btn>
        </v-toolbar-items>
        <v-menu v-else bottom offset-y>
          <v-btn flat slot="activator">
            <v-list-tile-title>
              <img class="avatar" src="/static/images/avatar-default.png"/>
              {{this.currentUser.username}}
            </v-list-tile-title>
          </v-btn>
          <v-list>
            <v-btn flat @click.prevent="doLogout">
              <v-icon class="mr-2">exit_to_app</v-icon>
              <v-list-tile-title>
                Logout
              </v-list-tile-title>
            </v-btn>
          </v-list>
        </v-menu>
        <v-menu bottom offset-y>
          <v-btn flat slot="activator">
            <v-icon class="mr-2">shopping_cart</v-icon>
            <span class="number-cart">{{order.orderItems.length}}</span>
          </v-btn>
          <v-list two-line>
            <template v-if="order.orderItems.length > 0" v-for="(item, index) in order.orderItems">
              <v-list-tile :key="index">
                <v-list-tile-avatar>
                  <img :src="item.image">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="`${item.price} x ${item.quantity}`"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index < order.orderItems.length -1" :key="`divider-${index}`"></v-divider>
            </template>
            <v-btn class="blue darken-2 white--text" :to="{path: '/order'}">
              <v-icon class="mr-2">shopping_cart</v-icon>
              Giỏ hàng
            </v-btn>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500px"
    >
      <v-card>
        <v-card-title
          class="headline blue darken-3 white--text"
          primary-title
        >Đăng ký</v-card-title>
        <v-card-text>
          <Register :dialog="dialog" @toggleDialog="dialog = !$event" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogLogin"
      persistent
      max-width="500px"
    >
      <v-card>
        <v-card-title
          class="headline blue darken-3 white--text"
          primary-title
        >Đăng nhập</v-card-title>
        <v-card-text>
          <Login :dialogLogin="dialogLogin" @toggleDialog="dialogLogin = !$event" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-content>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-content>
    <v-footer>
      <v-layout align-center justify-center>
        &copy;2018 — &nbsp;<strong>Designed by DuyDang Develop with Vuetify</strong>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import Login from '@/views/components/Login'
import Navigation from '@/components/Navigation'
import Register from '@/views/components/Register'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'LayoutAdmin',
  data: () => ({
    drawer: null,
    dialog: false,
    dialogLogin: false
  }),
  components: {
    Login,
    Register,
    Navigation
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('orders', ['order']),
    isAuthen () {
      return Object.keys(this.currentUser).length
    },
    isRegister () {
      return this.$route.name === 'Register'
    }
  },
  mounted () {
    this.getOrder()
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('orders', ['getOrder']),
    doLogout () {
      this.logout().then(() => { this.$router.push('/') })
    }
  }
}
</script>

<style>
.avatar {
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 50%;
  vertical-align: top;
  margin-right: 5px;
}
.logo {
  max-width: 60px;
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
