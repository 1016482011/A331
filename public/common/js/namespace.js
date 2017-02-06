(function (cl) {
    //引入函数库
    cl.lib={};
    //字符串转数字
    cl.stringToNumber = function (str) {
        return new Number(str) + 0;
    }
    //浏览器当前宽和高
    cl.size = {
        get width(){return document.documentElement.clientWidth},
        get height(){return document.documentElement.clientHeight}
    };
    cl.urlValue = function (a,str) {
        var reg = eval("/.*\\/"+str+"\\/([^\\/]*)\\/?.*/");
        var urlValue = a.replace(reg, "$1");
        return urlValue;
    };
})(window.clong = window.clong || {});