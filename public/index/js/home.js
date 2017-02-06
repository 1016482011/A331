$(function () {
    (function (h) {
        h.head = $(".head-box");

    })(window.home.index = window.home.index || {});

    home.index.head.on("click",".icon-pacman",function () {
       console.log($(this).next().remove());
    });
});