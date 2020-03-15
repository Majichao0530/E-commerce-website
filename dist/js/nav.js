// 处理首页的导航部分：顶部导航栏、侧边导航栏、轮播图
// 声明模块时需要遵从AMD规范

// 通过Ajax获取轮播图数据
define(["jquery"], function($) {
  function download() {
    $.ajax({
      type: "get",
      url: "../data/nav.json",
      success: function(result) {
        var bannerArr = result.banner;

        // 通过循环将数据添加到页面上
        for (var i = 0; i < bannerArr.length; i++) {
          $(`<a href="${bannerArr[i].url}">
            <img class = 'swiper-lazy swiper-lazy-loaded' src = '../images/banner/${bannerArr[i].img}' alt=""/>
        </a>`).appendTo("#J_homeSwiper .swiper-slide");

          // 每张图片都加入小圆点
          var node = $(`<a href="#" class = 'swiper-pagination-bullet'></a>`);
          if (i == 0) {
            node.addClass("swiper-pagination-bullet-active");
          }
          node.appendTo("#J_homeSwiper .swiper-pagination");
        }
      },
      error: function(msg) {
        console.log(msg);
      }
    });
  }

  // 实现轮播效果
  function banner() {
    var iNow = 0, // 记录显示图片的下标
      aImgs = null, // 记录图片
      aBtns = null; // 记录小圆点

    var timer = setInterval(function() {
      iNow++;
      tab();
    }, 2000);

    // 封装切换函数tab
    function tab() {
      if (!aImgs) {
        aImgs = $("#J_homeSwiper .swiper-slide").find("a");
      }
      if (!aBtns) {
        aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
      }
      if (iNow > 4) {
        // 控制轮播循环
        iNow = 0;
      }

      // 图片切换
      aImgs
        .hide()
        .css("opacity", 0.2)
        .eq(iNow)
        .show()
        .animate({ opacity: 1 }, 500);
      // 小圆点切换
      aBtns
        .removeClass("swiper-pagination-bullet-active")
        .eq(iNow)
        .addClass("swiper-pagination-bullet-active");
    }

    // 添加鼠标的移入和移出
    $("#J_homeSwiper, .swiper-button-prev, .swiper-button-next")
      .mouseenter(function() {
        clearInterval(timer);
      })
      .mouseleave(function() {
        timer = setInterval(function() {
          iNow++;
          tab();
        }, 2500);
      });

    // 点击小圆圈，可以实现对应图片跳转 【应用事件委托为异步操作节点添加事件】
    $("#J_homeSwiper .swiper-pagination").on("click", "a", function() {
      iNow = $(this).index();
      tab();
      return false; // 阻止小圆点a链接默认行为
    });

    // 点击左右按钮，向左右切换图片
    $(".swiper-button-prev, .swiper-button-next").click(function() {
      if (this.className == "swiper-button-prev") {
        iNow == 0 ? (iNow = 4) : iNow--;
      } else {
        iNow == 4 ? (iNow = 0) : iNow++;
      }
      tab();
    });
  }

  //  通过Ajax获取左侧导航栏数据
  function leftNavDownload() {
    $.ajax({
      type: "get",
      url: "../data/nav.json",
      success: function(result) {
        var sideArr = result.sideNav;
        for (var i = 0; i < sideArr.length; i++) {
          var node = $(`<li class = 'category-item'>
            <a href="/list.html" class = 'title'>
            ${sideArr[i].title}
                <em class = 'iconfont-arrow-right-big'></em>
            </a>
            <div class="children clearfix">
            </div>
        </li>`);
          node.appendTo("#J_categoryList");

          //  取出当前这个选项对应的子节点
          var childArr = sideArr[i].child;
          //  计算子节点列数
          var col = Math.ceil(childArr.length / 6);
          //  根据列数设置对应css类
          node.find("div.children").addClass("children-col-" + col);
          //  通过循环创建子选项每一个数据
          for (var j = 0; j < childArr.length; j++) {
            if (j % 6 == 0) {
              var newUl = $(
                `<ul class="children-list children-list-col children-list-col-${parseInt(
                  j / 6
                )}"></ul>`
              );
              newUl.appendTo(node.find("div.children"));
            }
            $(`<li>
              <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                  <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                  <span class="text">${childArr[j].title}</span>
              </a>
          </li>`).appendTo(newUl);
          }
        }
      },
      error: function(msg) {
        console.log(msg);
      }
    });
  }
  // 给侧边导航栏加入选项卡效果 【事件委托】
  function leftNavTab() {
    $("#J_categoryList").on("mouseenter", ".category-item", function() {
      $(this).addClass("category-item-active");
    });
    $("#J_categoryList").on("mouseleave", ".category-item", function() {
      $(this).removeClass("category-item-active");
    });
  }

  //  通过Ajax获取顶部导航栏数据
  function topNavDownload() {
    $.ajax({
      type: "get",
      url: "../data/nav.json",
      success: function(result) {
        var topNavArr = result.topNav;
        topNavArr.push({ title: "服务" }, { title: "社区" });
        for (var i = 0; i < topNavArr.length; i++) {
          $(`<li data-index="${i}" class="nav-item">
            <a href="javascript: void(0);" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476901.1" class="link" data-stat-id="69baf6920236bfcb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-69baf6920236bfcb', 'javascript:void0', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476901.1']);">
                <span class="text">${topNavArr[i].title}</span>
            </a>
        </li>`).appendTo(".site-header .header-nav .nav-list");

          var node = $(`<ul class = 'children-list clearfix' style = "display: ${
            i == 0 ? "block" : "none"
          }">
          </ul>`);
          node.appendTo("#J_navMenu .container");
          // 取出当前菜单的所有子菜单
          if (topNavArr[i].childs) {
            var childsArr = topNavArr[i].childs;
            for (var j = 0; j < childsArr.length; j++) {
              $(`<li>
            <a href="#">
                <div class = 'figure figure-thumb'>
                    <img src="${childsArr[j].img}" alt=""/>
                </div>
                <div class = 'title'>${childsArr[j].a}</div>
                <p class = 'price'>${childsArr[j].i}</p>
            </a>
        </li>`).appendTo(node);
            }
          }
        }
      },
      error: function(msg) {
        console.log(msg);
      }
    });
  }

  // 顶部导航栏添加移入移出效果
  function topNavTab() {
    $(".header-nav .nav-list").on("mouseenter", ".nav-item", function() {
      $(this).addClass("nav-item-active");
      // 找出鼠标移出菜单的下标
      var index = $(this).index() - 1;
      if (index >= 0 && index <= 6) {
        $("#J_navMenu")
          .css({ display: "block" })
          .removeClass("slide-up")
          .addClass("slide-down");
        $("#J_navMenu .container")
          .find("ul")
          .eq(index)
          .css("display", "block")
          .siblings("ul")
          .css("display", "none");
      } else {
        // 解决服务、社区显示菜单不消失问题
        $("#J_navMenu")
          .css({ display: "block" })
          .removeClass("slide-down")
          .addClass("slide-up");
      }
      // 解决浮动菜单消失问题
      $("#J_navMenu .container")
        .find("ul")
        .eq(index)
        .mouseenter(function() {
          $("#J_navMenu")
            .css({ display: "block" })
            .removeClass("slide-up")
            .addClass("slide-down");
        });
      $("#J_navMenu .container")
        .find("ul")
        .eq(index)
        .mouseleave(function() {
          $("#J_navMenu")
            .css({ display: "block" })
            .removeClass("slide-down")
            .addClass("slide-up");
        });
    });
    $(".header-nav .nav-list").on("mouseleave", ".nav-item", function() {
      $(this).removeClass("nav-item-active");
    });
    $(".header-nav").mouseleave(function() {
      $("#J_navMenu")
        .css({ display: "block" })
        .removeClass("slide-down")
        .addClass("slide-up");
    });
  }

  // 封装搜索框函数
  function searchTab() {
    $("#search")
      .focus(function() {
        $("#J_keywordList")
          .removeClass("hide")
          .addClass("show");
      })
      .blur(function() {
        $("#J_keywordList")
          .removeClass("show")
          .addClass("hide");
      });
  }

  // 侧边导航效果隐藏效果
  function allGoodsTab() {
    $(".header-nav .nav-list").on("mouseenter", ".nav-category", function() {
      $(this).addClass("nav-category-active");
      $(this)
        .find(".site-category")
        .css("display", "block");
      $("#J_navMenu")
        .css({ display: "block" })
        .removeClass("slide-down")
        .addClass("slide-up");
    });
    $(".header-nav .nav-list").on("mouseleave", ".nav-category", function() {
      $(this).removeClass("nav-category-active");
      $(this)
        .find(".site-category")
        .css("display", "none");
    });
  }

  return {
    download,
    banner,
    leftNavDownload,
    leftNavTab,
    topNavDownload,
    topNavTab,
    searchTab,
    allGoodsTab
  };
});
