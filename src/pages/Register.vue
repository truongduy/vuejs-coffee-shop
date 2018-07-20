<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue">
                <v-toolbar-title>Register Form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn :to="{path: '/admin/login'}" color="red accent-3" type="submit">Login</v-btn>
              </v-toolbar>
              <v-card-text>
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
                  <v-text-field
                    v-model="user.fullName"
                    label="Full Name"
                  ></v-text-field>
                  <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    v-model="menu"
                    :nudge-right="40"
                    :return-value.sync="user.dateOfBirth"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="user.dateOfBirth"
                      label="Date of Birth"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="user.dateOfBirth" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(user.dateOfBirth)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-radio-group v-model="user.gender" row>
                    <v-radio label="Nam" value="0" ></v-radio>
                    <v-radio label="Nữ" value="1"></v-radio>
                  </v-radio-group>
                  <img :src="imageUrl" height="150" v-if="imageUrl"/>
                  <v-text-field
                    label="Select Image"
                    @click="pickFile"
                    v-model="user.image"
                    prepend-icon='attach_file'
                  ></v-text-field>
                  <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                  >
                  <v-btn color="info" type="submit">submit</v-btn>
                  <v-btn color="error" @click="clear">clear</v-btn>
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
import { mapActions, mapState } from 'vuex'
export default {
  name: 'HomePage',
  computed: {
    ...mapState('auth', ['user'])
  },
  data: () => ({
    showPass: false,
    menu: false,
    file: '',
    imageUrl: '',
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
      this.file = this.$refs.image.files[0]
      formData.append('file', this.file)
      formData.append('user', JSON.stringify(dataUser))
      this.register(formData).then(() => this.$router.push('/admin/list/users'))
      this.clear()
    },
    clear () {
      Object.keys(this.user).forEach((key, index) => {
        this.user[key] = ''
      })
    },
    pickFile () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.user.image = files[0].name
        if (this.user.image.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
        })
      } else {
        this.user.image = ''
        this.imageUrl = ''
      }
    }
  }
}
</script>

<style lang="css" scoped>
input[type=file] {
  opacity: 0 !important;
}
</style>
