<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserInfo">
      一键登录
    </button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "my-login",
  data() {
    return {};
  },
  computed: {
    ...mapState("m_user", ["redirectInfo"]),
  },
  methods: {
    ...mapMutations("m_user", [
      "updateUserInfo",
      "updateToken",
      "updateRedirectInfo",
    ]),
    getUserInfo() {
      uni.getUserProfile({
        desc: "123123123",
        success: (res) => {
          this.updateUserInfo(res.userInfo);
          this.getToken(res);
          this.updateToken(
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
          );
        },
        fail: () => {
          uni.$showMsg("您取消了登录授权");
        },
      });
    },
    async getToken(info) {
      const [err, res] = await uni.login().catch((err) => err);
      if (err || res.errMsg !== "login:ok") return uni.$showMsg("登录失败");

      const query = {
        code: res.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature,
      };

      const loginResult = await uni.$http.post(
        "/api/public/v1/users/wxlogin",
        query
      );
      console.log(loginResult);
      this.navigateBack();
    },
    navigateBack() {
      if (this.redirectInfo && this.redirectInfo.openType === "switchTab") {
        uni.switchTab({
          url: this.redirectInfo.from,
          complete: () => {
            this.updateRedirectInfo(null);
          },
        });
      }
    },
  },

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: " ";
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
