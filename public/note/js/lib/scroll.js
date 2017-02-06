$(function () {
    (function (d) {
        //滚动条样式函数
        d.scrolls = function () {
            d.scroll = d.scroll || $("<div class='scroll-left'><div class='scroll-block'></div></div>");
              d.scroll.block = d.scroll.find(".scroll-block");
            var H = document.documentElement.clientHeight - 59,
                TH = $(".layout-left").height(),
                K = H / TH;
            d.scroll.height(H+"px");
            if (K<1){
                //得出滚动条与内容的传动比
                var blockHeight = K*H;
                d.scroll.block.height(blockHeight+"px");
                d.scroll.LK =(TH-H)/(H-blockHeight);
                //解决下拉bug
                var top =59 -$(".layout-left").css("top").replace("px","");
                (top > (TH -H)) ? $(".layout-left").css("top", (H - TH + 59)) : d.scroll.block.css("marginTop",(top/d.scroll.LK)+"px");
            } else {
                d.scroll.block.css("marginTop","0px");
                d.scroll.block.height(H+"px");
                $(".layout-left").css("top","59px");
                d.scroll.LK =0;
            }
            //外部使用
            d.scroll.distance = (H - blockHeight > 0 && H - blockHeight) || 0;
        }

        //传入滚动块的margin-top
        d.roll = function (blockMargin) {
            d.scroll.block.css("marginTop",blockMargin+"px");
            var scrollTop = 0 || blockMargin;
            var leftMove = 59 - scrollTop*d.scroll.LK;
            return leftMove+"px";
        }
    })(window.dairo = window.dairo || {});

    //初始化
    dairo.scrolls();
    $(".scroll-module").prepend(dairo.scroll).hide();
    $(".layout-left").css("top",dairo.roll());

    //绑定事件,滚轮事件
    $(".layout-left").on("mousewheel DOMMouseScroll",function (e) {
        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||
            (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
        var blockMargin =new Number(dairo.scroll.block.css("marginTop").replace("px",""));
        if (delta > 0) {
            var move = (blockMargin - 75 > 0 && blockMargin - 75) || 0;
        } else if (delta < 0) {
            var move = (blockMargin + 75 < dairo.scroll.distance && blockMargin + 75) || dairo.scroll.distance;
        }
        $(".layout-left").css("top",dairo.roll(move));
    });
    //悬停事件
    $(".layout-left,.scroll-module").hover(function () {
        $(".scroll-module").show();
    },function () {
        $(".scroll-module").hide();
    });
    //拖动事件
    dairo.scroll.block.mousedown(function (e) {
        var start = e.pageY;
        var blockMargin = new Number(dairo.scroll.block.css("marginTop").replace("px",""));
        $(window).mousemove(function (e) {
            var move = e.pageY - start+blockMargin;
            move < 0 ? move = 0 : move;
            move > dairo.scroll.distance ? move = dairo.scroll.distance : move;
            $(".layout-left").css("top",dairo.roll(move));
        });
    });
    $(window).mouseup(function (e) {
       $(window).off("mousemove");
    });
    //窗口变化
    $(window).resize(function () {
        dairo.scrolls();
    });
});
