<template>
  <view v-if="goods_info.goods_name" class="goods_detail_container">
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      :circular="true"
      class="swiper"
    >
      <swiper-item v-for="(item, index) in goods_info.pics" :key="index">
        <image :src="item.pics_big" @click="preview(index)"></image>
      </swiper-item>
    </swiper>

    <!-- 商品信息 -->
    <view class="goods_info_box">
      <view class="price">￥{{ goods_info.goods_price }}</view>
      <view class="goods_info_body">
        <view class="goods_name">{{ goods_info.goods_name }}</view>
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="yf">运费：免运费</view>
    </view>

    <!-- 商品详情 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>

    <!-- 商品导航组件 -->
    <view class="goods_nav">
      <uni-goods-nav
        :fill="true"
        :options="options"
        :buttonGroup="buttonGroup"
        @click="onClick"
        @buttonClick="buttonClick"
      ></uni-goods-nav>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "goods_detail",
  computed: {
    ...mapState("m_cart", []),
    ...mapGetters("m_cart", ["total"]),
  },
  watch: {
    total: {
      handler(newValue) {
        const findResult = this.options.find((x) => x.text === "购物车");
        if (findResult) {
          findResult.info = newValue;
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      goods_info: {},
      options: [
        {
          icon: "shop",
          text: "店铺",
        },
        {
          icon: "cart",
          text: "购物车",
          info: 0,
        },
      ],
      buttonGroup: [
        {
          text: "加入购物车",
          backgroundColor: "#ff0000",
          color: "#fff",
        },
        {
          text: "立即购买",
          backgroundColor: "#ffa200",
          color: "#fff",
        },
      ],
    };
  },
  methods: {
    ...mapMutations("m_cart", ["addToCart"]),
    async getGoosDetail(goods_id) {
      const { data: res } = await uni.$http.get("/api/public/v1/goods/detail", {
        goods_id,
      });
      if (res.meta.status !== 200) return uni.$showMsg();
      res.message.goods_introduce = res.message.goods_introduce
        .replace(/<img /g, '<img style="display:block;"')
        .replace(/webp/g, "jpg");
      this.goods_info = res.message;
    },
    preview(index) {
      uni.previewImage({
        current: index,
        urls: this.goods_info.pics.map((x) => x.pics_big),
      });
    },
    onClick(e) {
      if (e.content.text === "购物车") {
        uni.switchTab({
          url: "../../pages/car/index",
        });
      }
    },
    buttonClick(e) {
      if (e.content.text === "加入购物车") {
        const goods = {
          goods_id: this.goods_info.goods_id, // 商品的Id
          goods_name: this.goods_info.goods_name, // 商品的名称
          goods_price: this.goods_info.goods_price, // 商品的价格
          goods_count: 1, // 商品的数量
          goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
          goods_state: true, // 商品的勾选状态
        };

        this.addToCart(goods);
      }
    },
  },

  // 页面周期函数--监听页面加载
  onLoad(options) {
    const goods_id = options.goods_id;
    this.getGoosDetail(goods_id);
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style scoped lang="scss">
.swiper {
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}

.goods_info_box {
  padding: 10px;
  padding-right: 0px;
  .price {
    color: red;
    font-size: 18px;
    margin: 10px 0;
  }
  .goods_info_body {
    display: flex;
    justify-content: space-between;
    .goods_name {
      font-size: 13px;
      margin-right: 10px;
    }
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }
  .yf {
    font-size: 12px;
    color: gray;
    margin: 10px 0;
  }
}

.goods_nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.goods_detail_container {
  padding-bottom: 50px;
}
</style>
