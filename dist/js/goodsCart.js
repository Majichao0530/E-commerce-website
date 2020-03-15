define(["jquery", "jquery-cookie"], function($) {
  function download() {
    $.ajax({
      type: "get",
      url: "../data/goodsCarList.json",
      success: function(result) {
        var arr = result.data;
        for (var i = 0; i < arr.length; i++) {
          $(`<li class="J_xm-recommend-list span4">    
            <dl> 
                <dt> 
                    <a href="#"> 
                        <img src="${arr[i].image}" srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt="${arr[i].name}"> 
                    </a> 
                </dt> 
                <dd class="xm-recommend-name"> 
                    <a href="#"> ${arr[i].name}</a> 
                </dd> 
                <dd class="xm-recommend-price">${arr[i].price}元</dd> 
                <dd class="xm-recommend-tips">   ${arr[i].comments}人好评    
                    <a class="btn btn-small btn-line-primary J_xm-recommend-btn" href="#" style="display: none;" id = "${arr[i].goodsid}">加入购物车</a>  
                </dd> 
                <dd class="xm-recommend-notice">
                </dd> 
            </dl>  
                </li>`).appendTo("#J_miRecommendBox .xm-recommend .row");
        }
      },
      error: function(msg) {
        console.log(msg);
      }
    });
  }

  // 获得已经加入购物车商品的详细信息
  // 通过new Promise处理两次按照顺序加载数据
  function loadCarData() {
    // 清空之前的数据
    $("#J_cartListBody .J_cartGoods").html("");
    new Promise(function(reslove, reject) {
      $.ajax({
        type: "get",
        url: "../data/goodsCarList.json",
        success: function(obj) {
          reslove(obj.data);
        },
        error: function(msg) {
          reject(msg);
        }
      });
    }).then(function(arr1) {
      return new Promise(function(reslove, reject) {
        $.ajax({
          type: "get",
          url: "../data/goodsList2.json",
          success: function(arr2) {
            var newArr = arr1.concat(arr2);
            reslove(newArr);
          },
          error: function(msg) {
            reject(msg);
          }
        });
      }).then(function(arr) {
        // 取出已经加入购物车的商品的数据
        var cookieStr = $.cookie("goods");
        if (cookieStr) {
          $(".page-main .container .cart-empty").addClass("hide");
          var cookieArr = JSON.parse(cookieStr);
          var newArr = [];
          for (var i = 0; i < cookieArr.length; i++) {
            for (var j = 0; j < arr.length; j++) {
              if (
                cookieArr[i].id == arr[j].product_id ||
                cookieArr[i].id == arr[j].goodsid
              ) {
                arr[j].num = cookieArr[i].num;
                arr[j].id = arr[j].product_id
                  ? arr[j].product_id
                  : arr[j].goodsid;
                newArr.push(arr[j]);
              }
            }
          }
          for (var i = 0; i < newArr.length; i++) {
            var node = $(`<div class="item-row clearfix" id="${newArr[i].id}"> 
              <div class="col col-check">  
                  <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
              </div> 
              <div class="col col-img">  
                  <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                      <img alt="" src="${
                        newArr[i].image
                      }" width="80" height="80"> 
                  </a>  
              </div> 
              <div class="col col-name">  
                  <div class="tags">   
                  </div>     
                  <div class="tags">  
                  </div>   
                  <h3 class="name">  
                      <a href="//item.mi.com/${
                        newArr[i].id
                      }.html" target="_blank"> 
                      ${newArr[i].name} 
                      </a>  
                  </h3>        
              </div> 
              <div class="col col-price"> 
              ${newArr[i].price}元 
                  <p class="pre-info">  </p> 
              </div> 
              <div class="col col-num">  
                  <div class="change-goods-num clearfix J_changeGoodsNum"> 
                      <a href="javascript:void(0)" class="J_minus">
                          <i class="iconfont"></i>
                      </a> 
                      <input tyep="text" name="2192300031_0_buy" value="${
                        newArr[i].num
                      }" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                      <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                  </div>  
              </div> 
              <div class="col col-total"> 
              ${(newArr[i].price * newArr[i].num).toFixed(1)}元 
                  <p class="pre-info">  </p> 
              </div> 
              <div class="col col-action"> 
                  <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
              </div> 
          </div>`);
            node.appendTo("#J_cartListBody .J_cartGoods");
          }
          isCheckAll();
        } else {
          $(".page-main .container .cart-empty").removeClass("hide");
        }
      });
    });
  }

  // 页面下方商品鼠标移入移出实现【事件委托】
  function cartHover() {
    $("#J_miRecommendBox .xm-recommend .row").on(
      "mouseenter",
      ".J_xm-recommend-list",
      function() {
        $(this)
          .find(".xm-recommend-tips a")
          .css("display", "block");
      }
    );
    $("#J_miRecommendBox .xm-recommend .row").on(
      "mouseleave",
      ".J_xm-recommend-list",
      function() {
        $(this)
          .find(".xm-recommend-tips a")
          .css("display", "none");
      }
    );

    // 页面下方商品点击加入购物车实现【事件委托】
    $("#J_miRecommendBox .xm-recommend .row").on(
      "click",
      ".xm-recommend-tips a",
      function() {
        var id = this.id;
        var first = $.cookie("goods") == null ? true : false;
        if (first) {
          var cookieArr = [{ id: id, num: 1 }];
          $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
          });
        } else {
          var same = false;
          var cookieStr = $.cookie("goods");
          var cookieArr = JSON.parse(cookieStr);
          for (var i = 0; i < cookieArr.length; i++) {
            if (cookieArr[i].id == id) {
              cookieArr[i].num++;
              same = true;
              break;
            }
          }
          if (!same) {
            var obj = { id: id, num: 1 };
            cookieArr.push(obj);
          }
          $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
          });
        }
        isCheckAll();
        loadCarData();
        return false;
      }
    );
  }

  // 全选和单选按钮实现
  function checkFunc() {
    // 全选
    $("#J_cartBox .list-head .col-check")
      .find("i")
      .click(function() {
        // 获取每个商品的单选框
        var allChecks = $(
          "#J_cartListBody .J_cartGoods .item-row .col-check"
        ).find("i");
        if ($(this).hasClass("icon-checkbox-selected")) {
          $(this)
            .add(allChecks)
            .removeClass("icon-checkbox-selected");
        } else {
          $(this)
            .add(allChecks)
            .addClass("icon-checkbox-selected");
        }
        isCheckAll();
        return false;
      });

    // 单选
    $("#J_cartListBody .J_cartGoods").on(
      "click",
      ".item-row .col-check i",
      function() {
        if ($(this).hasClass("icon-checkbox-selected")) {
          $(this).removeClass("icon-checkbox-selected");
        } else {
          $(this).addClass("icon-checkbox-selected");
        }
        isCheckAll();
        return false;
      }
    );
  }

  // 判断有多少个商品被选中
  function isCheckAll() {
    var allChecks = $("#J_cartListBody").find(".item-row");
    var isAll = true;
    var count = 0; // 所有被选中商品的数量
    var total = 0; // 所有选中商品的总价
    var totalcount = 0; //所有商品的数量（包括没选中的）
    allChecks.each(function(index, item) {
      if (
        !$(this)
          .find(".col-check i")
          .hasClass("icon-checkbox-selected")
      ) {
        isAll = false;
      } else {
        count += parseInt(
          $(item)
            .find(".col-num input")
            .val()
        );
        total +=
          parseFloat(
            $(item)
              .find(".col-price")
              .html()
              .trim()
          ) *
          parseFloat(
            $(item)
              .find(".col-num input")
              .val()
          );
      }
      totalcount += parseInt(
        $(item)
          .find(".col-num input")
          .val()
      );
    });
    // 赋值
    $("#J_cartTotalNum").html(totalcount);
    $("#J_selTotalNum").html(count);
    $("#J_cartTotalPrice").html(total);
    // 判断是否全选
    if (isAll) {
      $("#J_cartBox .list-head .col-check")
        .find("i")
        .addClass("icon-checkbox-selected");
    } else {
      $("#J_cartBox .list-head .col-check")
        .find("i")
        .removeClass("icon-checkbox-selected");
    }
  }

  // 增减商品数量和删除商品实现
  function changeCars() {
    // 给每一个删除按钮添加事件【事件委托】
    $("#J_cartListBody .J_cartGoods").on(
      "click",
      ".col-action .J_delGoods",
      function() {
        var id = $(this)
          .closest(".item-row")
          .remove()
          .attr("id");
        var cookieStr = $.cookie("goods");
        var cookieArr = JSON.parse(cookieStr);
        for (var i = 0; i < cookieArr.length; i++) {
          if (cookieArr[i].id == id) {
            cookieArr.splice(i, 1);
            break;
          }
        }
        cookieArr.length == 0
          ? $.cookie("goods", null)
          : $.cookie("goods", JSON.stringify(cookieArr), {
              expires: 7
            });
        isCheckAll();
        loadCarData();
        return false;
      }
    );
    //增减数量实现【事件委托】
    $("#J_cartListBody .J_cartGoods").on(
      "click",
      ".J_plus,.J_minus",
      function() {
        // 取出点击商品id
        var id = $(this)
          .closest(".item-row")
          .attr("id");
        var cookieStr = $.cookie("goods");
        var cookieArr = JSON.parse(cookieStr);
        for (var i = 0; i < cookieArr.length; i++) {
          if (cookieArr[i].id == id) {
            if (this.className == "J_minus") {
              cookieArr[i].num == 1
                ? alert("商品数量已经为1，若想删除商品请点击删除按钮")
                : cookieArr[i].num--;
            } else {
              cookieArr[i].num++;
            }
            break;
          }
        }
        // 更新页面数量
        $(this)
          .siblings("input")
          .val(cookieArr[i].num);
        var price = parseFloat(
          $(this)
            .closest(".col-num")
            .siblings(".col-price")
            .html()
            .trim()
        );
        $(this)
          .closest(".col-num")
          .siblings(".col-total")
          .html((price * cookieArr[i].num).toFixed(1) + "元");
        // 保存至cookie
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7
        });
        // 重新赋值价格和数量
        isCheckAll();
        return false;
      }
    );
  }

  return {
    download,
    cartHover,
    loadCarData,
    checkFunc,
    changeCars
  };
});
