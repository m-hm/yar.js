<template>
  <v-layout column justify-center align-center>
    logout page
  </v-layout>
</template>

<script>
export default {
  mounted () {
    this.$auth.logout()
  }
}
</script>
