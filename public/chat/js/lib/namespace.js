(function (c) {
    //滚动条
    c.scroll = {};
    //存放用户信息
    c.user = {};
    //存放当前会话用户
    c.other = {};
    //存放当前所有正在会话用户的id
    c.otherId = [];
    //存放正在操作的会话好友
    c.topClose = {};
    //存放所有好友
    c.allFriends = [];
    //浏览器当前宽和高
    c.size = {
        get width(){return document.documentElement.clientWidth},
        get height(){return document.documentElement.clientHeight}
    };
    //当前时间
    c.time = function () {
        var t = new Date();
        var year = t.getFullYear(),
            month = t.getMonth(),
            day = t.getDate(),
            week = t.getDay(),
            hour = t.getHours(),
            minute = t.getMinutes(),
            second = t.getSeconds();
        return {year:year,month:month,day:day,week:week,hour:hour,minute:minute,second:second};
    };
    
    //桌面消息推送
    c.notifyMsg = function (theBody,theIcon,theTitle) {
        var options = {
                    body: theBody,
                    icon: theIcon
                };
        var n = new Notification(theTitle,options);
        setTimeout(n.close.bind(n), 4000);
    };
    //使用用法
    //Notification.requestPermission().then(chat.notifyMsg("1","img/icon.jpg","标题"));
    //测试用数组
    c.msg = ["黄云万里动风色，白波九道流雪山","夜深知雪重，时闻折竹声","孤舟蓑笠翁，独钓寒江雪","昔去雪如花，今来花似雪","明月照积雪，朔风劲且哀"];
})(window.chat = window.chat || {});