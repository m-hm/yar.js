<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>بسته</th>
          <th>توضیحات</th>
          <th>تاریخ ایجاد</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in packages.data" :key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ p.description }}</td>
          <td>{{ fmtDate(p.created_at) }}</td>
          <td>
            <nuxt-link :to="`/packages/${p.id}/edit`">
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
    const packages = await $axios.$get('/api/packages')
    return {
      packages
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
