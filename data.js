// 处理主页数据
define(["jquery"], function($) {
  // ajax数据下载
  function download() {
    $.ajax({
      type: "get",
      url: "../data/data.json",
      success: function(result) {
        var firstData = result[0];
        var node0 = $(`<div class = 'home-banner-box'>
        <a href="#">
            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1a2f39c9fe0804ace1d3707574c7c86f.jpg?thumb=1&w=1226&h=120&f=webp&q=90" alt=""/>
        </a>
    </div>
    <div class = "home-brick-box home-brick-row-2-box xm-plain-box">
        <div class = 'box-hd'>
            <h2 class = 'title'>${firstData.title}</h2>
            <div class = "more">
                <a href="#" class = 'more-link'>
                    查看全部
                    <i class = 'iconfont iconfont-arrow-right-big'></i>
                </a>
            </div>
        </div>
        <div class = 'hox-bd clearfix'>
            <div class = 'row'>
                <div class = 'span4'>
                    <ul class = 'brick-promo-list clearfix'>
                        <li class = 'brick-item brick-item-l'>
                            <a href="#">
                                <img src="${firstData.img}" alt=""/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class = 'span16'>
                    <ul class = 'brick-list clearfix'>
                    </ul>
                </div>
            </div>
        </div>
    </div>`);
        node0.appendTo(".page-main .container");

        // 通过循环加载子元素
        var childArr = firstData.childs;
        for (var i = 0; i < childArr.length; i++) {
          $(`<li class = 'brick-item brick-item-m brick-item-m-2'>
            <a href="#">
                <div class = 'figure figure-img'>
                    <img width="160" height="160" src="${
                      childArr[i].img
                    }" alt=""/>
                </div>
                <h3 class = 'title'>
                ${childArr[i].title}
                </h3>
                <p class = 'desc'>${childArr[i].desc}</p>
                <p class = 'price'>
                    <span class = 'num'>${
                      childArr[i].price
                    }</span>元<span>起</span>${
            childArr[i].del == 0 ? "" : "<del>" + childArr[i].del + "元</del>"
          }
                </p>
            </a>
        </li>`).appendTo(node0.find(".hox-bd .row .span16 ul"));
        }

        // 加载i=1及以后的数据
        for (var i = 1; i < result.length; i++) {
          var node1 = $(`<div class = 'home-banner-box'>
                        <a href="#">
                            <img src="${result[i].topImg}" alt=""/>
                        </a>
                    </div>
                    <div class = 'home-brick-box home-brick-row-2-box xm-plain-box'>
                        <div class = 'box-hd clearfix'>
                            <h2 class = 'title'>${result[i].title}</h2>
                            <div class = 'more'>
                                <ul class = 'tab-list'>
                                    <li class = 'tab-active'>
                                        热门
                                    </li>
                                    <li>
                                    ${result[i].subTitle}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class = 'box-bd'>
                            <div class = 'row'>
                                <div class = 'span4'>
                                    <ul class = 'brick-promo-list clearfix'>
                                        <li class = 'brick-item  brick-item-m'>
                                            <a href="#">
                                                <img src="${result[i].leftChilds[0]}" alt=""/>
                                            </a>
                                        </li>
                                        <li class = 'brick-item  brick-item-m'>
                                            <a href="#">
                                                <img src="${result[i].leftChilds[1]}" alt=""/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class = 'span16'>
                                    <ul class = "brick-list clearfix">
                                    </ul>
                                    <ul class = "brick-list clearfix hide">
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`);
          node1.appendTo(".page-main .container");

          //  加载热门商品数据
          var hotChildArr = result[i].hotChilds;
          var hotLength = hotChildArr.length;
          if (hotLength == 8) {
            for (j = 0; j < hotLength - 1; j++) {
              $(`<div>
                  <li class = 'brick-item brick-item-m brick-item-m-2'>
                      <a href="#">
                          <div class = 'figure figure-img'>
                              <img width="160" height="160" src="${
                                hotChildArr[j].img
                              }" alt=""/>
                          </div>
                          <h3 class = 'title'>${hotChildArr[j].title}</h3>
                          <p class = 'desc'>${hotChildArr[j].desc}</p>
                          <p class = 'price'>
                              <span class = 'num'>${
                                hotChildArr[j].price
                              }</span>元
                              ${
                                hotChildArr[j].del == 0
                                  ? ""
                                  : "<del><span class = 'num'>" +
                                    hotChildArr[j].del +
                                    "</span>元</del>"
                              }
                              <del>
                                  <span class = 'num'>2799</span>元
                              </del>
                          </p>
                      </a>
                  </li>
              </div>`).appendTo(node1.find(".box-bd .row .span16 ul").eq(0));
            }
            $(`<div>
                    <li class = 'brick-item brick-item-s'>
                        <a href="#">
                            <div class = 'figure figure-img'>
                                <img width="80" height="80" src="${
                                  hotChildArr[hotLength - 1].img
                                }" alt=""/>
                            </div>
                            <h3 class = 'title'>${
                              hotChildArr[hotLength - 1].title
                            }</h3>
                            <p class = 'price'>
                                <span class = 'num'>${
                                  hotChildArr[hotLength - 1].price
                                }</span>元
                                <span>起</span>
                            </p>
                        </a>
                    </li>
                    <li class = 'brick-item brick-item-s'>
                    <a href="#">
                        <div class = 'figure figure-more'>
                            <i class = 'iconfont iconfont-circle-arrow-right'></i>
                        </div>
                        <div class = 'more'>
                            浏览更多
                            <small>热门</small>
                        </div>
                    </a>
                    </li>
                </div>`).appendTo(node1.find(".box-bd .row .span16 ul").eq(0));
          } else {
            for (j = 0; j < hotLength; j++) {
              $(`<div>
                          <li class = 'brick-item brick-item-m brick-item-m-2'>
                              <a href="#">
                                  <div class = 'figure figure-img'>
                                      <img width="160" height="160" src="${
                                        hotChildArr[j].img
                                      }" alt=""/>
                                  </div>
                                  <h3 class = 'title'>${
                                    hotChildArr[j].title
                                  }</h3>
                                  <p class = 'desc'>${hotChildArr[j].desc}</p>
                                  <p class = 'price'>
                                      <span class = 'num'>${
                                        hotChildArr[j].price
                                      }</span>元
                                      ${
                                        hotChildArr[j].del == 0
                                          ? ""
                                          : "<del><span class = 'num'>" +
                                            hotChildArr[j].del +
                                            "</span>元</del>"
                                      }
                                      <del>
                                          <span class = 'num'>2799</span>元
                                      </del>
                                  </p>
                              </a>
                          </li>
                      </div>`).appendTo(
                node1.find(".box-bd .row .span16 ul").eq(0)
              );
            }
            $(`<div>
                            <li class = 'brick-item brick-item-s'>
                            <a href="#">
                                <div class = 'figure figure-more'>
                                    <i class = 'iconfont iconfont-circle-arrow-right'></i>
                                </div>
                                <div class = 'more'>
                                    浏览更多
                                    <small>热门</small>
                                </div>
                            </a>
                            </li>
                        </div>`).appendTo(
              node1.find(".box-bd .row .span16 ul").eq(0)
            );
          }

          //   加载副标题商品数据;
          var subChildArr = result[i].childs;
          var subLength = subChildArr.length;
          if (subLength == 8) {
            for (var k = 0; k < subLength - 1; k++) {
              $(`<div>
                <li class = 'brick-item brick-item-m brick-item-m-2'>
                    <a href="#">
                        <div class = 'figure figure-img'>
                            <img width="160" height="160" src="${
                              subChildArr[k].img
                            }" alt=""/>
                        </div>
                        <h3 class = 'title'>${subChildArr[k].title}</h3>
                        <p class = 'desc'>${subChildArr[k].desc}</p>
                        <p class = 'price'>
                            <span class = 'num'>${subChildArr[k].price}</span>元
                            ${
                              subChildArr[k].del == 0
                                ? ""
                                : "<del><span class = 'num'>" +
                                  subChildArr[k].del +
                                  "</span>元</del>"
                            }
                            <del>
                                <span class = 'num'>2799</span>元
                            </del>
                        </p>
                    </a>
                </li>
            </div>`).appendTo(node1.find(".box-bd .row .span16 ul").eq(1));
            }
            $(`<div>
              <li class = 'brick-item brick-item-s'>
                  <a href="#">
                      <div class = 'figure figure-img'>
                          <img width="80" height="80" src="${
                            subChildArr[subLength - 1].img
                          }" alt=""/>
                      </div>
                      <h3 class = 'title'>${
                        subChildArr[subLength - 1].title
                      }</h3>
                      <p class = 'price'>
                          <span class = 'num'>${
                            subChildArr[subLength - 1].price
                          }</span>元
                          <span>起</span>
                      </p>
                  </a>
              </li>
              <li class = 'brick-item brick-item-s'>
              <a href="#">
                  <div class = 'figure figure-more'>
                      <i class = 'iconfont iconfont-circle-arrow-right'></i>
                  </div>
                  <div class = 'more'>
                      浏览更多
                      <small>热门</small>
                  </div>
              </a>
              </li>
          </div>`).appendTo(node1.find(".box-bd .row .span16 ul").eq(1));
          } else {
            for (var k = 0; k < subLength; k++) {
              $(`<div>
                      <li class = 'brick-item brick-item-m brick-item-m-2'>
                          <a href="#">
                              <div class = 'figure figure-img'>
                                  <img width="160" height="160" src="${
                                    subChildArr[k].img
                                  }" alt=""/>
                              </div>
                              <h3 class = 'title'>${subChildArr[k].title}</h3>
                              <p class = 'desc'>${subChildArr[k].desc}</p>
                              <p class = 'price'>
                                  <span class = 'num'>${
                                    subChildArr[k].price
                                  }</span>元
                                  ${
                                    subChildArr[k].del == 0
                                      ? ""
                                      : "<del><span class = 'num'>" +
                                        subChildArr[k].del +
                                        "</span>元</del>"
                                  }
                                  <del>
                                      <span class = 'num'>2799</span>元
                                  </del>
                              </p>
                          </a>
                      </li>
                  </div>`).appendTo(
                node1.find(".box-bd .row .span16 ul").eq(1)
              );
            }
            $(`<div>
                    <li class = 'brick-item brick-item-s'>
                    <a href="#">
                        <div class = 'figure figure-more'>
                            <i class = 'iconfont iconfont-circle-arrow-right'></i>
                        </div>
                        <div class = 'more'>
                            浏览更多
                            <small>热门</small>
                        </div>
                    </a>
                    </li>
                </div>`).appendTo(node1.find(".box-bd .row .span16 ul").eq(1));
          }
        }
      },
      error: function(msg) {
        console.log(msg);
      }
    });
  }

  //   鼠标移入切换热门和副标题列表的实现
  function subListTab() {
    $(".page-main .container").on(
      "mouseenter",
      ".more .tab-list li",
      function() {
        $(this)
          .addClass("tab-active")
          .siblings("li")
          .removeClass("tab-active");

        // 切换商品列表list
        $(this)
          .closest(".home-brick-box")
          .find(".box-bd .span16 ul")
          .addClass("hide")
          .eq($(this).index())
          .removeClass("hide");
      }
    );
  }

  return {
    download,
    subListTab
  };
});
