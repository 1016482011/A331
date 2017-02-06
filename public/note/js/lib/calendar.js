(function (d) {
    /**
     *日历部件，自由组装
     */
    d.date = new Date();
    d.calendars = {};
    d.calendars.hourCorrect = function (num) {
        var i = "上午";
        var hour = num;
        if (hour > 12){
            hour = hour -12;
            if (hour < 10)
                hour = "0" + hour;
        } else if(hour > 0 && hour < 10){hour = "0" + hour
        } else if(hour == 0 ){hour = 12
        }
        return {
            "hour":hour,
            "period":num > 11 ?  i = "下午" : i
        }
    };
    d.calendars.minuteCorrect = function (min) {
        var minute = min;
        return minute < 10 ? minute ="0" + minute : minute
    };
    d.calendars.monthCorrect = function (month) {
        var monthName = ["一","二","三","四","五","六","七","八","九","十","十一","十二"];
        return monthName[month];
    }
    //当月第一天的星期,当月天数,上月天数
    d.calendars.getWeek = function (y,m,d) {
        var week = ["日","一","二","三","四","五","六"]
        return  "星期"+week[new Date(y,m,d).getDay()];
    };
    function getFirstWeekInMonth(y,m) {
        return new Date(y,m,1).getDay();
    };
    function getDaysInMonth(y,m) {
        m = new Number(m);
        return new Date(y,m+1, 0).getDate();
    };
    function getDaysInLasMonth(y,m) {
        return new Date(y,m,0).getDate();
    }
    //时间显示
    d.calendars.table = function () {
        var i,j;
        var week = ['日','一','二','三','四','五','六'],
            table= $("<table><thead><tr></tr></thead><tbody></tbody></table>");
        for (i=0;i<week.length;i++){
            var th = $("<th></th>").text(week[i]);
            table.find("thead tr").append(th);
        }
        for (i=0;i<6;i++){
            var tr = $("<tr></tr>").appendTo(table.find("tbody"))
            for (j=0;j<7;j++){
                tr.append("<td></td>");
            }
        }
        return table;
    };
    d.calendars.calendar =function (y,m,table) {
        var i;
        var year = d.stringToNumber(y),
            month = d.stringToNumber(m);
        //修复m=0时js将其判定为false的情况
        if (m === 0)
            month = 0;
        var start = getFirstWeekInMonth(year,month),
            end = getDaysInMonth(year,month),
            lastMonth = getDaysInLasMonth(year,month),
            nextMonth = 1;
        var lastStart = start - 1;
        var tds = $(table).find("tbody td");
        var lastM = month - 1,
            lastY = year;
        var nextM = month + 1,
            nextY = year;
        if (month == 0 ){
            lastM = 11;
            lastY = lastY - 1;
        };
        if (month == 11){
            nextM = 0;
            nextY = lastY + 1;
        }
        for (i=lastStart;i>-1;i--){
            tds.eq(i).html(lastMonth--).removeClass().addClass("dairo-calendar-lastMonth").data({"month":lastM,"year":lastY});
        }
        for (i=1;i<=end;i++){
            tds.eq(start++).html(i).removeClass().addClass("dairo-calendar-theMonth").data({"month":month,"year":year});
        }
        start<36 ? table.find("tbody tr:last-child").hide() : table.find("tbody tr:last-child").show();
        for (i=start;i<tds.length;i++){
            tds.eq(i).html(nextMonth++).removeClass().addClass("dairo-calendar-nextMonth").data({"month":nextM,"year":nextY});
        }
    };
    //年分下拉菜单
    d.calendars.yearList=function () {
        var i,j;
        var nowTime = new Date(),
            year = d.date.getFullYear();
        var select=$("<select></select>");
        for (i=1900;i<=2100;i++){
            j = i-1900;
            select[0][j]=new Option(i,i);
        }
        select.val(year);
        return select;
    };
    //月份下拉菜单
    d.calendars.monthList = function () {
        var i;
        var nowTime = new Date(),
            month = d.date.getMonth();
        var monthName = ["一","二","三","四","五","六","七","八","九","十","十一","十二"];
        var select=$("<select></select>");
        for (i=0;i<=11;i++){
            select[0][i]=new Option(monthName[i]+"月",i);
        }
        select.val(month);
        return select;
    };
    d.calendars.time = function () {
      var h = d.calendars.hourCorrect(d.date.getHours()),
          m = d.calendars.minuteCorrect(d.date.getMinutes());
      var hour =$("<span class='dairo-calendars-hour'>"+h.hour+"</span><i>:</i>"),
          minute =$("<span class='dairo-calendars-minute'>"+m+"</span>"),
          period =$("<span class='dairo-calendars-period'>"+h.period+"</span>")
      var time = $("<div class='dairo-calendars-time'><span>时间</span></div>");
      time.append(hour,minute,period);
      return time;
    };
    d.calendars.progressBar = function () {
      var progressBar = $("<div class='dairo-calendars-progressBar'><span class='dairo-calendars-label'></span></div>");
      var bar = $("<span class='dairo-calendars-bar'></span>");
      var block = $("<span class='dairo-calendars-block'></span>");
        bar.css({
            "position":"absolute",
            "width":"124px",
            "height":"10px",
            "backgroundColor":"#EBEBEB",
            "left":"65px",
            "marginTop":"3px"
        });
        block.css({
            "position":"absolute",
            "width":"17px",
            "height":"17px",
            "left":"60px",
            "backgroundColor":"#EAEAEA",
            "border":"1px solid #A6A6A6"
        });
      progressBar.append(bar,block);
      return progressBar;
    };

})(window.dairo = window.dairo || {});