<template>
  <v-list dense>
    <div>
      <v-list-tile exact :to="{path: '/admin'}">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </div>
    <div>
      <v-list-tile exact :to="{path: '/admin/users'}">
        <v-list-tile-action>
          <v-icon>group</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Users
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </div>
    <v-list-group
      :prepend-icon="toggleDropdown ? iconUp : iconDown"
      append-icon=""
      v-model="toggleDropdown"
    >
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>
            Products
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile exact :to="{path: '/admin/products'}">
        <v-list-tile-action></v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            List Product
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile exact :to="{path: '/admin/product-edit'}">
        <v-list-tile-action></v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Add Product
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-group>
    <v-list-group
      :prepend-icon="toggleCategory ? iconUp : iconDown"
      append-icon=""
      v-model="toggleCategory"
    >
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>
            Categories
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile exact :to="{path: '/admin/categories'}">
        <v-list-tile-action></v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            List Category
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile exact :to="{path: '/admin/category-edit'}">
        <v-list-tile-action></v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Add Category
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  name: 'Navigation',
  data: () => ({
    drawer: null,
    iconUp: 'keyboard_arrow_up',
    iconDown: 'keyboard_arrow_down',
    toggleDropdown: false,
    toggleCategory: false
  })
}
</script>

<style lang="scss" scoped>
  .list__group {
    &:before, &:after {
      left: 0;
    }
  }
</style>
