<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <MyAddress></MyAddress>
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>

    <uni-swiper-action>
      <block v-for="(goods, index) in cart" :key="index">
        <uni-swipe-action-item
          :right-options="options"
          :auto-close="autoClose"
          @click="swiperItemClickHandler(goods)"
        >
          <MyGoods
            :goods="goods"
            :showRadio="true"
            @changeRadio="radioChangeHandler"
            :showNum="true"
            @changeNumber="numberChangeHanlder"
          ></MyGoods
        ></uni-swipe-action-item>
      </block>
    </uni-swiper-action>

    <MySettle></MySettle>
  </view>

  <view class="empty-cart" v-else>
    <image src="../../static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
import badgeMix from "../../mixins/tabbar-badge";
import { mapState, mapMutations } from "vuex";
import MyGoods from "../../components/my-goods/index.vue";
import MyAddress from "../../components/my-address/index.vue";
import MySettle from "../../components/my-settle/index.vue";
export default {
  name: "car",
  mixins: [badgeMix],
  computed: {
    ...mapState("m_cart", ["cart"]),
  },
  data() {
    return {
      options: [
        {
          text: "删除",
          style: {
            backgroundColor: "#C00000",
          },
        },
      ],
    };
  },
  methods: {
    ...mapMutations("m_cart", [
      "updateGoodsState",
      "updateGoodsCount",
      "removeGoodById",
    ]),
    radioChangeHandler(e) {
      this.updateGoodsState(e);
    },
    numberChangeHanlder(e) {
      this.updateGoodsCount(e);
    },
    swiperItemClickHandler(goods) {
      this.removeGoodById(goods.goods_id);
    },
  },
  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.setBadge();
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  components: { MyGoods, MyGoods, MyAddress, MySettle },
};
</script>

<style scoped lang="scss">
.cart-container {
  padding-bottom: 50px;
}
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
