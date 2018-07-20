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
      hide-actions
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
  name: 'Users',
  computed: {
    ...mapState('auth', ['users'])
  },
  mounted () {
    this.getUsers()
  },
  data () {
    return {
      headers: [
        { text: 'Avatar', value: 'image' },
        { text: 'Name', value: 'fullName' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Birthday', value: 'birthday' },
        { text: 'Gender', value: 'gender' }
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
