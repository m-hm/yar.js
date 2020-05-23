<template>
  <div>
    <div>
      <v-form>
        <v-container fluid>
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
            <v-col cols="12" md="3">
              <v-select
                v-model="search.package"
                :items="items.packages"
                label="بسته"
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-btn @click="onSearch">
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
            <th><v-checkbox v-model="form.selectedAll" label="همه" @click="onSelectAll" /></th>
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
            <td><v-checkbox v-model="form.ids" :value="p.id" /></td>
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

    <div>
      <v-container fluid>
        <v-row align="center">
          <v-col cols="12" sm="4">
            اختصاص دادن به بسته‌ی
            <v-select
              v-model="form.package"
              :items="items.packages"
              label="بسته"
            />
          </v-col>
          <v-col cols="12" sm="4">
            تغییر اولویت به
            <v-text-field v-model="form.priority" type="number" label="اولویت" />
          </v-col>
          <v-col cols="12" sm="4">
            توزیع کننده
            <v-select
              v-model="form.distributor"
              :items="items.users"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-btn color="primary" @click="onSubmit">
            اعمال
          </v-btn>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
const DateFormat = Intl.DateTimeFormat('fa-IR').format

export default {
  async asyncData ({ $axios }) {
    const people = (await $axios.$get('/api/people')).data
    const packages = (await $axios.$get('/api/packages')).data
    const users = (await $axios.$get('/api/users')).data
    return {
      people,
      packages,
      users
    }
  },
  data () {
    return {
      search: { },
      form: { ids: [], selectedAll: false },
      items: {
        packages: [],
        users: []
      }
    }
  },
  mounted () {
    this.items.packages = this.packages.map(x => ({ text: x.name, value: x.id }))
    this.items.users = this.users.map(x => ({ text: `${x.first_name} ${x.last_name}`, value: x.id }))
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
        this.people = result.data
      } catch (e) {}
    },
    async onSubmit () {
      try {
        await this.$axios.$post('/api/people/package', this.form)
        await this.onSearch()
        this.form.selectedAll = false
        this.form.ids = []
      } catch (e) {}
    },
    onSelectAll () {
      this.form.ids = this.form.selectedAll ? this.people.map(x => x.id) : []
    }
  }
}
</script>

<style>

</style>
