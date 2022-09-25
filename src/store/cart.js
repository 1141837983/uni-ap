export default {
  namespaced: true,

  state: () => ({
    cart: JSON.parse(uni.getStorageSync("cart") || "[]"),
  }),

  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (!findResult) {
        state.cart.push(goods);
      } else {
        findResult.goods_count++;
      }
      this.commit("m_cart/saveToStorage");
    },
    saveToStorage(state) {
      uni.setStorageSync("cart", JSON.stringify(state.cart));
    },
    updateGoodsState(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_state = goods.goods_state;
        this.commit("m_cart/saveToStorage");
      }
    },
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_count = goods.goods_count;
        this.commit("m_cart/saveToStorage");
      }
    },
    removeGoodById(state, goods_id) {
      state.cart = state.cart.filter((x) => x.goods_id !== goods_id);
      this.commit("m_cart/saveToStorage");
    },
    updateAllGoodsState(state, newValue) {
      state.cart.forEach((x) => (x.goods_state = newValue));
      this.commit("m_cart/saveToStorage");
    },
  },

  getters: {
    total(state) {
      return state.cart.reduce((total, item) => (total += item.goods_count), 0);
    },
    checkedCount(state) {
      return state.cart
        .filter((x) => x.goods_state)
        .reduce((total, item) => (total += item.goods_count), 0);
    },
    checkedGoodsAmount(state) {
      return state.cart
        .filter((x) => x.goods_state)
        .reduce(
          (total, item) => (total += item.goods_price * item.goods_count),
          0
        )
        .toFixed(2);
    },
  },
};
