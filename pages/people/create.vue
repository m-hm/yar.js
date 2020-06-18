<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.first_name" :rules="rule.name" label="نام" />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.last_name" :rules="rule.name" label="نام‌خانوادگی" />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="form.national_code"
              :rules="rule.nationalCode"
              label="کدملی"
              dir="ltr"
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.father_name" label="نام پدر" />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.whife_name" label="نام‌ همسر" />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="form.wife_national_code"
              :rules="rule.nationalCode"
              label="کدملی همسر"
              dir="ltr"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.children_count" type="number" label="تعداد فرزندان" />
          </v-col>
          <v-col cols="12" md="2">
            <v-switch v-model="form.is_supervisor" label="سرپرست" />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.housing_status" type="number" label="وضعیت مسکن" />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.job" label="شغل" />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.pension" label="مستمری" />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.income" type="number" label="درآمد" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.illness" label="بیماری" />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.physical_status" label="وضعیت جسمی" />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.introducer" label="معرف" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.phones"
              label="تلفن ها"
              dir="ltr"
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.location" label="مکان" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="2">
            <v-select
              v-model="form.path_id"
              :items="items.paths"
              label="مسیر"
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.researches" type="number" label="تحقیقات" />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.verification_session" label="جلسه صحت سنجی" />
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field v-model="form.priority" type="number" label="اولویت" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.address" label="آدرس" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.description" label="توضیحات" />
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
import _ from 'lodash'
import { isNationalCode, omitEmptyFields } from '~/lib/helper'

export default {
  async asyncData ({ $axios }) {
    const paths = (await $axios.$get('/api/paths'))
    return {
      paths
    }
  },
  data: () => ({
    valid: false,
    items: {
      paths: []
    },
    form: { },
    rule: {
      name: [
        v => !!v || 'این فیلد اجباری است',
        v => (v && v.length >= 3) || 'min length >= 3'
      ],
      nationalCode: [
        v => (!v ? true : isNationalCode(v)) || 'Enter valid national code'
      ]
    }
  }),
  mounted () {
    this.items.paths.push({ text: '---', value: '' })
    _.forEach(this.paths.data, (x) => { this.items.paths.push({ text: x.name, value: x.id }) })
  },
  methods: {
    async submit () {
      if (!this.$refs.form.validate()) {
        return
      }
      try {
        await this.$axios.$post('/api/people', omitEmptyFields(this.form))
        alert('شخص اضافه شد')
      } catch (e) {}
    }
  }
}
</script>

<style>
</style>
