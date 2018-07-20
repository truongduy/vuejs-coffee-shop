<template>
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
      <v-spacer></v-spacer>
      <v-btn color="blue" class="white--text" type="submit" @click.stop="toggleDialog">Login</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginUser',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  props: ['dialogLogin'],
  methods: {
    ...mapActions('auth', ['login']),
    submitLogin (user) {
      this.login(user).then(() => {
        this.$router.push('/')
      })
    },
    toggleDialog (newData) {
      this.$emit('toggleDialog', newData)
    }
  }
}
</script>
