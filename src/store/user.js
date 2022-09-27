export default {
  // 开启命名空间
  namespaced: true,

  // state 数据
  state: () => ({
    // 收货地址
    address: JSON.parse(uni.getStorageSync("address") || "{}"),
    token: uni.getStorageSync("token") || "",
    userInfo: JSON.parse(uni.getStorageSync("userInfo") || "{}"),
    redirectInfo: null,
  }),

  // 方法
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address;
      this.commit("m_user/saveAddressToStorage");
    },
    saveAddressToStorage(state) {
      uni.setStorageSync("address", JSON.stringify(state.address));
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      this.commit("m_user/saveUserInfoToStorage");
    },
    saveUserInfoToStorage(state) {
      uni.setStorageSync("userInfo", JSON.stringify(state.userInfo));
    },
    saveTokenToStorage(state) {
      uni.setStorageSync("token", state.token);
    },
    updateToken(state, token) {
      state.token = token;
      this.commit("m_user/saveTokenToStorage");
    },
    updateRedirectInfo(state, info) {
      state.redirectInfo = info;
    },
  },

  // 数据包装器
  getters: {
    addstr(state) {
      if (!state.address.provinceName) return "";

      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return (
        state.address.provinceName +
        state.address.cityName +
        state.address.countyName +
        state.address.detailInfo
      );
    },
  },
};
