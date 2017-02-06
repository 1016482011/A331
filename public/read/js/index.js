$(function () {
    (function (cl) {
        //将目录删除进行二次处理
        cl.navList= $(".index-nav-body a").detach();

        //得到页面参数
        var url = window.location.href;
        cl.page = clong.urlValue(url,"read");

        //存放上下页以及起始页
        cl.lastPage = null,cl.nextPage=null;
        cl.startPage = parseInt(cl.navList[0].dataset.id),cl.finalPage = parseInt(cl.navList.length)+cl.startPage - 1;
    })(window.clong.index = window.clong.index || {});

    //初始化菜单显示
    $.each(clong.index.navList,function(key,index){
        var dataId = this.dataset.id;
        var dataCap = this.dataset.cap;
        var right = $("<i class='fa fa-fw fa-caret-right index-nav-show'></i>"),
            down = $("<i class='fa fa-fw fa-caret-down index-nav-show'></i>");
        if (dataCap == 0) {
            var navDiv = $("<div data-id="+dataId+"></div>").append(right,$(this));
            var dataLi = $("<li data-id="+dataId+"></li>").append(navDiv,$("<ul class='index-nav-list-hide'></ul>"));
            $(".index-nav-body").append(dataLi);
        } else {
            var listUl = $(".index-nav-body>li[data-id="+dataCap+"]").find("ul");
            var ulLi = $("<li data-id="+dataId+"></li>").append($(this));
            listUl.append(ulLi);
        }
        return;
    });

    //宽高调整
    $(".ns-flex").height(clong.size.height-40);
    $(".index-nav-body").height(clong.size.height-107);
    $(window).resize(function () {
        $(".ns-flex").height(clong.size.height-40);
        $(".index-nav-body").height(clong.size.height-107);
        var inner = $(".index-innerFa");
        $(".index-nav").is(":visible") ?  inner.addClass("fa-angle-left").removeClass("fa-angle-right") : inner.addClass("fa-angle-right").removeClass("fa-angle-left");
    });

    //导航箭头
    $(".index-foldArrow").hover(
        function(){$(".index-outFa").css("color","#449D44");},
        function(){$(".index-outFa").css("color","#5CB85C");}
    ).click(function () {
       var nav=$(".index-nav");
       $(".index-innerFa").toggleTwoClass("fa-angle-left","fa-angle-right");
       nav.is(":hidden") ?  nav.show() : nav.hide();
    });

    //顶部点击事件
    $(".index-top").on("click",".fa-bars",function () {$(".index-nav").toggle();});

    //导航点击事件
    $(".index-nav-show").on("click",function () {
        $(this).toggleTwoClass("fa-caret-right","fa-caret-down");
        $(this).parentsUntil("li").next("ul").toggleClass("index-nav-list-hide");
    });

    $(".index-nav-body>li").on("click","a",function (e) {
       e.preventDefault();
       //调整点击背景色调
       $(".index-nav-active").removeClass("index-nav-active");
       var aParent = $(this).parent();
       if (aParent.is("div")){
           aParent.addClass("index-nav-active");
       }else {
           $(this).addClass("index-nav-active");
           aParent.parent().removeClass("index-nav-list-hide");
           var liParent = aParent.parent().parent().find("i");
           if (liParent.hasClass("fa-caret-right"))
               liParent.removeClass("fa-caret-right").addClass("fa-caret-down");
       }
       //ajax请求内容
       var href = this.href;
       var urlAjax = href.replace(/read/,"ajax");
       var submit = $.ajax({
            url: urlAjax,
            cache: true,
            timeout: 2000,
            beforeSend: function () {},
            complete: function (textStatus) {
                if (textStatus == 'timeout') {submit.reject();}
            },
       }).done(function (data) {
           //markDown编码
           var markDown ={};
           $.each(data, function (key, val) {
               var content = val.content;
               var converter = new showdown.Converter({headerLevelStart: 2,
                   noHeaderId:true});
               markDown  = converter.makeHtml(content);

               $(".index-content-body").html(markDown);
           });

           //下方翻页
           var cl = clong.index,
               lastPage, nextPage;
           cl.lastPage = clong.urlValue(urlAjax,"ajax")-1,cl.nextPage = cl.lastPage+2;
           cl.lastPage < cl.startPage ? lastPage = "无" : lastPage = $("a[data-id="+clong.index.lastPage+"]").text();
           cl.nextPage > cl.finalPage ? nextPage = "无" : nextPage = $("a[data-id="+clong.index.nextPage+"]").text();
           $(".index-content-page1>a").attr("href",cl.lastPage).html(lastPage);
           $(".index-content-page2>a").attr("href",cl.nextPage).html(nextPage);

           //历史添加
           var historyContent={"content":markDown,"nav": $(".index-nav-body").html(),"page":$(".index-content-page").html()};
           if (!!history.pushState) {
               window.history.pushState({content: historyContent, url: href}, "", href);
           }
       });
    });
    //后退历史事件监听
    $(window).on("popstate",function () {
        var historyHtml=history.state.content;
        $(".index-content-body").html(historyHtml.content);
        $(".index-nav-body").html(historyHtml.nav);
        $(".index-content-page").html(historyHtml.page);
    });

    //下方翻页事件监听
    $(".index-content-page>span").on("click","a",function (e) {
        e.preventDefault();
        if (clong.index.lastPage >= clong.index.startPage || clong.index.nextPage <= clong.index.finalPage)
            $("a[data-id="+$(this).attr("href")+"]").trigger("click");
    });

    //初始加载或者刷新页面
    if ($.isNumeric(clong.index.page)){
        $("a[data-id="+clong.index.page+"]").trigger("click");
    }else {
        $(".index-nav-body a:first").trigger("click");
    }
});