<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>نماد</th>
          <th>اکشن</th>
          <th>سیگنال</th>
          <th>فعال</th>
          <th>عرض اولیه</th>
          <th>اهمیت</th>
          <th>ریسک</th>
          <th>تاریخ اعتبار</th>
          <th>تاریخ ایجاد</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in signals.content" :key="s.id">
          <td>{{ s.symbolName }}</td>
          <td>{{ s.actionType }}</td>
          <td>{{ s.signalType }}</td>
          <td>{{ s.isActive }}</td>
          <td>{{ s.isIpo }}</td>
          <td>{{ s.importanceLevel }}</td>
          <td>{{ s.riskValue }}</td>
          <td>{{ dateFormat(s.expirationDate) }}</td>
          <td>{{ dateFormat(s.createdAt) }}</td>
          <td>
            <nuxt-link :to="`/signals/${s.id}/edit`">
              ویرایش
            </nuxt-link>
          </td>
          <td />
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const signals = await $axios.$get('/api/signals')
    return {
      signals
    }
  },
  methods: {
    dateFormat (date) {
      return new Intl.DateTimeFormat('fa-IR').format(new Date(date))
    }
  }
}
</script>

<style>

</style>
