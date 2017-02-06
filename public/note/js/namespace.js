//编程模式，以单js文件为模块，模块下分三层，对象生成，初始化操作，事件绑定
(function (d) {
    d.content = {};
    d.edit = {};
    d.topIcon = {};
    d.layout = {};
    //对象拓展
    d.extend = function(destination,source) {
        for (var property in source)
            destination[property] = source[property];
        return destination;
    };
    //字符串转数字
    d.stringToNumber = function (str) {
        return new Number(str) + 0;
    }
    //浏览器当前宽和高
    d.size = {
        get width(){return document.documentElement.clientWidth},
        get height(){return document.documentElement.clientHeight}
    };
    d.weekName =  ["日","一","二","三","四","五","六"];
    d.monthName = ["一","二","三","四","五","六","七","八","九","十","十一","十二"];
    d.time = function () {
        var t = new Date();
        var year = t.getFullYear(),
            month = t.getMonth(),
            day = t.getDate(),
            week = t.getDay(),
            hour = t.getHours(),
            minute = t.getMinutes(),
            second = t.getSeconds();
        return {year:year,month:month,day:day,week:week,hour:hour,minute:minute,second:second};
    }
})(window.dairo = window.dairo || {});