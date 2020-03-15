define(["jquery", "jquery.cookie"], function($) {
  // 封装获取当前商品的product_id函数
  function valueByName(search, name) {
    // 查找键值对开始和结束的位置
    var start = search.indexOf(name + "=");
    if (start == -1) {
      return null;
    } else {
      var end = search.indexOf("&", start);
      if (end == -1) {
        end = search.length;
      }
      // 提取键值对
      var str = search.substring(start, end);
      var arr = str.split("=");
      return arr[1];
    }
  }

  // 获取当前商品详情的数据
  function download() {
    //  获取当前商品的product_id
    var product_id = valueByName(location.search, "product_id");
    //  获取当前id的详细数据
    $.ajax({
      type: "get",
      url: "../data/goodsList.json",
      success: function(arr) {
        var goodMsg = arr.find(item => item.product_id == product_id);
        var node = $(` <!-- 导航 -->
        <div id = 'J_proHeader' data-name="${goodMsg.name}">
            <div class = 'xm-product-box'>
                <div id = 'J_headNav' class = 'nav-bar'>
                    <div class = 'container J_navSwitch'>
                        <h2 class = 'J_proName'>${goodMsg.name}</h2>
                        <div class = 'con'>
                            <div class = 'left'>
                                <span class = 'separator'>|</span>
                                <a href="#">${goodMsg.title}</a>
                            </div>
                            <div class = 'right'>
                                <a href="#">概述</a>
                                <span class = 'separator'>|</span>
                                <a href="#">参数</a>
                                <span class = 'separator'>|</span>
                                <a href="#">F码通道</a>
                                <span class = 'separator'>|</span>
                                <a href="#">用户评价</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品详情数据展示 -->
        <div class = 'xm-buyBox' id = 'J_buyBox'>
            <div class = 'box clearfix'>
                <!-- 商品数据 -->
                <div class = 'pro-choose-main container clearfix'>
                    <div class = 'pro-view span10'>
                        <!-- img-con fix 设置图片浮动 -->
                        <div id = 'J_img' class = 'img-con' style = 'left: 338px; margin: 0px;'>
                            <div class = 'ui-wrapper' style="max-width: 100%;">
                                <!-- 图片 -->
                                <div class = 'ui-viewport' style="width: 100%; overflow: hidden; position: relative; height: 560px;">
                                    <div id = 'J_sliderView' class = 'sliderWrap' style = 'width: auto; position: relative;'>

                                    </div>
                                </div>
                                <!-- 显示第几张图片的下标 -->
                                <div class = 'ui-controls ui-has-pager ui-has-controls-direction'>
                                    <div class = 'ui-pager ui-default-pager'>
                                        
                                    </div>
                                    <div class = 'ui-controls-direction'>
                                        <a class="ui-prev" href="">上一张</a>
                                        <a class="ui-next" href="">下一张</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class = 'pro-info span10'>
                        <!-- 标题 -->
                        <h1 class = 'pro-title J_proName'>
                            <span class = 'img'></span>
                            <span class = 'name'>${goodMsg.name}</span>
                        </h1>
                        <!-- 提示 -->
                        <p class = 'sale-desc' id = 'J_desc'>
                            ${goodMsg.product_desc_ext}
                        </p>
                        <div class = 'loading J_load hide'>
                            <div class = 'loader'></div>
                        </div>
                        <!-- 主体 -->
                        <div class = 'J_main'>
                            <!-- 经营主题 -->
                            <p class = 'aftersale-company' id = 'J_aftersaleCompany' type = '1' desc = 'null'>小米自营</p>
                            <!-- 价格 -->
                            <div class = 'pro-price J_proPrice'>
                                <span class = 'price'>
                                    ${goodMsg.price_max}元
                                    <del>${goodMsg.market_price_max}元</del>
                                </span>
                                <span class="seckill-notic hide"><em></em><i></i><span><span></span></span></span>
                            </div>
                            <!-- 常态秒杀倒计时 -->
                            <div class = 'pro-time J_proSeckill'>
                                <div class="pro-time-head">
                                    <em class="seckill-icon"></em> 
                                    <i>秒杀</i>
                                    <span class="time J_seckillTime">距结束 03 时 24 分 46 秒</span>
                               </div>
                                <div class = 'pro-time-con'>
                                    <span class = 'pro-time-price'>
                                        ￥
                                        <em class = 'J_seckillPrice'>${goodMsg.price_min}</em>
                                        <del>
                                            ￥
                                            <em class = 'J_seckillPriceDel'>${goodMsg.market_price_min}</em>
                                        </del>
                                    </span>
                                </div>
                            </div>
                                <!-- 已经选择产品 -->
                                <div class = 'pro-list' id = 'J_proList'>
                                    <ul>
                                        <li>${goodMsg.name} ${goodMsg.value}  
                                            <del>${goodMsg.market_price_min}元</del>  
                                            <span>  ${goodMsg.price_min} 元 </span> 
                                        </li>
                                        <li class="totlePrice" data-name="seckill">   
                                            秒杀价   ：${goodMsg.price_min}元  
                                        </li>
                                    </ul>
                                </div>
                                <!-- 购买按钮 -->
                                <ul class="btn-wrap clearfix" id="J_buyBtnBox">     
                                    <li>  
                                        <a href="#" class="btn btn-primary btn-biglarge J_login" id = "${goodMsg.product_id}">加入购物车</a>  
                                    </li>   
                                    <li>  
                                        <a href="goodsCar.html" class="btn-gray btn-like btn-biglarge"> 
                                            <i class="iconfont default"></i>查看购物车 
                                        </a>  
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`);
        node.insertAfter("#app div .header");

        //  商品详情页图片轮播图实现
        var aImages = goodMsg.images;
        //  判断图片数量是否多于1张
        if (aImages.length == 1) {
          $(`<img class = 'slider done' 
            src="${aImages[0]}" 
            style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: block;" 
            alt=""/>`).appendTo(node.find("#J_sliderView"));
          //  隐藏左右切换图片的按钮
          $(".ui-controls").hide();
        } else {
          for (var i = 0; i < aImages.length; i++) {
            // 当前显示第几张图片的按钮实现
            $(`<div class = 'ui-pager-item'>
              <a href="#" data-slide-index = "0" class = 'ui-pager-link ${
                i == 0 ? "active" : ""
              }'>1</a>
                </div>`).appendTo(node.find(".ui-pager"));
            // 创建图片
            $(`<img class = 'slider done' 
            src="${aImages[i]}" 
            style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: ${
              i == 0 ? "block" : "none"
            };" 
            alt=""/>`).appendTo(node.find("#J_sliderView"));
          }
        }
      },
      error: function(msg) {
        console.log(msg);
      }
    });
  }

  //  实现图片轮播
  function banner() {
    var iNow = 0;
    var timer = null;
    var aBtns = null; // 获取按钮
    var aImgs = null; // 获取图片

    // 定时器自动切换图片
    timer = setInterval(function() {
      iNow++;
      tab();
    }, 3000);

    // 鼠标移入移出效果实现
    $("#app div").on("mouseenter", "#J_sliderView,.ui-controls", function() {
      clearInterval(timer);
    });
    $("#app div").on("mouseleave", "#J_sliderView,.ui-controls", function() {
      timer = setInterval(function() {
        iNow++;
        tab();
      }, 3000);
    });

    // 点击按钮切换图片的实现【事件委托】
    $("#app div").on(
      "click",
      ".ui-controls .ui-pager .ui-pager-item a",
      function() {
        iNow = $(this)
          .parent()
          .index();
        tab();
        return false;
      }
    );

    // 左右按钮切换图片
    $("#app div").on("click", ".ui-prev,.ui-next", function() {
      if (this.className == "ui-prev") {
        iNow--;
        if (iNow == -1) {
          iNow = 4;
        }
      } else {
        iNow++;
      }
      tab();
      return false;
    });

    // 封装切换图片的方法
    function tab() {
      if (!aImgs) {
        aImgs = $("#J_img").find("img");
      }
      if (!aBtns) {
        aBtns = $("#J_img").find(".ui-controls .ui-pager .ui-pager-item a");
      }
      if (aImgs.size() == 1) {
        clearInterval(timer);
      } else {
        if (iNow == aBtns.size()) {
          iNow = 0;
        }
        aBtns
          .removeClass("active")
          .eq(iNow)
          .addClass("active");
        aImgs
          .hide()
          .eq(iNow)
          .show();
      }
    }

    // 加入购物车按钮实现
    $("#app div").on("click", ".J_login", function() {
      //  获取当前加入购物车的商品ID
      var id = this.id;
      //  使用cookie储存：商品ID，商品数量【最大储存4kb，只能存储字符串】
      //  [{id:1,num1},{id:2,num2}]转成json格式字符串储存在cookie

      //  判断是否为第一次添加
      var first = $.cookie("goods") == null ? true : false;
      //  是第一次添加
      if (first) {
        // 创建cookie并添加
        var cookieArr = [{ id: id, num: 1 }];
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7
        });
      } else {
        // 判断是否添加过此商品
        var same = false; // 假设没有添加过
        var cookieStr = $.cookie("goods");
        var cookieArr = JSON.parse(cookieStr);
        for (var i = 0; i < cookieArr.length; i++) {
          if (cookieArr[i].id == id) {
            // 添加过该商品
            cookieArr[i].num++;
            same = true;
            break;
          }
        }
        if (!same) {
          //  没有添加过该商品，新增该商品
          var obj = { id: id, num: 1 };
          cookieArr.push(obj);
        }
        // 新cookie数据保存
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7
        });
      }
      alert($.cookie("goods"));
      return false;
    });
  }

  return {
    download,
    banner
  };
});
