<template>
  <v-card>
    <v-card-title>
      Categories
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="categories"
      class="elevation-1 table-list"
    >
      <template slot="items" slot-scope="props">
        <td><img class="avatar" :src="props.item.image"/></td>
        <td>{{props.item.name}}</td>
        <td>{{props.item.description}}</td>
        <td>
          <v-btn flat icon :to="{name: 'CategoryEdit', params: {id: props.item._id}}">
            <v-icon color="info">edit</v-icon>
          </v-btn>
          <v-btn flat icon @click.prevent="deleteCategory(props.item._id)">
            <v-icon color="error">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CategoryList',
  computed: {
    ...mapState('categories', ['categories'])
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.slug === undefined) {
      return next((vm) => vm.resetCategory())
    }
    return next()
  },
  mounted () {
    this.getCategories()
  },
  data () {
    return {
      headers: [
        { text: 'Image', value: 'image', align: 'center' },
        { text: 'Name', value: 'name', align: 'center' },
        { text: 'Description', value: 'description', align: 'center' },
        { text: 'Action', value: 'action', align: 'center' }
      ],
      search: null
    }
  },
  methods: {
    ...mapActions('categories', ['getCategories', 'resetCategory', 'delete']),
    deleteCategory (id) {
      this.delete(id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar {
    width: 60px;
    height: 60px;
    padding: 5px;
    border-radius: 50%;
  }
</style>
