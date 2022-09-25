<template>
  <view class="my-settle">
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullChecked" /><text>全选</text>
    </label>

    <view class="amount-box">
      合计:<text class="amount">￥{{ checkedGoodsAmount }}</text>
    </view>

    <view class="btn-settle"> 结算（{{ checkedCount }}） </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "my-settle",
  props: {},
  data() {
    return {};
  },
  methods: {
    ...mapMutations("m_cart", ["updateAllGoodsState"]),
    changeAllState() {
      this.updateAllGoodsState(!this.isFullChecked);
    },
  },
  computed: {
    ...mapGetters("m_cart", ["checkedCount", "total", "checkedGoodsAmount"]),
    isFullChecked() {
      return this.checkedCount === this.total;
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
.my-settle {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount-box {
    .amount {
      color: red;
      font-weight: bold;
    }
  }

  .btn-settle {
    width: 100px;
    height: 50px;
    background-color: red;
    color: white;
    line-height: 50px;
    text-align: center;
  }
}
</style>
