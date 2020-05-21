<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            v-model="form.symbolName"
            :items="items.symbols"
            :rules="rule.select"
            label="نماد"
            required
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="form.actionType"
            :items="items.actionTypes"
            :rules="rule.select"
            label="اکشن"
            required
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="form.signalType"
            :items="items.signalTypes"
            :rules="rule.select"
            label="سیگنال"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3">
          <v-checkbox v-model="form.isActive" label="فعال" />
        </v-col>

        <v-col cols="12" md="3">
          <v-checkbox v-model="form.isIpo" label="عرض اولیه" />
        </v-col>

        <v-col cols="12" md="6">
          <v-menu
            v-model="expirationDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="localForm.expirationDateFarsi"
                v-on="on"
                label="تاریخ اعتبار"
                readonly
              />
            </template>
            <v-date-picker
              v-model="form.expirationDate"
              @input="expirationDateMenu = false"
              :first-day-of-week="6"
              @change="onExpirationDate"
              locale="fa-ir"
            />
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-slider
            v-model="form.riskValue"
            label="ریسک"
            min="1"
            max="10"
            color="orange"
            thumb-label
            ticks
            required
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-slider
            v-model="form.importanceLevel"
            label="اهمیت"
            min="1"
            max="10"
            color="green"
            thumb-label
            ticks
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="form.expertNote" :rules="rule.note" label="توضیحات" required />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-btn @click="submit" color="primary">
            ثبت
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
      items: {
        symbols: ['A', 'B'],
        signalTypes: ['Stocks', 'Fund', 'Securities', 'IPO'],
        actionTypes: ['Buy', 'Sell', 'Issuance', 'Revoke']
      },
      form: {
        symbolName: '',
        signalType: '',
        importanceLevel: 1,
        expirationDate: '',
        actionType: '',
        expertNote: '',
        isActive: false,
        riskValue: 1,
        isIpo: false
      },
      localForm: { expirationDateFarsi: '' },
      expirationDateMenu: false,
      rule: {
        note: [
          v => !!v || 'این فیلد اجباری است',
          v => (v && v.trim().length > 3) || 'این فیلد اجباری است'
        ],
        select: [
          v => !!v || 'این فیلد اجباری است',
          v => (v && v.toString().trim().length > 0) || 'این فیلد اجباری است'
        ]
      }
    }
  },
  async asyncData ({ $axios, params }) {
    const signal = await $axios.$get(`/api/signals/${params.id}`)
    const d = new Date(signal.expirationDate)
    signal.expirationDate = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    return {
      form: signal
    }
  },
  mounted () {
    const d = new Date(this.form.expirationDate)
    this.localForm.expirationDateFarsi = this.dateFormat(d)
  },
  methods: {
    dateFormat (date) {
      return new Intl.DateTimeFormat('fa-IR').format(date)
    },
    async submit () {
      if (!this.$refs.form.validate()) {
        return
      }
      try {
        const result = await this.$axios.$put(`/api/signals/${this.$route.params.id}`, this.form)
        alert(result.id)
      } catch (e) {
        alert(e.message)
      }
    },
    onExpirationDate () {
      const date = new Date(this.form.expirationDate)
      this.localForm.expirationDateFarsi = this.dateFormat(date)
    }
  }
}
</script>

<style>
</style>
