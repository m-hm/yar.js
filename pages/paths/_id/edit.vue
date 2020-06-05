<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="form.name" :rules="rule.name" label="نام مسیر" required />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="form.description" :rules="rule.name" label="توضیحات" required />
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
import { omitEmptyFields } from '~/lib/helper'

export default {
  async asyncData ({ $axios, params }) {
    const result = await $axios.$get(`/api/paths/${params.id}`)
    return {
      form: result.data
    }
  },
  data () {
    return {
      valid: false,
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
        await this.$axios.$put(`/api/paths/${this.form.id}`, omitEmptyFields(this.form))
        alert('مسیر ویرایش شد')
      } catch (e) {
      }
    }
  }
}
</script>

<style>
</style>
