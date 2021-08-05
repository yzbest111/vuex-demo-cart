const state = {
  cartProducts: JSON.parse(window.localStorage.getItem('cart-product')) || []
}
const mutations = {
  addToCart (state, product) {
    const prod = state.cartProducts.find(item => item.id === product.id)
    if (prod) {
      prod.count++
      prod.isChecked = true
      prod.totalPrice = (prod.count * prod.price).toFixed(2)
    } else {
      state.cartProducts.push({
        ...product,
        isChecked: true,
        count: 1,
        totalPrice: product.price
      })
    }
  },
  deleteFromCart (state, proId) {
    const index = state.cartProducts.findIndex(product => product.id === proId)
    console.log('index', index)
    index > -1 && state.cartProducts.splice(index, 1)
  },
  updateAllProductsChecked (state, checked) {
    state.cartProducts.forEach(item => {
      item.isChecked = checked
    })
  },
  updateProductsChecked (state, { checked, proId }) {
    const product = state.cartProducts.find(item => item.id === proId)
    product && (product.isChecked = checked)
  },
  updateProduct (state, { count, proId }) {
    const product = state.cartProducts.find(item => item.id === proId)
    if (product) {
      product.count = count
      product.totalPrice = (count * product.price).toFixed(2)
    }
  }
}
const actions = {}
const getters = {
  totalCount (state) {
    return state.cartProducts.reduce((sum, product) => (sum + product.count), 0)
  },
  totalPrice (state) {
    return state.cartProducts.reduce((sum, product) => (sum + product.totalPrice), 0)
  },
  checkedCount (state) {
    return state.cartProducts.reduce((sum, product) => {
      if (product.isChecked) sum += product.count
      return sum
    }, 0)
  },
  checkedPrice (state) {
    return state.cartProducts.reduce((sum, product) => {
      if (product.isChecked) sum += product.totalPrice
      return parseFloat(sum).toFixed(2)
    }, 0)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
