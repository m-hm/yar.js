<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-file-input accept="image/*" label="فایل اکسل" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-btn color="primary" @click="submit">
            ارسال
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      items: { },
      form: { },
      rule: {
        name: [
          v => !!v || 'این فیلد اجباری است',
          v => (v && v.trim().length > 3) || 'این فیلد اجباری است'
        ]
      }
    }
  },
  methods: {
    async submit () {
      if (!this.$refs.form.validate()) {
        return
      }
      try {
        await this.$axios.$post('/api/people/import', this.form)
        alert('بسته اضافه شد')
      } catch (e) {
      }
    }
  }
}
</script>

<style>
</style>
