/* 
    配置项目用到的模块
    AMD规范
    .js后缀可以省略
*/

require.config({
  paths: {
    jquery: "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    nav: "nav",
    slide: "slide",
    data: "data"
  },
  shim: {
    //   设置依赖关系
    "jquery-cookie": ["jquery"]
  }
});

require(["nav", "slide", "data"], function(nav, slide, data) {
  // 导航部分
  nav.download();
  nav.banner();
  nav.leftNavDownload();
  nav.leftNavTab();
  nav.topNavDownload();
  nav.topNavTab();
  nav.searchTab();

  // 商品列表部分
  slide.download();
  slide.slideTab();

  // 商品数据部分
  data.download();
  data.subListTab();
});
