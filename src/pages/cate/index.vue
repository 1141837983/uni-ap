<template>
  <view>
    <my-search @click="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <scroll-view
        class="left-scroll-view"
        scroll-y
        :style="{ height: wh + 'px' }"
      >
        <block v-for="(item, index) in cateList" :key="index">
          <view
            :class="['left-scroll-view-item', index === active ? 'active' : '']"
            @click="activeChange(index)"
            >{{ item.cat_name }}</view
          >
        </block>
      </scroll-view>
      <scroll-view
        class="right-scroll-view"
        scroll-y
        :style="{ height: wh + 'px' }"
        :scroll-top="scrollTop"
      >
        <view
          class="cate-lv2"
          v-for="(item2, index2) in cateLevel2"
          :key="index2"
        >
          <view class="right-scroll-view-item">/ {{ item2.cat_name }} /</view>
          <view class="cate-lv3">
            <view
              class="cate-lv3-item"
              v-for="(item3, index3) in item2.children"
              :key="index3"
              @click="gotoGoodsList(item3)"
            >
              <image :src="item3.cat_icon"></image>
              <text>{{ item3.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import MySearch from "../../components/my-search/index.vue";
import badgeMix from "../../mixins/tabbar-badge";
export default {
  name: "cate",
  mixins: [badgeMix],
  data() {
    return {
      wh: 0,
      cateList: [],
      active: 0,
      cateLevel2: [],
      scrollTop: 0,
    };
  },
  methods: {
    async getCateList() {
      const { data: res } = await uni.$http.get("/api/public/v1/categories");
      if (res.meta.status !== 200) return uni.$showMsg();
      this.cateList = res.message;
      this.cateLevel2 = res.message[0].children;
    },
    activeChange(index) {
      this.active = index;
      this.cateLevel2 = this.cateList[index].children;
      this.scrollTop = this.scrollTop === 0 ? 1 : 0;
    },
    gotoGoodsList(item3) {
      uni.navigateTo({
        url: "/subpkg/goods_list/index?cid=" + item3.cat_id,
      });
    },
    gotoSearch() {
      uni.navigateTo({
        url: "../../subpkg/search/index",
      });
    },
  },
  // 页面周期函数--监听页面加载
  onLoad() {
    const sysInfo = uni.getSystemInfoSync();
    this.wh = sysInfo.windowHeight - 50;
    this.getCateList();
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  components: { MySearch },
};
</script>

<style scoped lang="scss">
.scroll-view-container {
  display: flex;
  .left-scroll-view {
    width: 120px;
    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;
      &.active {
        background-color: #ffffff;
        position: relative;
        &::before {
          content: " ";
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }

  .right-scroll-view-item {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    border: 15px 0;
    margin: 20px 0;
  }

  .cate-lv3 {
    display: flex;
    flex-wrap: wrap;
    .cate-lv3-item {
      width: 33.33%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      image {
        width: 60px;
        height: 60px;
      }
      text {
        font-size: 12px;
      }
    }
  }
}
</style>
