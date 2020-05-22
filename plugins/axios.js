export default function ({ $axios, store, redirect }) {
  $axios.onResponse((response) => {
    store.commit('alerts/clear')
  })

  $axios.onError((error) => {
    store.commit('alerts/clear')
    const code = parseInt(error.response && error.response.status)
    if (code === 422) {
      const errs = error.response.data.errors
      for (const e in errs) {
        store.commit('alerts/add', { type: 'error', message: errs[e][0] })
      }
    }
  })
}
