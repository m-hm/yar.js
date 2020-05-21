<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-alert v-if="error" type="error">
            {{ error }}
          </v-alert>
          <v-form id="form">
            <v-toolbar color="primary" dark flat />
            <v-card-text>
              <v-text-field v-model="form.mobile" label="موبایل" prepend-icon="mdi-account" type="text" />
              <v-text-field v-model="form.password" label="گذر واژه" prepend-icon="mdi-lock" type="password" />
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
      form: {
        mobile: '09029044499',
        password: '123456'
      },
      error: ''
    }
  },
  methods: {
    async submit () {
      this.error = ''

      try {
        await this.$auth.loginWith('local', { data: this.form })
      } catch (e) {
        this.error = e.message
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
