<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue">
            <v-toolbar-title>
              {{
                this.$route.params.id ?
                  'Edit Category' :
                  'Add Category'
              }}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-on:submit.prevent="submitForm(category)" enctype="multipart/form-data">
              <v-text-field
                v-model="category.name"
                label="Name"
              ></v-text-field>
              <v-text-field
                v-model="category.description"
                label="Description"
                multi-line
                no-resize
              ></v-text-field>
              <img :src="imageUrl" height="150" v-if="imageUrl"/>
              <v-text-field
                label="Select Image"
                @click="pickFile"
                v-model="category.image"
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
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'CategoryEdit',
  computed: {
    ...mapState('categories', ['category'])
  },
  mounted () {
    if (this.$route.params.id) {
      this.detailCategory(this.$route.params.id).then(() => {
        this.imageUrl = this.category.image
      })
    } else {
      this.clear()
    }
  },
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    ...mapActions('categories', ['addCategory', 'updateCategory', 'detailCategory']),
    submitForm (category) {
      const formData = new FormData()
      this.file = this.$refs.image.files[0]
      if (this.file) {
        formData.append('file', this.file)
      }
      formData.append('category', JSON.stringify(category))
      if (this.$route.params.id) {
        this.updateCategory({ id: this.$route.params.id, category: formData }).then(() => this.$router.push('/admin/categories'))
      } else {
        this.addCategory(formData).then(() => this.$router.push('/admin/categories'))
      }
      this.clear()
    },
    pickFile () {
      this.$refs.image.click()
    },
    clear () {
      Object.keys(this.category).forEach((key, index) => {
        this.category[key] = ''
      })
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.category.image = files[0].name
        if (this.category.image.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
        })
      } else {
        this.category.image = ''
        this.imageUrl = ''
      }
    }
  }
}
</script>
