<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue">
            <v-toolbar-title>
              {{
                this.$route.params.id ?
                  'Edit Product' :
                  'Add Product'
              }}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-on:submit.prevent="submitForm(product)" enctype="multipart/form-data">
              <v-text-field
                v-model="product.name"
                label="Name"
              ></v-text-field>
              <v-text-field
                v-model="product.description"
                label="Description"
                multi-line
                no-resize
              ></v-text-field>
              <v-text-field
                v-model="product.price"
                label="Price"
              ></v-text-field>
              <v-select
                v-model="product.category"
                :items="categories"
                label="Category"
                item-text="name"
                item-value="_id"
              ></v-select>
              <img :src="imageUrl" height="150" v-if="imageUrl"/>
              <v-text-field
                label="Select Image"
                @click="pickFile"
                v-model="product.image"
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
  name: 'ProductEdit',
  computed: {
    ...mapState('products', ['product']),
    ...mapState('categories', ['categories'])
  },
  mounted () {
    this.getCategories()
    if (this.$route.params.id) {
      this.detailProduct(this.$route.params.id).then(() => {
        this.imageUrl = this.product.image
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
    ...mapActions('products', ['addProduct', 'updateProduct', 'detailProduct']),
    ...mapActions('categories', ['getCategories']),
    submitForm (product) {
      const formData = new FormData()
      this.file = this.$refs.image.files[0]
      if (this.file) {
        formData.append('file', this.file)
      }
      formData.append('product', JSON.stringify(product))
      if (this.$route.params.id) {
        this.updateProduct({ id: this.$route.params.id, product: formData }).then(() => this.$router.push('/admin/products'))
      } else {
        this.addProduct(formData).then(() => this.$router.push('/admin/products'))
      }
      this.clear()
    },
    pickFile () {
      this.$refs.image.click()
    },
    clear () {
      Object.keys(this.product).forEach((key, index) => {
        this.product[key] = ''
      })
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.product.image = files[0].name
        if (this.product.image.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
        })
      } else {
        this.product.image = ''
        this.imageUrl = ''
      }
    }
  }
}
</script>
