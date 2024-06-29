// 基于jQuery的图片预加载插件，使用面向对象的写法来完成这个插件
(function ($) {
    
    function Preload(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extend({},Preload.DEFAULTS,options);

        this._unoredered();//_unoredered自定义方法，加下划线表示这个方法只在内部使用，而不被外部调用
    }
    Preload.DEFAULTS = {
        each: null, //每一张图片加载完成后执行
        all: null //所有图片加载完成后执行
    };
    Preload.prototype._unoredered = function () { //直接写在原型上，无序加载

        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        $.each(imgs,function (i,src) {
            if(typeof src != 'string'){
                return;
            }
            var imgObj = new Image();

            $(imgObj).on('load err',function () {
                opts.each && opts.each(count);
                /*progress.html(Math.round((count + 1) / len * 100) + '%');*/

                if(count >= len -1){
                    /*$('.loading').hide();
                    document.title = '1/' + len*/
                    opts.all && opts.all()
                }

                count++;
            });

            imgObj.src = src;
        })
    };

    //$.fn.extend -> $('#img').preload();
    //$.extend -> $.preload();
    $.extend({
        preload:function (imgs,opts) {
            new Preload(imgs,opts);
        }
    })

})(jQuery);