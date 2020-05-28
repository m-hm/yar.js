<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>مسیر</th>
          <th>توضیحات</th>
          <th>تاریخ ایجاد</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in paths" :key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ p.description }}</td>
          <td>{{ dateFormat(p.created_at) }}</td>
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
const DateFormat = Intl.DateTimeFormat('fa-IR').format

export default {
  async asyncData ({ $axios }) {
    const result = await $axios.$get('/api/paths')
    return {
      paths: result.data
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
