<template>
  <div>
    <v-app v-if="!isAuthen" id="inspire">
      <div v-if="isRegister">
        <Register />
      </div>
      <div v-else>
        <Login />
      </div>
    </v-app>
    <v-app v-else>
      <v-navigation-drawer
        v-model="drawer"
        fixed
        app
        clipped
      >
        <Navigation />
      </v-navigation-drawer>
      <v-toolbar color="brown darken-4" clipped-left dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Coffee Shop</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="!isAuthen" class="hidden-sm-and-down">
          <v-btn :to="{path: '/admin/login'}" flat>
            <v-icon class="mr-2">play_for_work</v-icon>
            <v-list-tile-title>
              Sign in
            </v-list-tile-title>
          </v-btn>
          <v-btn :to="{path: '/admin/register'}" flat>
            <v-icon class="mr-2">group_add</v-icon>
            <v-list-tile-title>
              Register
            </v-list-tile-title>
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-else class="hidden-sm-and-down">
          <v-btn flat>
            <v-list-tile-title>
              <img class="avatar" :src="this.currentUser.image"/>
              {{this.currentUser.fullName}}
            </v-list-tile-title>
          </v-btn>
          <v-btn flat @click.prevent="doLogout">
            <v-icon class="mr-2">exit_to_app</v-icon>
            <v-list-tile-title>
              Logout
            </v-list-tile-title>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer app fixed fluid>
        <v-layout align-center justify-center>
          &copy;2018 — <strong>Vuetify</strong>
        </v-layout>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Navigation from '@/components/Navigation'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'LayoutAdmin',
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapGetters('auth', ['currentUser']),
    isAuthen () {
      return Object.keys(this.currentUser).length
    },
    isRegister () {
      return this.$route.name === 'Register'
    }
  },
  components: {
    Login,
    Register,
    Navigation
  },
  methods: {
    ...mapActions('auth', ['logout']),
    doLogout () {
      this.logout().then(() => { this.$router.push('/admin') })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.avatar {
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 50%;
  vertical-align: top;
  margin-right: 5px;
}
</style>
