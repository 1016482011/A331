//视图输出
$(function () {
    (function (c) {
        //正在聊天好友模板
        var readerBox = $(".chat-content-reader-box");
        c.readerList = readerBox.eq(0).detach();
        c.readerGroup = readerBox.eq(1).detach();

        //好友列表模板
        c.friendSort = $(".chat-content-friends-scope").detach();
        c.friendList = $(".chat-content-friends-info").detach();

        //聊天框模板
        c.time = $(".chat-content-talk-time").detach();
        c.message = $(".chat-content-talk-text").detach();

        //模态框模板
        c.modalSelect = $(".chat-launch-body-box > div").detach();

    })(window.chat.view = window.chat.view || {});

    //输出正在聊天好友列表
    $.getJSON("/public/chat/reader.json",function (data) {
        var active={};
        $.each(data,function (key) {
            active =  chat.view.readerList.clone();
            active.find("img").attr("src",this.img).end()
                .find(".chat-content-reader-name").text(this.name).end()
                .data({"id":this.id,
                    "name":this.name,
                    "img":this.img,
                    "timeHour":-2,
                    "timeMinute":-6,
                    "lastTime":0,
                    "dialog":{}
                });
            chat.index.reader.append(active);
            chat.otherId.push({id:this.id,obj:active});
        });

        chat.scroll.reader.resize();
    });

    //拉取用户信息
    $.getJSON("/public/chat/user.json",function (data) {
        chat.user.id = data[0].id;
        chat.user.name = data[0].name;
        chat.user.img = data[0].img;
        chat.user.tag = data[0].tag;
        chat.user.address = data[0].address;

        //将信息写入模态框
        chat.index.chatEdit.find("#editName").val(chat.user.name).end()
            .find("#editTag").val(chat.user.tag).end()
            .find("#editAddress").val(chat.user.address);

        //页面写入用户信息
        chat.index.head.find(".chat-content-header-icon").find("p").text(chat.user.name).end()
            .find("img").attr("src",chat.user.img);
    });

    //拉取好友信息
    $.getJSON("/public/chat/friends.json",function (data) {
        $.each(data,function (key,val) {
            var sort = chat.view.friendSort.clone();
            sort.find("span").text(key);
            chat.index.friends.append(sort);
            $.each(val,function () {
                var list = chat.view.friendList.clone();
                list.find(".chat-content-friends-icon > img").attr("src",this.img).end()
                    .find(".chat-content-friends-name > span").text(this.name).end()
                    .data({
                        "id":this.id,
                        "name":this.name,
                        "tag":this.tag,
                        "img":this.img,
                        "remark":this.remark,
                        "address":this.address
                    });
                chat.index.friends.append(list);

                //写入模态框
                var modal = chat.view.modalSelect.clone();
                modal.find("img").attr("src",this.img).end()
                    .find("span").text(this.name).end()
                    .data({
                        "id":this.id,
                        "img":this.img,
                        "name":this.name
                    });
                chat.index.chatLaunch.find(".chat-launch-body-box").append(modal);
            });
        });
        //加入好友滚动条
        chat.scroll.friends.resize();
    });

    //发送消息
    chat.index.sendA.on("click",function () {
        //插入消息
        var hour = chat.time().hour,minute = chat.time().minute;
        var news = chat.index.text.val();
        var text = chat.view.message.clone();

        //时间显示优化,间隔短不显示,这里只做当天的判断,年月日不作判断
        var minusHour = hour-chat.other.data("timeHour"),
            minusMinute = minute - chat.other.data("timeMinute");
        minute < 10 ? minute ="0" + minute : minute;
        if (minusHour > 1 || minusMinute > 5){
            chat.other.data("timeHour",hour);
            chat.other.data("timeMinute",minute);
            var timeText = hour + ":"+minute;
            var time = chat.view.time.clone();
            time.find("div").text(timeText);
        } else {time = {};}

        //将js空格转换成html空格
        var replace = news.split("\n").join('<br />');

        //将消息输出到页面
        text.find("img").attr("src",chat.user.img).end()
            .find("p").html(replace).end()
            .addClass("chat-content-talk-self");
        chat.index.content.find(".chat-content-talk-box").append(time,text);

        //在好友处插入时间以及消息预览
        chat.other.find(".chat-content-reader-time").text(hour + ":"+minute);
        if (news.length > 12){news = news.substring(0,12) + "...";}
        chat.other.find(".chat-content-reader-message").text(news);

        //高度调整
        var height = 0;

        chat.index.newHeight.html(replace);
        var multi = chat.index.newHeight.height() / 20;
        if (multi > 1){
             height = 26 + multi*20;
            text.height(height + "px");
        }

        //消息推送
        var num =Math.floor(Math.random()*4);
        Notification.requestPermission().then(chat.notifyMsg(chat.other.data("name"),chat.other.data("img"),chat.msg[num]));
        var answer = chat.view.message.clone();
        //将消息输出到页面
        answer.find("img").attr("src",chat.other.data("img")).end()
            .find("p").html(chat.msg[num]).end()
            .addClass("chat-content-talk-other");
        chat.index.content.find(".chat-content-talk-box").append(answer);

        //清空发送框栏
        chat.index.text.val("");

        //滚动条调整
        chat.scroll.talk.resize();


    });

    /*
     * 下拉好友信息操作
     * 修改好友备注
     * 检测到失去焦点后修改数据
     * 删除好友
     */
    chat.index.info.on("click",".chat-content-info-more",function () {
        var modify = chat.index.info.find(".chat-content-info-modify");
        modify.show();
        chat.index.chat.on("click.modify",function (e) {
            if (!$(e.target).hasClass("chat-content-info-more")){
                modify.hide();
                $(this).off("click.modify");
            }
        });
    });
    chat.index.info.on("click",".chat-content-remark-modify",function () {
        chat.index.info.find(".chat-content-info-modify").hide().end()
            .find(".chat-content-info-remark>span").hide().end()
            .find(".chat-content-info-remark>div").show().end()
            .find(".chat-content-info-remark input").focus();
    });
    chat.index.info.on("focusout",".chat-content-info-remark input",function () {
        var remark = $(this).val();
        var active = $(".chat-content-friends-active");
        !!remark ? active.data("remark",remark) : remark = active.data("name");
        chat.index.info.find(".chat-content-info-remark>span").show().text("备注: "+remark).end()
            .find(".chat-content-info-remark>div").hide();
        //此处往后台发送数据
        //
        //
    });
    chat.index.info.on("click",".chat-content-friend-delete",function () {
        chat.index.info.find(".chat-content-info-modify").hide();
        var active = $(".chat-content-friends-active");
        var id = active.data("id");
        //此处往后台发送数据
        //
        //
        active.remove();
        //无数据时将首字母删除
        var headWord = chat.index.friends.find(".chat-content-friends-scope");
        $.each(headWord,function () {
            var next =$(this).next().length == 0 || $(this).next().hasClass("chat-content-friends-scope");
            if (next)
                $(this).hide();
        });
        //将右侧内容隐藏
        chat.index.info.find(".chat-content-info-body").addClass("chat-content-info-hide").end()
            .find(".chat-content-info-none").removeClass("chat-content-info-hide");

        //删除模态框中的好友
        var modal = chat.index.chatLaunch.find(".chat-launch-body-box>div");
        $.each(modal,function () {
           if ($(this).data("id") == id)
               $(this).remove();
        });

        chat.scroll.friends.resize();
    });

    //模态框操作
    //添加好友
    chat.index.chatAdd.on("click",".chat-modal-foot-save",function () {
       var account = chat.index.chatAdd.find("#addAccount").val();
       //将账号传进后台
       //匹配成功需要返还首字母,如果能返还加在那个id下最好
        chat.index.chatAdd.find(".chat-modal-close").trigger("click");

        //滚动条调整
        chat.scroll.friends.resize();
    });
    //发起聊天
    chat.index.chatLaunch.on("click",".chat-modal-foot-save",function () {
       var launch =  chat.index.chatLaunch;
       var select =  launch.find(".chat-launch-select");
       //此处对象存有选中的聊天对象

       //在正在聊天栏对应显示出来
        if (select.length == 1){
            var info = select.data();
            //标识对象是否存在
            var mark = false;
            //循环已存在的对话
            $.each(chat.otherId,function () {
                if (info.id == this.id){
                    chat.index.tabReader.trigger("click");
                    this.obj.trigger("click");
                    mark = false;
                    return false;
                }else{mark = true}
            });
            if (mark){
                var active =  chat.view.readerList.clone();
                active.find("img").attr("src",info.img).end()
                    .find(".chat-content-reader-name").text(info.name).end()
                    .data({"id":info.id,
                        "name":info.name,
                        "img":info.img,
                        "timeHour":-2,
                        "timeMinute":-6,
                        "lastTime":0,
                        "dialog":{}
                    });
                chat.index.reader.append(active);
                chat.otherId.push({id:info.id,obj:active});
            }
        } else if (select.length > 1){
            //群聊
            var group = chat.view.readerGroup.clone();
            $.each(select,function(key){
               if (key>3)
                   return false;
                var img = $(this).find("img").clone();
                group.find(".chat-content-reader-icon").append(img).end()
                    .find(".chat-content-reader-name").text("暂不支持群聊");
                chat.index.reader.append(group);
            });
        }

        select.trigger("click");
        launch.find(".chat-modal-close").trigger("click");

    });
    //修改个人信息
    chat.index.chatEdit.on("click",".chat-modal-foot-save",function () {
        //修改个人信息
        //id即当前用户
        chat.index.chatEdit.find(".chat-modal-close").trigger("click");
    });
});