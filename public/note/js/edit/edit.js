//编辑页面功能实现
$(function () {
    (function (d) {
        //点击日历部分
        d.edit.calendar = function () {
            var C = Object.create(d.calendars.table()),
                Y = Object.create(d.calendars.yearList()),
                M = Object.create(d.calendars.monthList()),
                T = Object.create(d.calendars.time()),
                PH = Object.create(d.calendars.progressBar());
                PM = Object.create(d.calendars.progressBar());
            $(Y).addClass("edit-year");
            $(M).addClass("edit-month");
            $(PH).find(".dairo-calendars-label").html("小时");
            $(PM).find(".dairo-calendars-label").html("分钟");
            $(PH).find(".dairo-calendars-block").addClass("dairo-block-hour");
            $(PM).find(".dairo-calendars-block").addClass("dairo-block-minute");
            var right = $("<span class='fa fa-caret-right fa-lg'></span>"),
                left = $('<span class="fa fa-caret-left fa-lg"></span>');
            d.calendars.calendar(d.date.getFullYear(),d.date.getMonth(),C);
            var b = $("<div></div>").append(T,PH,PM).css({
                "font-size":"13px",
                "color":"#646464",
                "backgroundColor":"#C8C8C8"
            });
            var c = $("<div class='dairo-edit-calendars'></div>").append(C,b);
            var r = $("<div class='edit-box'></div>").append(left,M,Y,right);
            c.prepend(r);
            c.find("td").addClass("dairo-edit-td");
            //外部时间改变和显示
            var timeShow = (function () {
                var s = $("<span class='dairo-calendars-time-show'></span>"),
                    m = new Number(c.find("select").eq(0).val()),
                    y = c.find("select").eq(1).val(),
                    t = d.date.getDate(),
                    f = d.date.getMinutes(),
                    x = d.date.getHours(),
                    hourCorrect = d.calendars.hourCorrect(x),
                    minuteCorrect = d.calendars.minuteCorrect(f);
                var minute = $("<span class='dairo-calendars-time-minute'>"+minuteCorrect+"</span>"),
                    hour = $("<span class='dairo-calendars-time-hour'>"+hourCorrect.hour+":</span>"),
                    period = $("<span class='dairo-calendars-time-period'>"+hourCorrect.period+"</span>"),
                    day = $("<span class='dairo-calendars-time-day'>"+t+"</span>"),
                    week = $("<span class='dairo-calendars-time-week'>"+d.calendars.getWeek(y,m,t)+"，</span>"),
                    month = $("<span class='dairo-calendars-time-month'>"+d.calendars.monthCorrect(m)+"月</span>"),
                    year = $("<span class='dairo-calendars-time-year'>"+y+"</span>");
                s.append(week,year,month,day,period,hour,minute);
                s.find(".dairo-calendars-time-month,.dairo-calendars-time-period").css("padding","0 5px");
                return s;
            })();
            //样式设置
            c.css({
                "left":"35%",
                "position":"absolute",
                "border":"1px solid #C8BFB9",
                "width":"200px",
                "z-index":999
            });
            c.find("table").css({
               "width":"200px",
                "text-align":"center"
            });
            c.find("thead").css("backgroundColor","#C8C8C8");
            c.find("th").css({
                "font-size":"12px",
                "padding":"3px"
            });
            c.find("td").css({
               "padding":"3px",
                "font-size":"14px"
            });
            c.find(".dairo-calendar-lastMonth").css({"color":"#8D8D8D",
                "backgroundColor":"#F4F4F4"});
            c.find(".dairo-calendar-theMonth").css({"color":"#646464",
                "backgroundColor":"#EBEBEB"});
            c.find(".dairo-calendar-nextMonth").css({"color":"#8D8D8D",
                "backgroundColor":"#F4F4F4"});
            c.find(".edit-box").css({
                "height":"27px",
                "padding":"0 15px",
                "backgroundColor":"#EBEBEB"
            });
            c.find("select").css({
                "borderStyle":"none",
                "font-size":"12px",
                "height":"25px",
                "width":"60px",
                "margin":"0 7px",
                "backgroundColor":"#EBEBEB"
            });
            //日历下方时间条
            c.find(".dairo-calendars-time").css("padding","6px 8px");
            c.find(".dairo-calendars-hour").css("margin-left","30px");
            c.find(".dairo-calendars-period").css("margin-left","10px");
            c.find(".dairo-calendars-progressBar").css("padding","6px 8px");
            //日历刷新时间
            c.find(".fa-caret-left,.fa-caret-right").on("click",calendarChange);
            c.find(".edit-year,.edit-month").on("change",calendarChange);
            function calendarChange(e) {
                var outTime = function (month,year,week) {
                    timeShow.find(".dairo-calendars-time-week").html(week+"，");
                    timeShow.find(".dairo-calendars-time-month").html(d.calendars.monthCorrect(month)+"月");
                    timeShow.find(".dairo-calendars-time-year").html(year);
                };
                var year = c.find(".edit-year").val(),
                    month = c.find(".edit-month").val(),
                    day = timeShow.find(".dairo-calendars-time-day").text();
                if (day.slice(0,1) == 0) {
                    day = day.slice(1,2);
                }
                if ($(this).hasClass("fa-caret-left")){
                    if (--month<0){
                        month = 11;
                        year--;
                    }
                    c.find(".edit-year").val(year);
                    c.find(".edit-month").val(month);
                }else if ($(this).hasClass("fa-caret-right")){
                    if (++month>11){
                        month = 0;
                        year++;
                    }
                    c.find(".edit-year").val(year);
                    c.find(".edit-month").val(month);
                }
                var week = d.calendars.getWeek(year,month,day);
                outTime(month,year,week);
                d.calendars.calendar(year,month,C);
                c.find(".dairo-calendar-lastMonth").css({"color":"#8D8D8D",
                    "backgroundColor":"#F4F4F4"});
                c.find(".dairo-calendar-theMonth").css({"color":"#646464",
                    "backgroundColor":"#EBEBEB"});
                c.find(".dairo-calendar-nextMonth").css({"color":"#8D8D8D",
                    "backgroundColor":"#F4F4F4"});
                c.find("td").addClass("dairo-edit-td");
            }
            //时间条
            c.find(".dairo-block-hour").mousedown(function (e) {
                var start = e.pageX;
                var bar = new Number($(this).css("left").replace("px",""));
                var $this = this;
                $(window).mousemove(function (e) {
                    var distance = e.pageX - start + bar;
                    if (distance < 60)
                        distance = 60;
                    if (distance > 175)
                        distance = 175;
                    if (distance % 5 == 0) {
                        $this.style.left = distance + "px";
                        var num = (distance - 60) / 5;
                        var hourCorrect = d.calendars.hourCorrect(num);
                        c.find(".dairo-calendars-hour").html(hourCorrect.hour);
                        c.find(".dairo-calendars-period").html(hourCorrect.period);
                        //时间显示部分
                        timeShow.find(".dairo-calendars-time-hour").html(hourCorrect.hour+":");
                        timeShow.find(".dairo-calendars-time-period").html(hourCorrect.period);
                    }
                });
            });
            c.find(".dairo-block-minute").mousedown(function (e) {
                var start = e.pageX;
                var bar = new Number($(this).css("left").replace("px",""));
                var $this = this;
                $(window).mousemove(function (e) {
                    var distance = e.pageX - start + bar;
                    if (distance < 60)
                        distance = 60;
                    if (distance > 178)
                        distance = 178;
                    if (distance % 2 == 0) {
                        $this.style.left = distance + "px";
                        var num = (distance - 60) / 2;
                        var minuteCorrect = d.calendars.minuteCorrect(num);
                        c.find(".dairo-calendars-minute").html(minuteCorrect);
                        //时间显示部分
                        timeShow.find(".dairo-calendars-time-minute").html(minuteCorrect);
                    }
                });
            });
            $(window).mouseup(function (e) {
                $(window).off("mousemove");
            });

            return {
                "c" : c,
                "t" : timeShow
            };
        }
        
    })(window.dairo = window.dairo || {});

    dairo.edit.variables = {};
    dairo.edit.variables.calendar = dairo.edit.calendar();
    $(".edit-select").append(dairo.edit.variables.calendar.t,dairo.edit.variables.calendar.c);
    $(".dairo-edit-calendars").hide();
    dairo.calendars.hideControl = true;
    $(".edit-select").on("click",function (e) {
        $(".dairo-edit-calendars").show();
        //初始化
        var initialHour = ($(".dairo-calendars-hour").html())*5+60,
            initialMinute = ($(".dairo-calendars-minute").html())*2+60,
            period = $(".dairo-calendars-period").html();
        period == "下午" ? initialHour = initialHour + 60 : initialHour;
        $(".dairo-block-hour")[0].style.left = initialHour + "px";
        $(".dairo-block-minute")[0].style.left = initialMinute + "px";
        if (dairo.calendars.hideControl) {
            $("body").on("click.calendars", function (e) {
                var tar =$(e.target);
                var $this = $(e.target).parents(".dairo-edit-calendars");
                if (dairo.calendars.hideControl) {
                    return dairo.calendars.hideControl = false;
                }
                //如果在弹出日历外部点击则关闭
                if (!$this.length) {
                    $(".dairo-edit-calendars").hide();
                    $("body").off("click.calendars");
                    return dairo.calendars.hideControl = true;
                }
                //如果点击弹出菜单的td触发事件
                if (tar.hasClass("dairo-edit-td")){
                    var getMonth = $(tar).data("month"),
                        getYear = $(tar).data("year"),
                        getDay = $(tar).text(),
                        getWeek = dairo.calendars.getWeek(getYear,getMonth,getDay);
                    getDay = dairo.calendars.minuteCorrect(getDay);
                    $(".dairo-calendars-time-day").html(getDay);
                    $(".dairo-calendars-time-week").html(getWeek+"，");
                    if (tar.hasClass("dairo-calendar-lastMonth") || tar.hasClass("dairo-calendar-nextMonth")) {
                        $(".dairo-calendars-time-month").html(dairo.calendars.monthCorrect(getMonth)+"月");
                        $(".dairo-calendars-time-year").html(getYear);
                        $(".edit-month").val(getMonth);
                        $(".edit-year").val(getYear);
                    }
                    $(".dairo-edit-calendars").hide();
                    $("body").off("click.calendars");
                    return dairo.calendars.hideControl = true;
                }
            });
        }
    });
    //编辑完成
    dairo.edit.topDone.on("click",function () {
       var time = {name:"time", value:dairo.date.getTime()};
       var data = $("#editForm").serializeArray();
       data.push(time);
       var submit = $.ajax({
           method: "POST",
           url: "Edit/submit",
           timeout: 2000,
           data:data,
           beforeSend: function () {},
           complete: function (textStatus) {
                if (textStatus == 'timeout') {submit.reject();}
            },
       }).done(function (data) {
           $(".right-title > p").text("列表");
           $.detachSelf($(".top-left >span"));
           $(".top-left").append(dairo.layout.topSort,dairo.layout.topMulti);
           $('.entry-content').html(data);
           dairo.layout.dataSort($(".table-content"));
          });
    });
    //放弃编辑
    dairo.edit.topDelete.on("click",function () {
        $(".right-title > p").text("列表");
        var submit = $.ajax({
            method: "POST",
            url: "Edit/subRead",
        }).done(function (data) {
            $.detachSelf($(".top-left >span"));
            $(".top-left").append(dairo.layout.topSort,dairo.layout.topMulti);
            $('.entry-content').html(data);
            dairo.layout.dataSort($(".table-content"));
        });
    });

    //读取标签
    dairo.edit.readTag = dairo.newModalWindow(400,200);
    dairo.edit.readTag.addTitle = "选取标签";
    dairo.edit.readTag.addText = '<div class="edit-tagRead"></div>'
    $("body").append(dairo.edit.readTag);
    $(".edit-tag .fa-plus-square").on("click",function () {
        dairo.edit.readTag.show();
        var box = dairo.edit.readTag.find(".edit-tagRead");
        var tags = $(".tag-content>div").clone();
        box.html(tags);
    });
    //标签选中样式变化
    dairo.edit.readTag.find(".edit-tagRead").on("click","div",function () {
        $(this).find("label").toggleTwoClass("left-unSelect","left-select");
    });
    //将选择的标签输出到页面
    dairo.edit.readTag.find(".modal_foot button").on("click",function () {
        dairo.edit.readTag.find(".model_close").trigger("click");
        var select = dairo.edit.readTag.find(".left-select input");
        $(".edit-tag-select").empty();
        $.each(select,function (key) {
            var tags = $(' <div><span>'+$(this).val()+'</span><i class="fa fa-close fa-lg"></i></div>');
            $(".edit-tag-select").append(tags);
        });
    });
});
