<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>مسیر</th>
          <th>برحسب اولویت</th>
          <th />
          <th>توضیحات</th>
          <th>تاریخ ایجاد</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in paths.data" :key="p.id">
          <td>{{ p.name }}</td>
          <td>
            <v-btn small :disabled="loadingPriority[p.id]" @click="onGetPriorities(p.id)">
              <v-icon v-if="!loadingPriority[p.id]">
                mdi-priority-high
              </v-icon>
              <v-progress-circular v-if="loadingPriority[p.id]" indeterminate color="primary" />
            </v-btn>
          </td>
          <td>
            <v-chip v-for="c in pathPeopleCount[p.id]" :key="`${p.id}-${c.priority}`">
              <span>اولویت {{ c.priority }}</span>
              <v-avatar right color="green">
                {{ c.count }}
              </v-avatar>
            </v-chip>
          </td>
          <td>{{ p.description }}</td>
          <td>{{ fmtDate(p.created_at) }}</td>
          <td>
            <nuxt-link :to="`/paths/${p.id}/edit`">
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
    const paths = await $axios.$get('/api/paths')
    const loadingPriority = {}
    _.forEach(paths.data, (x) => { loadingPriority[x.id] = false })
    return {
      paths,
      loadingPriority,
      pathPeopleCount: {}
    }
  },
  data () {
    return {

    }
  },
  methods: {
    fmtDate (v) {
      return format.date(v)
    },
    async onGetPriorities (id) {
      this.loadingPriority[id] = true
      this.pathPeopleCount[id] = (await this.$axios.$get(`/api/paths/count-priority/${id}`)).data
      this.loadingPriority[id] = false
    }
  }
}
</script>
