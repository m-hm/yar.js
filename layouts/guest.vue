<template>
  <v-app id="guest-inspire">
    <v-app-bar app clipped-right color="primary" dark right />

    <v-content>
      <v-container class="fill-height" fluid>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer color="primary" app>
      <v-spacer />
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
  })
}
</script>
