<template>
  <view
    class="my-search-container"
    :style="{ 'background-color': bgColor }"
    @click="searchBoxHandler"
  >
    <view class="my-search-box" :style="{ 'border-radius': radius + 'px' }">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "my-search",
  props: {
    bgColor: {
      type: String,
      default: "#C00000",
    },
    radius: {
      type: Number,
      default: 18,
    },
  },
  methods: {
    searchBoxHandler() {
      this.$emit("click");
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
.my-search-container {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .my-search-box {
    height: 36px;
    background-color: #ffffff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>
