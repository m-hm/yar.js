<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-file-input v-model="form.file" :rules="rule.file" accept=".xlsx" label="فایل اکسل" show-size />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-btn color="primary" @click="submit">
            ارسال
          </v-btn>
          <v-progress-circular
            v-if="uploading"
            indeterminate
            color="green"
          />
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
      uploading: false,
      items: { },
      form: { },
      rule: {
        file: [
          v => !!v || 'این فیلد اجباری است'
        ]
      }
    }
  },
  methods: {
    async  submit () {
      if (!this.$refs.form.validate()) {
        return
      }
      if (this.uploading) { return }

      this.uploading = true
      const formData = new FormData()
      formData.append('file', this.form.file)

      try {
        const r = await this.$axios.$post('/api/people/import', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        alert(`${r.success} سطر اضافه شد\n${r.faild} سطر ناموفق\nشماره سطرهای ناموفق: (${r.rows.join(',')})`)
      } catch (e) { }
      this.uploading = false
    }
  }
}
</script>

<style>
</style>
