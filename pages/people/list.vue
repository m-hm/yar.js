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
            <v-col cols="12" md="2">
              <v-select
                v-model="search.path_id"
                :items="items.paths"
                label="مسیر"
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

    <v-simple-table dense>
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
            <th>بسته دریافتی</th>
            <th>فرزندان</th>
            <th>تلفن</th>
            <th>ایجاد</th>
            <th>مسیر</th>
            <th>آدرس</th>
            <th>توضیحات</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in people.data" :key="p.id" :class="(p.national_code_conflicts && p.national_code_conflicts.length) ? 'red--text' : ''">
            <td><v-checkbox v-model="form.ids" :value="p.id" /></td>
            <td>{{ p.first_name }}</td>
            <td>{{ p.last_name }}</td>
            <td>{{ p.national_code }}</td>
            <td>{{ p.father_name }}</td>
            <td>{{ p.priority }}</td>
            <td>{{ p.is_supervisor }}</td>
            <td>{{ p.income }}</td>
            <td>
              <v-btn small color="gary" @click="onShowPackages(p)">
                {{ p.packages_count }}
              </v-btn>
            </td>
            <td>{{ p.children_count }}</td>
            <td>{{ p.phones }}</td>
            <td>{{ fmtDate(p.created_at) }}</td>
            <td>{{ pathsKeyValue.get(p.path_id) }}</td>
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

    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="search.page"
              class="my-4"
              :length="people.meta.last_page"
              @input="onSearch"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-container>

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
          <v-col cols="12" sm="2">
            تغییر اولویت به
            <v-text-field v-model="form.priority" type="number" label="اولویت" />
          </v-col>
          <v-col cols="12" sm="2">
            توزیع کننده
            <v-select
              v-model="form.distributor"
              :items="items.users"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-btn color="primary" @click="onAddPackage">
            اعمال
          </v-btn>
        </v-row>
      </v-container>
    </div>

    <v-row justify="center">
      <v-dialog v-model="personPackages.dialog" width="400px">
        <!-- <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">
            Open Dialog
          </v-btn>
        </template> -->
        <v-card>
          <v-card-title>
            <span>{{ personPackages.title }}</span>
          </v-card-title>
          <v-card-text>
            <p v-for="p in personPackages.packages.data" :key="p.id">
              {{ p.name }} <code>{{ fmtDate(p.created_at) }}</code>
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="green darken-1" text @click="personPackages.dialog = false">
              بستن
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import _ from 'lodash'
import { format, omitEmptyFields } from '~/lib/helper'

export default {
  async asyncData ({ $axios }) {
    const packages = (await $axios.$get('/api/packages'))
    const paths = (await $axios.$get('/api/paths'))
    const people = (await $axios.$get('/api/people'))
    const users = (await $axios.$get('/api/users'))
    return {
      packages,
      paths,
      people,
      users
    }
  },
  data () {
    return {
      search: { },
      form: { ids: [], selectedAll: false },
      items: {
        packages: [],
        paths: [],
        users: []
      },
      pathsKeyValue: new Map(),
      personPackages: { dialog: false, packages: {} }
    }
  },
  mounted () {
    this.items.packages = this.packages.data.map(x => ({ text: x.name, value: x.id }))
    this.items.paths = this.paths.data.map(x => ({ text: x.name, value: x.id }))
    this.items.users = this.users.data.map(x => ({ text: `${x.first_name} ${x.last_name}`, value: x.id }))
    _.forEach(this.items.paths, v => this.pathsKeyValue.set(v.value, v.text))
  },
  methods: {
    fmtDate (v) {
      return format.date(v)
    },
    async onSearch (v) {
      try {
        const params = omitEmptyFields(this.search)
        if (_.isInteger(v)) { params.page = v }
        this.people = await this.$axios.$get('/api/people', { params })
      } catch (e) {}
    },
    async onAddPackage () {
      try {
        if (this.form.ids.length < 1) { return }
        await this.$axios.$post('/api/people/package', omitEmptyFields(this.form))
        await this.onSearch()
        this.form.selectedAll = false
        this.form.ids = []
        alert('بسته اختصاص بافت')
      } catch (e) {
        alert(e.message)
      }
    },
    onSelectAll () {
      this.form.ids = this.form.selectedAll ? _.map(this.people.data, x => x.id) : []
    },
    async onShowPackages (p) {
      this.personPackages.dialog = true
      this.personPackages.title = `${p.first_name} ${p.last_name}`
      this.personPackages.packages = await this.$axios.$get(`/api/people/${p.id}/packages`)
    }
  }
}
</script>

<style>

</style>
