<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="f.firstName" :rules="rule.name" label="نام" required />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="f.lastName" :rules="rule.name" label="نام‌خانوادگی" required />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="f.username" :rules="rule.name" label="نام کاربری" required />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="f.email" :rules="rule.email" label="رایانامه" required />
        </v-col>

        <v-col cols="12" md="4">
          <v-select v-model="f.roles" :items="items.roles" label="نقش" required />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="f.password" :rules="rule.name" label="رمز عبور" required />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-btn color="primary" @click="submit">
            ثبت
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    items: {
      roles: ['ROLE_EXPERT', 'ROLE_ADMIN']
    },
    f: {},
    rule: {
      name: [
        v => !!v || 'Name is required',
        v => (v && v.length > 3) || 'min length > 3'
      ],
      email: [
        v => !!v || 'E-mail is required',
        v => (v && /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v)) || 'Invalid e-mail'
      ]
    }
  }),
  methods: {
    async submit () {
      if (!this.$refs.form.validate()) {
        return
      }
      try {
        const result = await this.$axios.$post('/api/users', this.f)
        alert(result.id)
      } catch (e) {
        alert('error')
      }
    }
  }
}
</script>

<style>
</style>
