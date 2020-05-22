export const state = () => ({
  map: { error: [], info: [] }
})

export const mutations = {
  add (state, m) {
    state.map[m.type].push(m.message)
  },
  clear (state) {
    state.map = { error: [], info: [] }
  }
}
