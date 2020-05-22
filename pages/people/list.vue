<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>نام</th>
          <th>نام خانوادگی</th>
          <th>کدملی</th>
          <th>پدر</th>
          <th>اولویت</th>
          <th>سرپرست</th>
          <th>درآمد</th>
          <th>فرزندان</th>
          <th>موبایل</th>
          <th>تلفن</th>
          <th>ایجاد</th>
          <th>آدرس</th>
          <th>توضیحات</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in people" :key="p.id">
          <td>{{ p.first_name }}</td>
          <td>{{ p.last_name }}</td>
          <td>{{ p.national_code }}</td>
          <td>{{ p.father_name }}</td>
          <td>{{ p.priority }}</td>
          <td>{{ p.is_supervisor }}</td>
          <td>{{ p.income }}</td>
          <td>{{ p.children_count }}</td>
          <td>{{ p.mobiles }}</td>
          <td>{{ p.phones }}</td>
          <td>{{ dateFormat(p.created_at) }}</td>
          <td>{{ p.address }}</td>
          <td>{{ p.description }}</td>
          <td>
            <nuxt-link :to="`/people/${p.id}/edit`">
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
    const result = await $axios.$get('/api/people')
    return {
      people: result.data
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
