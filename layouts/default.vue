<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped right>
      <sidebar-menu />
    </v-navigation-drawer>

    <v-app-bar app clipped-right color="cyan" dark right>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>مدیریت</v-toolbar-title>

      <v-spacer />

      <span>{{ $auth.user.first_name + ' ' + $auth.user.last_name }}</span>

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
      <v-container>
        <v-alert v-for="(e, i) in errors" :key="i" type="error">
          {{ e }}
        </v-alert>
      </v-container>
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
  computed: {
    errors () {
      return this.$store.state.alerts.map.error
    }
  },
  methods: {
    logout () {
      this.$router.push('/logout')
    }
  }
}
</script>
