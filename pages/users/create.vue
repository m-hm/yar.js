<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="form.first_name" :rules="rule.name" label="نام" required />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="form.last_name" :rules="rule.name" label="نام‌خانوادگی" required />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.mobile"
              :rules="rule.mobile"
              label="موبایل"
              dir="ltr"
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-switch v-model="form.is_active" label="فعال" />
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              v-model="form.roles"
              :items="items.roles"
              label="نقش ها"
              required
              multiple
              attach
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="form.password" :rules="rule.name" label="رمز عبور" required />
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
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    items: {
      roles: ['distributor', 'operator', 'admin']
    },
    form: { is_active: true, roles: ['distributor'] },
    rule: {
      name: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 3) || 'min length >= 3'
      ],
      mobile: [
        v => !!v || 'Mobile is required',
        v => (v && /^09[0-9]{9}$/.test(v)) || 'Invalid mobile number'
      ]
    }
  }),
  methods: {
    async submit () {
      if (!this.$refs.form.validate()) {
        return
      }
      try {
        await this.$axios.$post('/api/users', this.form)
        alert('کاربر اضافه شد')
      } catch (e) {}
    }
  }
}
</script>

<style>
</style>
