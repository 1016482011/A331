//布局
$(function () {
    (function (d) {
        //多选排序图标
        dairo.layout.topSort = $('<span class="fa fa-sort-amount-desc fa-lg top-sort" title="反向排序"></span>');
        dairo.layout.topMulti = $('<span class="fa fa-check-square-o fa-lg top-multi" title="多选操作"></span>');
        dairo.layout.topPlus = $(".top-plus");

        d.layout.resize = function () {
            var left = document.querySelector(".layout-left"),
                right = document.querySelector(".layout-right"),
                content = document.querySelector(".entry-content"),
                top = document.querySelector(".layout-top");
            var width = left.clientWidth,
                height = top.clientHeight;
            right.style.width = (d.size.width - width) + "px";
            right.style.height = (d.size.height - height) + "px";
            content.style.height = (d.size.height - height - 25) + "px";
        };

        //将传进来的目录数据进行分类处理
        d.layout.dataSort = function (obj) {
            var lastYear,lastMonth;
            $.each( obj, function(key) {
                var sortTime = $("<time></time>");
                var time = parseInt(this.dataset.time);
                var newDate = new Date();
                newDate.setTime(time);
                var year = newDate.getFullYear(),month = newDate.getMonth(),
                    day = newDate.getDate(),week = newDate.getDay(),
                    hour = newDate.getHours(),minute = newDate.getMinutes();
                var sortMonth = dairo.monthName[month]+"月";
                if (key == 0){
                    lastYear = year;lastMonth = month;
                    sortTime.html(sortMonth + "，" + year).insertBefore(this);
                }
                if (year !== lastYear){
                    sortTime.html(sortMonth + "，" + year).insertBefore(this);
                    lastYear = year;
                }else {
                    if (month !== lastMonth){
                        sortTime.html(sortMonth + "，" + year).insertBefore(this);
                        lastMonth = month;
                    };
                };
                if (minute<10){minute = "0"+minute};
                if (hour<13){hour=hour + ":" + minute + "AM"}else{
                    hour = hour - 12;
                    hour=hour + ":" + minute + "PM"}
                $(this).find(".week").html("星期"+dairo.weekName[week])
                    .end().find(".day").html(day)
                    .end().find(".time").html(hour);
            });
        }
    })(window.dairo = window.dairo || {});

    //初始化
    dairo.layout.resize();
    $(".user-mask").hide();
    $(".top-left").append(dairo.layout.topSort,dairo.layout.topMulti);
    //加载日记数据并进行一些分类
    dairo.layout.dataSort($(".table-content"));

    //绑定事件，页面响应式布局
    $(window).resize(function () {
        dairo.layout.resize();
    });
    $(".user-name").hover(function () {
        $(".user-mask").show();
    },function () {
        $(".user-mask").hide();
    });
});