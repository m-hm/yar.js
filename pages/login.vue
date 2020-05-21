<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-form id="form">
            <v-toolbar color="primary" dark flat />
            <v-card-text>
              <v-text-field v-model="username" label="نام کاربری" prepend-icon="mdi-account" type="text" />
              <v-text-field v-model="password" label="گذر واژه" prepend-icon="mdi-lock" type="password" />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="submit">
                ورود
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'guest',
  data () {
    return {
      username: 'admin',
      password: '',
      alert: {}
    }
  },
  methods: {
    async submit () {
      const data = {
        username: this.username,
        password: this.password
      }

      try {
        await this.$auth.loginWith('local', { data })
        this.alert = {
          type: 'info',
          message: this.$auth.user
        }
      } catch (e) {
        this.alert = {
          type: 'error',
          message: e.message
        }
      }
    }
  },
  head () {
    return {
      title: 'Login'
    }
  }
}
</script>

<style scoped>
#form {
  direction: ltr;
}
</style>
