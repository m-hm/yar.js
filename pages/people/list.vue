<template>
  <div>
    <div>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="1">
              <v-text-field v-model="search.priority" type="number" label="اولویت" />
            </v-col>

            <v-col cols="12" md="2">
              <v-text-field v-model="search.first_name" label="نام" />
            </v-col>

            <v-col cols="12" md="2">
              <v-text-field v-model="search.last_name" label="نام‌خانوادگی" />
            </v-col>

            <v-col cols="12" md="2">
              <v-text-field
                v-model="search.national_code"
                label="کدملی"
                dir="ltr"
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-btn text @click="onSearch">
                جستوجو
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>

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
  </div>
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
  data () {
    return {
      search: {
        priority: '',
        first_name: '',
        last_name: '',
        national_code: ''
      }
    }
  },
  methods: {
    dateFormat (date) {
      return DateFormat(new Date(date))
    },
    async onSearch () {
      const data = {}
      for (const k in this.search) {
        const v = this.search[k].trim()
        this.search[k] = v
        if (v.length > 0) {
          data[k] = v
        }
      }
      try {
        const result = await this.$axios.$get('/api/people', { params: data })
        return {
          people: result.data
        }
      } catch (e) {}
    }
  }
}
</script>

<style>

</style>
