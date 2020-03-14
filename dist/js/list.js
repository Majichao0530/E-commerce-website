// 引入列表页面需要引用的模块
require.config({
  paths: {
    jquery: "jquery-1.11.3",

    // 引入首页顶部和侧面导航栏js代码
    nav: "nav",
    goodsList: "goodsList"
  }
});

require(["nav", "goodsList"], function(nav, goodsList) {
  // 数据下载
  nav.topNavDownload();
  nav.leftNavDownload();
  goodsList.download();

  // 导航效果
  nav.topNavTab();
  nav.leftNavTab();
  nav.searchTab();
  nav.allGoodsTab();

  // 轮播图
  goodsList.banner();
});
