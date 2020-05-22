<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>نام</th>
          <th>نام خانوادگی</th>
          <th>موبایل</th>
          <th>فعال</th>
          <th>نقش‌ها</th>
          <th>‌تاریخ ایجاد</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.first_name }}</td>
          <td>{{ u.last_name }}</td>
          <td>{{ u.mobile }}</td>
          <td>{{ u.is_active }}</td>
          <td>{{ u.roles }}</td>
          <td>{{ dateFormat(u.created_at) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
const DateFormat = Intl.DateTimeFormat('fa-IR').format

export default {
  async asyncData ({ $axios }) {
    const result = await $axios.$get('/api/people')
    return {
      users: result.data
    }
  },
  methods: {
    dateFormat (date) {
      return DateFormat(new Date(date))
    }
  }
}
</script>

<style>

</style>
