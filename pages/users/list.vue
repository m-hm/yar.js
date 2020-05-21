<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>نام</th>
          <th>نام خانوادگی</th>
          <th>نام کاربری</th>
          <th>ایمیل</th>
          <th>نقش‌ها</th>
          <th>فعال</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.firstName }}</td>
          <td>{{ u.lastName }}</td>
          <td>{{ u.username }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.roles }}</td>
          <td>{{ u.isEnable }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const users = await $axios.$get('/api/users')
    return {
      users
    }
  }

}
</script>

<style>

</style>
