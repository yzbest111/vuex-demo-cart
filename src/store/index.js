import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import cart from './modules/cart'

Vue.use(Vuex)

// 注册vuex的插件，vuex中的插件会在mutations更新后执行,它接收一个store参数
const cartPlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type.startsWith('cart/')) {
      window.localStorage.setItem('cart-product', JSON.stringify(state.cart.cartProducts))
    }
  })
}
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products,
    cart
  },
  plugins: [cartPlugin]
})
