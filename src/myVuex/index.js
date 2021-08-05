let _Vue = null
class Store {
  constructor (options) {
    const {
      state = {},
      mutations = {},
      actions = {},
      getters = {}
    } = options
    this.state = _Vue.observable(state)
    this.getters = Object.create(null)
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](state)
      })
    })
    this._mutations = mutations
    this._actions = actions
  }

  commit (type, payload) {
    this._mutations[type](this.state, payload)
  }

  dispatch (type, payload) {
    this._actions[type](this, payload)
  }
}

function install (Vue) {
  _Vue = Vue
  _Vue.mixin({
    beforeCreate () {
      if (this.$optoins.Store) {
        _Vue.prototype.$store = this.$optoins.store
      }
    }
  })
}

export default {
  Store,
  install
}
