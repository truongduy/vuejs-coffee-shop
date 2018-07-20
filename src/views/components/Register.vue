<template>
  <v-form v-on:submit.prevent="submitRegister(user)" enctype="multipart/form-data">
    <v-text-field
      :rules="nameRules"
      v-model="user.username"
      label="User Name"
      required
    ></v-text-field>
    <v-text-field
      :rules="passwordRules"
      v-model="user.password"
      :append-icon="showPass ? 'visibility' : 'visibility_off'"
      :append-icon-cb="() => (showPass = !showPass)"
      :type="showPass ? 'password' : 'text'"
      label="Password"
      hint="At least 8 characters"
      min="8"
      counter
    ></v-text-field>
    <v-text-field
      :rules="emailRules"
      v-model="user.email"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="user.phone"
      label="Phone"
    ></v-text-field>
    <v-btn color="info" type="submit" @click.stop="toggleDialog">Đăng ký</v-btn>
    <v-btn color="red" dark @click.stop="toggleDialog">Đóng</v-btn>
  </v-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'HomePage',
  computed: {
    ...mapState('auth', ['user'])
  },
  props: ['dialog'],
  data: () => ({
    showPass: false,
    nameRules: [
      v => !!v || 'User name is required',
      v => v.length <= 20 || 'Name must be less than 20 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password least 8 characters, at least one letter and one number',
      v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) || 'Password must be valid'
    ]
  }),
  methods: {
    ...mapActions('auth', ['register']),
    submitRegister (dataUser) {
      const formData = new FormData()
      formData.append('user', JSON.stringify(dataUser))
      this.register(formData).then(() => this.$router.push('/'))
      this.clear()
    },
    clear () {
      Object.keys(this.user).forEach((key, index) => {
        this.user[key] = ''
      })
    },
    toggleDialog (newData) {
      this.$emit('toggleDialog', newData)
    }
  }
}
</script>
