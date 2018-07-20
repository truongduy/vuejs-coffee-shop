<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-on:submit.prevent="submitLogin(user)">
                  <v-text-field
                    prepend-icon="person"
                    label="User name"
                    v-model="user.username"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="user.password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn :to="{path: '/admin/register'}" color="red" class="white--text">Register</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="blue" class="white--text" type="submit">Login</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    submitLogin (user) {
      this.login(user).then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>
