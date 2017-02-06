//左边导航栏功能实现
$(function () {
    (function (d) {
        d.leftSide = {};
        /**
         * 工厂函数，构造一个模态框
         * w为模态框的宽,h为模态框内部自定义内容区的高度
         */
        var modalWindow = function (w,h) {
            var modalWindow = $("<div><div class='modal_mask'></div><div class='modal_content'></div></div>"),
                content = modalWindow.find(".modal_content");
            modalWindow.widthConf = w || 400;
            modalWindow.heightConf = h || 200;
            modalWindow.css({"position":"fixed",
                    "width":d.size.width,
                    "height":d.size.height,
                    "display":"none"
                });
            //蒙版图
            modalWindow.find(".modal_mask").css({"position":"absolute",
                    "width":"100%",
                    "height":"100%",
                    "backgroundColor":"#000000",
                    "opacity":0.5
                });
            //内容
            content.css({"position":"absolute",
                "width":modalWindow.widthConf + "px",
                "height":modalWindow.heightConf + 100,
                "left":((d.size.width - modalWindow.widthConf)/ 2) + "px" ,
                "top":((d.size.height - modalWindow.heightConf - 100)/ 2) + "px",
                "backgroundColor":"#ffffff",
                "z-index":9
            });
            //头，关闭，中段内容，底部，脚内容
            var head = $("<div class='modal_head'><span class='model_close fa fa-close'></span></div>"),
                define = $("<div class='modal_define'></div>"),
                foot = $("<div class='modal_foot'></div>");
            head.css({"width":"100%",
                "height":"50px",
                "color":"#ffffff",
                "backgroundColor":"#3BAEB9",
                "padding":"16px 7px"
            });
            head.find(".model_close").css({
                "font-size":"20px",
                "float":"right",
                "cursor": "pointer"
            });
            define.css({
                "height":modalWindow.heightConf + "px",
            });
            foot.css({
                "width":"100%",
                "height":"50px",
                "backgroundColor":"#EAEAEA",
                "padding":"8px 7px"
            });
            var save = $('<button type="button" class="btn btn-primary">保存</button>');
            save.css({
                "float":"right",
                "cursor": "pointer"
            });
            content.append(head,define,foot);
            foot.append(save);

            return modalWindow;
        };
        //加工模态框，添加事件
        d.newModalWindow = function (w,h) {
            //addText为自定义内容函数
            var modal = Object.create(modalWindow(w,h),{
                addText: {
                    get: function() { return this.find(".modal_define"); },
                    set: function(text) {
                        this.addText.append(text);
                    }
                },
                addTitle: {
                    get: function() { return this.find(".modal_head"); },
                    set: function(title) {
                        this.addTitle.prepend(title);
                    }
                }
                }),
                content = modal.find(".modal_content"),
                close = modal.find(".model_close");
            $(window).resize(function () {
                //当可视宽高小于模态框时的操作
                var width =(d.size.width - modal.widthConf)/ 2,
                    height = (d.size.height - modal.heightConf - 100)/ 2;
                if (width < 0) {content.css("width",(d.size.width - 20) + "px");width = 10;
                } else {content.css("width",modal.widthConf + "px");}
                if (height < 0) {
                    var h =d.size.height - 120;
                    if (h < 20)
                        h =20;
                    content.css("height",h + 100 + "px");
                    modal.addText.css("height",h + "px");
                    height = 10;
                } else {
                    content.css("height",(modal.heightConf + 100) + "px");
                    modal.addText.css("height",(modal.heightConf) + "px");
                }
                modal.css({
                    "width":d.size.width,
                    "height":d.size.height
                });
                content.css({
                    "left": width + "px" ,
                    "top": height + "px"
                });
            });
            close.on("click",function () {
                modal.hide();
            });
            return modal;
        };
        //日历显示操作
        d.leftSide.calendar = function () {
            var C = Object.create(d.calendars.table()),
                Y = Object.create(d.calendars.yearList()),
                M = Object.create(d.calendars.monthList());
            $(C).addClass("table");
            $(Y).addClass("table-year form-control");
            $(M).addClass("table-month form-control");
            d.calendars.calendar(d.date.getFullYear(),d.date.getMonth(),C);
            //日历刷新时间
            $(Y).on("change",d.leftSide.calendarChange);
            $(M).on("change",d.leftSide.calendarChange);
            d.leftSide.calendarChange = function (e) {
                var year = $(Y).val(),
                    month = $(M).val();
                if ($(this).hasClass("table-left")){
                    if (--month<0){
                        month = 11;
                        year--;
                    }
                    $(Y).val(year);
                    $(M).val(month);
                }else if ($(this).hasClass("table-right")){
                    if (++month>11){
                        month = 0;
                        year++;
                    }
                    $(Y).val(year);
                    $(M).val(month);
                }
                d.calendars.calendar(year,month,C);
            }
            return {
                "calendar":C,
                "year":Y,
                "month":M
            };
        }
    })(window.dairo = window.dairo || {});

    //日历
    dairo.leftSide.var = dairo.leftSide.calendar();
    $(".calendar-show").append(dairo.leftSide.var.calendar);
    $(".table-left").after(dairo.leftSide.var.month,dairo.leftSide.var.year);
    $(".table-left,.table-right").on("click",dairo.leftSide.calendarChange);
    //回到当前的日期
    $(".table-today").on("click",function () {
        var tds = $(".calendar-show .table");
        var month = dairo.date.getMonth(),
            year = dairo.date.getFullYear();
        console.log(tds);
        dairo.calendars.calendar(year,month,tds);
        $(".table-year").val(year);
        $(".table-month").val(month);
    });

    //为弹出框添加内容
    //文件目录
    dairo.addModal = dairo.newModalWindow(375,325);
    dairo.addModal.addTitle="添加目录";
    dairo.addModal.addText = '<form role="form" id="addModal"><div><div class="form-group">目录名称: <input type="text" class="form-control addModal-text" name="addModalText"></div></div></form>';
    $("body").append(dairo.addModal);
    dairo.addModal.find(".modal_foot button").on("click",function () {
        var data = $("#addModal").serializeArray();
        var submit = $.ajax({
            method: "POST",
            url: "folder/write",
            data:data,
        }).done(function (data) {
            dairo.addModal.find(".model_close").trigger("click");
        });
    });
    $(".left-folder .plus-common").on("click",function () {
        dairo.addModal.show();
    });
    //标签
    dairo.addTag = dairo.newModalWindow(400,42);
    dairo.addTag.addTitle="添加标签";
    dairo.addTag.addText = '<form role="form" id="addTag"><div><div class="form-group">标签名称: <input type="text" class="form-control addTag-text" name="addTagText"></div></div></form>';
    $("body").append(dairo.addTag);
    dairo.addTag.find(".modal_foot button").on("click",function () {
        var data = $("#addTag").serializeArray();
        var submit = $.ajax({
            method: "POST",
            url: "tag/write",
            data:data,
        }).done(function (data) {
            dairo.addTag.find(".model_close").trigger("click");
        });
    });
    $(".left-tag .plus-common").on("click",function () {
        dairo.addTag.show();
    });
    //地址
    dairo.addLocation = dairo.newModalWindow();
    dairo.addLocation.addTitle="添加地址";
    dairo.addLocation.addText ='<form role="form" id="addLocation"><div><div class="form-group">地址名称: <input type="text" class="form-control addLocation-text" name="addLocationText"></div></div></form>';
    $("body").append(dairo.addLocation);
    dairo.addLocation.find(".modal_foot button").on("click",function () {
        var data = $("#addLocation").serializeArray();
        var submit = $.ajax({
            method: "POST",
            url: "location/write",
            data:data,
        }).done(function (data) {
            dairo.addLocation.find(".model_close").trigger("click");
        });
    });
    $(".left-location .plus-common").on("click",function () {
        dairo.addLocation.show();
    });

    //调节左侧菜单栏单项的显示与隐藏
    $(".text-common").on("click",function () {
        var ctrl = $(this).parent().parent().parent().next();
        ctrl.toggle();
        $(this).find("i").toggleTwoClass("fa-angle-right","fa-angle-down");
        dairo.scrolls();
    });
    $(".calendar-flex").on("click",function () {
        var ctrl = $(this).parent().next();
        ctrl.toggle();
        $(this).find("i").toggleTwoClass("fa-angle-right","fa-angle-down");
        dairo.scrolls();
    });
    //标签栏的选择
    $(".tag-content").on("click","div",function () {
       $(this).find("label").toggleTwoClass("left-unSelect","left-select");
    });
    //地址栏的选择
    $(".location-content").on("click","div",function () {
        $(this).find("label").toggleTwoClass("left-unSelect","left-select");
    });
});







