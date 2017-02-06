$(function () {
    (function (lib) {
        //ob是高度不变的,hObj是高度变化的
        lib.scroll = function (obj,hObj) {
            //构造函数
            var Scroll = function () {
                //外层高度
                this.height = 0;
                //内层元素高度
                this.totalHeight = 0;
                //添加滚动条外层对象
                this.obj = obj;
                //添加滚动条内层操作对象
                this.hObj = hObj;
                //滑块高度
                this.blockHeight = 0;
                //传动比
                this.LK = 0;
                //移动距离
                this.move = 0;
                this.box = $("<div class='scroll-left'><div class='scroll-block'></div></div>");
            };
            //方法函数
            Scroll.prototype.block = function () {return this.box.find(".scroll-block");};
            //滚动条初始样式
            Scroll.prototype.style = function () {
                this.height = this.obj.height();
                this.totalHeight = this.hObj.height();
                var block = this.block(),box = this.box,
                    TH = this.totalHeight,H = this.height,
                    K = H / TH;
                var blockHeight;
                box.height(H+"px");
                if (K<1){
                    //得出滚动条与内容的传动比
                    blockHeight = K*H;
                    block.height(blockHeight+"px");
                    this.LK =(TH-H)/(H-blockHeight);

                    //是否显示滚动条
                    this.obj.hover(function () {
                        box.show();
                    },function () {
                        box.hide();
                    });
                } else {
                    blockHeight = H;
                    block.css("marginTop","0px");
                    block.height(blockHeight+"px");
                    this.LK =0;

                    this.obj.off("mouseenter");this.obj.off("mouseleave");
                    this.box.off("mouseenter");this.box.off("mouseleave");
                    box.hide();
                    this.block().css("marginTop","0px");
                }

                this.blockHeight = blockHeight;
            };
            Scroll.prototype.event = function () {
                var $this = this;
                var block = $this.block(),hObj = $this.hObj;
                //绑定事件,滚轮事件
                this.obj.on("mousewheel DOMMouseScroll",function (e) {
                    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||
                        (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
                    var blockMargin =parseInt(block.css("marginTop").replace("px",""));
                    delta > 0 ? $this.move-= $this.blockHeight : $this.move+= $this.blockHeight;
                    //解决上溢出
                    if ($this.move < 0)
                        $this.move = 0;
                    //解决下溢出
                    if ($this.move + $this.blockHeight > $this.height)
                        $this.move = $this.height - $this.blockHeight;
                    //得到内容移动高度
                    var lkMove =  -1*$this.move*$this.LK;
                    block.clearQueue();
                    block.animate({marginTop: $this.move
                    },400,'linear');
                    hObj.clearQueue();
                    hObj.animate({marginTop: lkMove
                    },400,'linear');
                });


                //拖动事件
                block.mousedown(function (e) {
                    var start = e.pageY;
                    var blockMargin = parseInt($(this).css("marginTop").replace("px",""));
                    $(window).on("mousemove.scroll",function (e) {
                        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

                        $this.move = e.pageY - start+blockMargin;
                        $this.move < 0 ? $this.move = 0 : $this.move;
                        if ($this.move + $this.blockHeight > $this.height)
                            $this.move = $this.height - $this.blockHeight;
                        var lkMove =  -1*$this.move*$this.LK;
                        block.css("marginTop",$this.move+"px");
                        hObj.css("marginTop",lkMove+"px");
                    });
                    $(window).mouseup(function (e) {
                        $(window).off("mousemove.scroll");
                    });
                });
            };
            //窗口变化尺寸改变
            Scroll.prototype.resize = function () {
                this.style();
            };
            //初始化
            Scroll.prototype.initialization = function () {
                this.style();
                this.event();
            };

            return new Scroll();
        };

        //用法示例,另外对应尺寸变化方法为resize,凡是有尺寸变化的地方都要加上
        // var ctrl = chat.index.chat.find(".chat-content-tab-ctrl"),
        //     hObj =chat.index.reader;
        // chat.scroll.reader = lib.scroll(ctrl,hObj);
        // chat.scroll.reader.initialization();
        // chat.index.chat.find(".chat-content-tab").after(chat.scroll.reader.box.addClass("chat-content-reader-scroll"));

    })(window.lib = window.lib || {});
});