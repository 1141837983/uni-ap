<template>
  <view class="my-container">
    <MyLogin v-if="!token"></MyLogin>
    <MyUserinfo v-else></MyUserinfo>
  </view>
</template>

<script>
import badgeMix from "../../mixins/tabbar-badge";
import { mapState } from "vuex";
import MyLogin from "../../components/my-login/index.vue";
import MyUserinfo from "../../components/my-userinfo/index.vue";
export default {
  name: "my",
  mixins: [badgeMix],
  computed: {
    ...mapState("m_user", ["token"]),
  },
  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  components: { MyLogin, MyUserinfo },
};
</script>

<style scoped lang="scss">
page,
.my-container {
  height: 100%;
}
</style>
