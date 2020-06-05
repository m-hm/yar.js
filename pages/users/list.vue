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
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users.data" :key="u.id">
          <td>{{ u.first_name }}</td>
          <td>{{ u.last_name }}</td>
          <td>{{ u.mobile }}</td>
          <td>{{ u.is_active }}</td>
          <td>{{ u.roles }}</td>
          <td>{{ fmtDate(u.created_at) }}</td>
          <td>
            <nuxt-link :to="`/users/${u.id}/edit`">
              ویرایش
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { format } from '~/lib/helper'

export default {
  async asyncData ({ $axios }) {
    const users = await $axios.$get('/api/users')
    return {
      users
    }
  },
  methods: {
    fmtDate (v) {
      return format.date(v)
    }
  }
}
</script>

<style>

</style>
