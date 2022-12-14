import Vue from "vue";
import App from "./App";
import store from "./store/index";

import { $http } from "@escook/request-miniprogram";

uni.$http = $http;

$http.baseUrl = "https://api-hmugo-web.itheima.net";

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: "数据加载中...",
  });
  if (options.url.indexOf("/my/") !== -1) {
    options.header = {
      Authorization: store.state.m_user.token,
    };
  }
};

// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading();
};

uni.$showMsg = function (title = "数据请求失败", duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: "none",
  });
};

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
  store,
});
app.$mount();
