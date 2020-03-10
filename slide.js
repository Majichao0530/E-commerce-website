define(["jquery"], function($) {
  function download() {
    $.ajax({
      type: "get",
      url: "../data/slide.json",
      success: function(result) {
        var slideArr = result.data.list.list;
        for (var i = 0; i < slideArr.length; i++) {
          $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
            <a href="#" target = "_blank">
                <div class = 'content'>
                    <div class = 'thumb'>
                        <img width="160" height="160" src="${slideArr[i].pc_img}?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                    </div>
                    <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                    <p class = 'desc'>${slideArr[i].desc}</p>
                    <p class = 'price'>
                        <span>${slideArr[i].seckill_Price}</span>元
                        <del>${slideArr[i].goods_price}</del>
                    </p>
                </div>
            </a>
          </li>`).appendTo("#J_flashSaleList .swiper-wrapper");
        }
      },
      error: function(msg) {
        console.log(msg);
      }
    });
  }

  // 添加商品列表滚动效果
  function slideTab() {
    //   获取左右滚动按钮
    var aSpans = $(".swiper-controls").find("span");
    var iNow = 0; // 显示第一组图片数据，四个图片为一组
    var count = Math.ceil(26 / 4) - 1;

    // 设置自动滚动定时器
    var timer = setInterval(function() {
      iNow++;
      tab();
      if (iNow == count) {
        clearInterval(timer);
      }
    }, 2500);

    // 设置滚动方法
    function tab() {
      iNow == 0
        ? aSpans.eq(0).addClass("swiper-button-disabled")
        : aSpans.eq(0).removeClass("swiper-button-disabled");
      iNow == count
        ? aSpans.eq(1).addClass("swiper-button-disabled")
        : aSpans.eq(1).removeClass("swiper-button-disabled");

      // 计算要运动的目的宽度值
      var iTarget = iNow == count ? iNow * -992 + 496 : iNow * -992;
      $("#J_flashSaleList ul").css({
        transform: `translate3d(${iTarget}px, 0px, 0px)`,
        transitionDuration: "1000ms"
      });
    }

    // 点击按钮切换图片组
    aSpans.click(function() {
      if ($(this).index() == 0) {
        iNow--;
        iNow = Math.max(0, iNow);
      } else {
        iNow++;
        iNow = Math.min(iNow, count);
      }
      tab();
    });

    // 鼠标移入移出滚动效果
    $("#J_flashSaleList")
      .mouseenter(function() {
        clearInterval(timer);
      })
      .mouseleave(function() {
        if (iNow !== count) {
          timer = setInterval(function() {
            iNow++;
            tab();
            if (iNow == count) {
              clearInterval(timer);
            }
          }, 2500);
        }
      });

    aSpans
      .mouseenter(function() {
        clearInterval(timer);
      })
      .mouseleave(function() {
        if (iNow !== count) {
          timer = setInterval(function() {
            iNow++;
            tab();
            if (iNow == count) {
              clearInterval(timer);
            }
          }, 2500);
        }
      });
  }

  return {
    download,
    slideTab
  };
});
