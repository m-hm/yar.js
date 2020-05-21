<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped right>
      <sidebar-menu />
    </v-navigation-drawer>

    <v-app-bar app clipped-right color="cyan" dark right>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>مدیریت</v-toolbar-title>

      <v-spacer />

      <span>{{ $auth.user.firstName + ' ' + $auth.user.lastName }}</span>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="logout">
            <v-icon v-on="on">
              mdi-logout
            </v-icon>
          </v-btn>
        </template>
        <span>خروج</span>
      </v-tooltip>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer>
      <v-spacer />
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import SidebarMenu from '~/components/SidebarMenu'

export default {
  components: {
    SidebarMenu
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    logout () {
      this.$router.push('/logout')
    }
  }
}
</script>
