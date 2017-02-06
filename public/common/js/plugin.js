$.extend({
    detachSelf:function () {
        $.each(arguments,function (key,val) {
            val = $(this).detach();
        });
    },
});

//公共版块
/**
 * 指定两个类互相转换
 * @param a 第一个类
 * @param b 第二个类
 */
$.fn.toggleTwoClass = function(a,b){
    if(this.hasClass(a)){
        this.addClass(b).removeClass(a);
    }else{
        this.addClass(a).removeClass(b);
    }
    return this;
};

//note版块

//read版块
/**
 * 筛选出指定值的html data属性对象的集合
 * @param num 需要筛选的值
 * @param name 需要筛选的属性名
 * @returns 返回指定值的对象
 */
$.fn.dataValue = function(num,name){
    var nav = this;
    var lastNav = this.last().index();
    this.each(function(index){
        if (this.dataset[name] == num){nav=nav.not($(this));}
        if (index==lastNav){return nav;}
    });
    return this.not(nav);
};