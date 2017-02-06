//一些布局操作及顶部功能实现
$(function () {
    (function (d) {
        //编辑界面图标
        d.edit.topDone = $('<span class="top-done fa fa-check fa-lg">完成</span>');
        d.edit.topDelete = $('<span class="top-delete fa fa-trash fa-lg">放弃</span>');
        //多选操作图标
        d.topIcon.done = $('<span class="fa fa-check fa-lg top-handle-done" title="完成">完成</span>');
        d.topIcon.total = $('<span class="top-handle-total">0</span>');
        d.topIcon.handleAll = $('<span class="top-handle-all fa fa-lg" title="选中所有">全选</span>');
    })(window.dairo = window.dairo || {});

    //新增记事事件,变换图标
    $(".top-plus").on("click",function () {
        $(".right-title > p").text("开始编辑");
        $.detachSelf($(".top-left >span"));
        $(".top-left").append(dairo.edit.topDone,dairo.edit.topDelete);
        $.get('Edit/index', function(data) {
            $('.entry-content').html(data);
        });
    });

    //排序
    $(".top-sort").on("click",function () {
       $(this).toggleTwoClass("fa-sort-amount-desc","fa-sort-amount-asc");
       var arr = $(".table-content").toArray().reverse();
       $(".entry-content-list").empty();
       $.each(arr,function () {
           $(".entry-content-list").append($(this));
       });
       dairo.layout.dataSort($(".table-content"));
    });

    //批量操作
    $(".top-multi").on("click",function () {
       dairo.layout.topPlus.hide();
       dairo.content.entry = $(".layout-right").find(".entry-content-list>div");
       $.detachSelf($(".top-left >span"));
       $(".top-left").append(dairo.topIcon.done,dairo.topIcon.total,dairo.topIcon.handleAll);
        dairo.content.entry.addClass("entry-handle");
       //为多选操作下的内容条目绑定操作
        dairo.content.entry.on("click.select",function () {
           $(this).toggleClass("entry-handle-select");
       });
    });
    //全部选中
    dairo.topIcon.handleAll.on("click",function () {
        
        dairo.content.entry.addClass("entry-handle-select");
    });
    //批量操作结束
    dairo.topIcon.done.on("click",function () {
        dairo.layout.topPlus.show();
        dairo.content.entry.removeClass("entry-handle-select entry-handle").off("click.select");
        $.detachSelf($(".top-left >span"));
        $(".top-left").append(dairo.layout.topSort,dairo.layout.topMulti);
    });

  //  $(".top-multi").trigger("click");
   // $(".top-plus").trigger("click");
});
