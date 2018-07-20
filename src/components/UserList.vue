<template>
  <v-card>
    <v-card-title>
      Users
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
      :items="users"
      class="elevation-1 table-list text-center"
    >
      <template slot="items" slot-scope="props">
        <td><img class="avatar" :src="props.item.image"/></td>
        <td>{{props.item.fullName}}</td>
        <td>{{props.item.email}}</td>
        <td>{{props.item.phone}}</td>
        <td>{{props.item.dateOfBirth | date}}</td>
        <td>{{props.item.gender | gender}}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UserList',
  computed: {
    ...mapState('auth', ['users'])
  },
  mounted () {
    this.getUsers()
  },
  data () {
    return {
      headers: [
        { text: 'Avatar', value: 'image', align: 'center' },
        { text: 'Name', value: 'fullName', align: 'center' },
        { text: 'Email', value: 'email', align: 'center' },
        { text: 'Phone', value: 'phone', align: 'center' },
        { text: 'Birthday', value: 'birthday', align: 'center' },
        { text: 'Gender', value: 'gender', align: 'center' }
      ],
      search: null
    }
  },
  methods: {
    ...mapActions('auth', ['getUsers'])
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
