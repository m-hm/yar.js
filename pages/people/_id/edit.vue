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
              v-model="form.national_code"
              :rules="rule.nationalCode"
              label="کدملی"
              dir="ltr"
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="form.father_name" label="نام پدر" required />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="form.whife_name" label="نام‌ همسر" required />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.wife_national_code"
              :rules="rule.nationalCode"
              label="کدملی همسر"
              dir="ltr"
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-switch v-model="form.is_supervisor" label="سرپرست" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="form.priority" type="number" label="اولویت" required />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="form.children_count" type="number" label="تعداد فرزندان" required />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="form.income" type="number" label="درآمد" required />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.mobile"
              label="موبایل‌ها"
              dir="ltr"
              hint="با / از هم جدا کنید"
              required
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.phones"
              label="تلفن‌ها"
              dir="ltr"
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="form.address" label="آدرس" required />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="form.description" label="توضیحات" required />
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
function isNationalCode (v) {
  if (!/^[0-9]{10}$/.test(v)) { return false }

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += (v[i] | 0) * (10 - i)
  }

  let rem = sum % 11
  if (rem > 1) { rem = 11 - rem }
  return (v[9] | 0) === rem
}
export default {
  async asyncData ({ $axios, params }) {
    const result = await $axios.$get(`/api/people/${params.id}`)
    return {
      form: result.data
    }
  },
  data: () => ({
    valid: false,
    items: {
      roles: ['distributor', 'operator', 'admin']
    },
    form: { },
    rule: {
      name: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 3) || 'min length >= 3'
      ],
      nationalCode: [
        v => (!v ? true : isNationalCode(v)) || 'Enter valid national code'
      ]
    }
  }),
  methods: {
    async submit () {
      if (!this.$refs.form.validate()) {
        return
      }
      try {
        await this.$axios.$put(`/api/people/${this.form.id}`, this.form)
        alert('شخص ویرایش شد')
      } catch (e) {}
    }
  }
}
</script>

<style>
</style>
