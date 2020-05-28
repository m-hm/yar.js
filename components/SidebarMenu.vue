<template>
  <v-list dense>
    <v-list-group
      v-for="item in items"
      :key="item.title"
      v-model="item.active"
      :prepend-icon="item.icon"
      no-action
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </template>

      <v-list-item
        v-for="subItem in item.items"
        :key="subItem.title"
        :to="subItem.link"
      >
        <v-list-item-content>
          <v-list-item-title>
            <v-icon>{{ subItem.icon }}</v-icon>
            {{ subItem.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'میز کار',
          active: true,
          items: [
            { title: 'خانه', link: '/', icon: 'mdi-home' }
          ]
        },
        {
          icon: 'mdi-account-multiple',
          title: 'کاربران',
          items: [
            { title: 'لیست', link: '/users/list', icon: 'mdi-view-list' },
            { title: 'افزودن', link: '/users/create', icon: 'mdi-plus' }
          ]
        },
        {
          icon: 'mdi-package-variant',
          title: 'بسته ها',
          items: [
            { title: 'لیست', link: '/packages/list', icon: 'mdi-view-list' },
            { title: 'افزودن', link: '/packages/create', icon: 'mdi-plus' }
          ]
        },
        {
          icon: 'mdi-map-marker-path',
          title: 'مسیرها',
          items: [
            { title: 'لیست', link: '/paths/list', icon: 'mdi-view-list' },
            { title: 'افزودن', link: '/paths/create', icon: 'mdi-plus' }
          ]
        },
        {
          icon: 'mdi-account-group',
          title: 'افراد',
          items: [
            { title: 'لیست', link: '/people/list', icon: 'mdi-view-list' },
            { title: 'افزودن', link: '/people/create', icon: 'mdi-plus' },
            { title: 'اکسل', link: '/people/import', icon: 'mdi-file-excel-outline' }
          ]
        }
      ]
    }
  }
}
</script>
