(function (h) {
    //浏览器当前宽和高
    h.size = {
        get width(){return document.documentElement.clientWidth},
        get height(){return document.documentElement.clientHeight}
    };
   
})(window.home = window.home || {});