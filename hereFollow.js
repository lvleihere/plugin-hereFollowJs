/*
*name：基于jquery的鼠标跟随进入插件编写
*autohr：lvleihere
*date：2017/8/27
*version:v1.0
*ps：在某些场景一个div里面需要装入解释信息，比如：某些商城里面，在一个盒子里需要备注商品的信息和一些解释，这些基本都是被隐藏了的，需要鼠标进入才会出现，该插件是基于jQuery的鼠标跟随插件，顾名思义，鼠标从哪里进入显示信息的盒子也从哪里进入显示区，鼠标离开，该盒子也从相应的方向离开。
*welcome to visit my own site http://lvleihere.com
*
*	引用格式
*	var sm = $('.sm');			//sm为隐藏显示盒子
*	$('.big').hereFollow({ 		//big为隐藏显示盒子的父盒子
*   	showHideBox: sm			//将二者引入即可
*	});
*/


(function(root, factory, plug) {
    factory(jQuery, plug);
})(this, function(jQuery, plug) {
    $.fn[plug] = function(options) {
        var oriX = $(this).offset().left;
        var oriY = $(this).offset().top;
        var showHideBoxHeight = options.showHideBox.outerHeight();
        this.mouseenter(function(event) {
            var oriX = $(this).offset().left;
            var oriY = $(this).offset().top;
            var px = event.pageX;
            var py = event.pageY;
            if (py < oriY + 2) {
                $(this).find(options.showHideBox).css({ 'margin-top': -showHideBoxHeight, 'margin-left': '0' }).show(); /*-20指的是需要动态显示的盒子的高度*/
                $(this).find(options.showHideBox).animate({ marginTop: '0' }, 500)
            } else if (px > (oriX + $(this).width() - 2)) {
                $(this).find(options.showHideBox).css({ 'margin-top': '0', 'margin-left': $(this).width() }).show();
                $(this).find(options.showHideBox).animate({ marginLeft: '0' }, 500)
            } else if (px < oriX + 2) {
                $(this).find(options.showHideBox).css({ 'margin-top': '0', 'margin-left': -$(this).width() }).show();
                $(this).find(options.showHideBox).animate({ marginLeft: '0' }, 500)
            } else if (py > oriY + $(this).height() - 2) {
                $(this).find(options.showHideBox).css({ 'margin-top': $(this).height(), 'margin-left': '0' }).show();
                $(this).find(options.showHideBox).animate({ marginTop: '0' }, 500)
            }
        }).mouseleave(function() {
            var oriX = $(this).offset().left;
            var oriY = $(this).offset().top;
            var px = event.pageX;
            var py = event.pageY;
            if (oriY - 5 < py && py < oriY + 5) {
                $(this).find(options.showHideBox).animate({ marginTop: -showHideBoxHeight }, 500);
            } else if ((oriX + $(this).outerWidth() - 5) < px && px < (oriX + $(this).outerWidth() + 5)) { //+1 -1消除0.5像素的误差
                $(this).find(options.showHideBox).animate({ marginLeft: $(this).outerWidth() }, 500);
            } else if (oriX - 5 < px && px < oriX + 5) {
                $(this).find(options.showHideBox).animate({ marginLeft: -$(this).outerWidth() }, 500);
            } else if ((oriY + $(this).outerHeight() - 5) < py && py < (oriY + $(this).outerHeight() + 5)) {
                $(this).find(options.showHideBox).animate({ marginTop: $(this).outerHeight() + showHideBoxHeight }, 500);
            }
        })
    }
}, "hereFollow");
