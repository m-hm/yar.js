<template>
  <div>
    <v-pagination v-model="search.page" :length="people.meta.last_page" @input="onSearch" />

    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th><v-checkbox v-model="form.selectedAll" @change="onSelectAll" /></th>
            <th />
            <th>نام</th>
            <th>نام خانوادگی</th>
            <th>کدملی</th>
            <th>اولویت</th>
            <th>بسته دریافتی</th>
            <th>تلفن</th>
            <th>مسیر</th>
            <th>توضیحات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in people.data" :key="p.id" :class="(p.national_code_conflicts && p.national_code_conflicts.length) ? 'red--text' : ''">
            <td><v-checkbox v-model="form.ids" :value="p.id" dense /></td>
            <td>
              <v-btn small icon :href="`/people/${p.id}/edit`" target="_blank">
                <v-icon>mdi-account-edit-outline</v-icon>
              </v-btn>
            </td>
            <td>{{ p.first_name }}</td>
            <td>{{ p.last_name }}</td>
            <td>{{ p.national_code }}</td>
            <td>{{ p.priority }}</td>
            <td>
              <v-btn small color="gary" @click="onShowPackages(p)">
                {{ p.packages_count }}
              </v-btn>
            </td>
            <td>{{ p.phones }}</td>
            <td>{{ pathsKeyValue.get(p.path_id) }}</td>
            <td>{{ p.description }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <br>

    <!-- Person package dialog -->
    <v-row justify="center">
      <v-dialog v-model="personPackages.dialog" width="400px">
        <v-card>
          <v-card-title>
            <span>{{ personPackages.title }}</span>
          </v-card-title>
          <v-card-text>
            <v-progress-circular v-if="personPackages.progress" indeterminate color="green" />
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

    <!-- Operations -->
    <v-bottom-navigation height="35" fixed dark color="gary">
      <v-btn dark @click="sheets.search = !sheets.search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn dark @click="sheets.assignPackage = !sheets.assignPackage">
        <v-icon>mdi-text-box-plus-outline</v-icon>
      </v-btn>
      <v-btn dark @click="sheets.print = !sheets.print">
        <v-icon>mdi-printer</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <!-- Search -->
    <v-bottom-sheet v-model="sheets.search">
      <v-sheet>
        <v-container>
          <v-row>
            <v-col cols="12" md="1">
              <v-text-field v-model="search.priority" type="number" label="اولویت" dense />
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field v-model="search.first_name" label="نام" dense />
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field v-model="search.last_name" label="نام‌خانوادگی" dense />
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                v-model="search.national_code"
                label="کدملی"
                dir="ltr"
                dense
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                v-model="search.path_id"
                :items="items.paths"
                label="مسیر"
                dense
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-btn color="primary" dense @click="onSearch">
                جست‌وجو
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>

    <!-- Assign package to people -->
    <v-bottom-sheet v-model="sheets.assignPackage">
      <v-sheet>
        <v-container>
          <v-row align="center">
            <v-col cols="12" sm="4">
              <v-select
                v-model="form.package"
                :items="items.packages"
                label="اختصاص دادن به بسته‌ی"
                dense
              />
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field v-model="form.priority" type="number" label="تغییر اولویت به" dense />
            </v-col>
            <v-col cols="12" sm="2">
              <v-select
                v-model="form.distributor"
                :items="items.users"
                label="توزیع کننده"
                dense
              />
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn color="primary" dense @click="onAddPackage">
                اعمال
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import _ from 'lodash'
import { format, omitEmptyFields } from '~/lib/helper'

export default {
  async asyncData ({ $axios }) {
    const packages = await $axios.$get('/api/packages')
    const paths = await $axios.$get('/api/paths')
    const people = await $axios.$get('/api/people')
    const users = await $axios.$get('/api/users')
    const pathsKeyValue = new Map()
    _.forEach(paths.data, (x) => { pathsKeyValue.set(x.id, x.name) })

    return {
      packages,
      paths,
      people,
      users,
      pathsKeyValue
    }
  },
  data () {
    return {
      sheets: { search: false, assignPackage: false, print: false },
      search: { },
      form: { ids: [], selectedAll: false },
      items: {
        packages: [],
        paths: [],
        users: []
      },
      personPackages: { dialog: false, packages: {} }
    }
  },
  mounted () {
    this.items.packages = this.packages.data.map(x => ({ text: x.name, value: x.id }))
    this.items.paths = this.paths.data.map(x => ({ text: x.name, value: x.id }))
    this.items.users = this.users.data.map(x => ({ text: `${x.first_name} ${x.last_name}`, value: x.id }))
  },
  methods: {
    fmtDate (v) {
      return format.date(v)
    },
    async onSearch (v) {
      try {
        const params = omitEmptyFields(this.search)
        params.page = _.isInteger(v) ? v : 1
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
      this.personPackages.packages = {}
      this.personPackages.title = `${p.first_name} ${p.last_name}`
      this.personPackages.progress = true
      this.personPackages.dialog = true
      try {
        this.personPackages.packages = await this.$axios.$get(`/api/people/${p.id}/packages`)
        this.personPackages.progress = false
      } catch (e) {}
    }
  }
}
</script>

<style>

</style>
