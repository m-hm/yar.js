<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>بسته</th>
          <th>توزیع‌کننده</th>
          <th>توضیحات</th>
          <th>تاریخ ایجاد</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in packages.data" :key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ distributorsMap.get(p.id) }}</td>
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
import _ from 'lodash'
import { format } from '~/lib/helper'

export default {
  async asyncData ({ $axios }) {
    const packages = await $axios.$get('/api/packages')
    const ids = _.map(packages.data, x => x.id)
    const distributors = await $axios.$post('/api/packages/distributors', { ids })
    const distributorsMap = new Map()
    _.forEach(distributors, (x) => { distributorsMap.set(x.package_id, `${x.first_name} ${x.last_name}`) })

    return {
      packages,
      distributorsMap
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
