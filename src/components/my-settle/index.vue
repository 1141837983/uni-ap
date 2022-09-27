<template>
  <view class="my-settle">
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullChecked" /><text>全选</text>
    </label>

    <view class="amount-box">
      合计:<text class="amount">￥{{ checkedGoodsAmount }}</text>
    </view>

    <view class="btn-settle" @click="settlement">
      结算（{{ checkedCount }}）
    </view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "my-settle",
  props: {},
  data() {
    return {
      seconds: 3,
      timer: null,
    };
  },
  methods: {
    ...mapMutations("m_cart", ["updateAllGoodsState"]),
    ...mapMutations("m_user", ["updateRedirectInfo"]),
    changeAllState() {
      this.updateAllGoodsState(!this.isFullChecked);
    },
    settlement() {
      if (!this.checkedCount) return uni.$showMsg("请选择要结算的商品");
      if (!this.addstr) return uni.$showMsg("请选择收货地址");
      if (!this.token) return this.delayNavigate();
      this.payOrder();
    },
    showTips(n) {
      uni.showToast({
        icon: "none",
        title: "请登录后再结算" + n + "秒后自动跳转到登录页",
        mask: true,
        duration: 1500,
      });
    },
    delayNavigate() {
      this.seconds = 3;
      this.showTips(this.seconds);

      this.timer = setInterval(() => {
        this.seconds--;
        if (this.seconds <= 0) {
          clearInterval(this.timer);
          uni.switchTab({
            url: "../../pages/my/index",
            success: () => {
              this.updateRedirectInfo({
                openType: "switchTab",
                from: "../../pages/car/index",
              });
            },
          });
          return;
        }
        this.showTips(this.seconds);
      }, 1000);
    },
    async payOrder() {
      const orderInfo = {
        order_price: 0.01,
        consignee_addr: this.addstr,
        goods: this.cart
          .filter((x) => x.goods_state)
          .map((x) => ({
            goods_id: x.goods_id,
            goods_number: x.goods_count,
            goods_price: x.goods_price,
          })),
      };
      const { data: res } = await uni.$http.post(
        "/api/public/v1/my/orders/create",
        orderInfo
      );
      const orderNumber = "HMDD20190802000000000422";

      const { data: res2 } = await uni.$http.post(
        "/api/public/v1/my/orders/req_unifiedorder",
        { order_number: orderNumber }
      );
      const payInfo = {
        timeStamp: "1564730510",
        nonceStr: "SReWbt3nEmpJo3tr",
        package: "prepay_id=wx02152148991420a3b39a90811023326800",
        signType: "MD5",
        paySign: "3A6943C3B865FA2B2C825CDCB33C5304",
      };

      const [err, succ] = await uni.requestPayment(payInfo);
      // 3.2 未完成支付
      if (err) return uni.$showMsg("订单未支付！");
      // 3.3 完成了支付，进一步查询支付的结果
      const { data: res3 } = await uni.$http.post(
        "/api/public/v1/my/orders/chkOrder",
        { order_number: orderNumber }
      );
      // 3.4 检测到订单未支付
      if (res3.meta.status !== 200) return uni.$showMsg("订单未支付！");
      // 3.5 检测到订单支付完成
      uni.showToast({
        title: "支付完成！",
        icon: "success",
      });
    },
  },
  computed: {
    ...mapGetters("m_cart", ["checkedCount", "total", "checkedGoodsAmount"]),
    ...mapGetters("m_user", ["addstr"]),
    ...mapState("m_user", ["token"]),
    ...mapState("m_cart", ["cart"]),
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
