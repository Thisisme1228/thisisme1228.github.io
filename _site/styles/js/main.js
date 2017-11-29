/* 本文件为网站的所有js功能集合 */

"use strict";

// js原生
var heleneSpace = function () {
    // 1.背景音乐
    function backgroundMusic() {
        var radio = document.getElementById('radio');
        var h5AudioMedia = document.getElementById('h5audio_media');

        radio.addEventListener('click',function () {
            if(h5AudioMedia != ''){

                //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
                if (h5AudioMedia.paused) {
                    h5AudioMedia.play();// 这个就是播放
                } else {
                    h5AudioMedia.pause();// 这个就是暂停
                }
            }
        })
    }


    //供外面调用函数
    return {
        backgroundMusic : backgroundMusic,
        backToTop : backToTop
    }
}

// 调用播放背景音乐函数
heleneSpace().backgroundMusic();


// 2.jQuery
!function ($) {
    // 1、返回顶部
    (function (btn) {
        $(window).scroll(function(){
            if ($(window).scrollTop()>400){
                btn.fadeIn(400);
            } else {
                btn.fadeOut(600);
            }
        });//按钮消失和出现
        btn.click(function(){
            $('body,html').animate({scrollTop:0},1000);
        });
    })($('#backToTop')); //回到顶部
}(jQuery);

SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/search.json',
    searchResultTemplate: '<li><a href="{url}">. {title}</a></li>',
    noResultsText: '',
    limit: 5,
    fuzzy: true,
    exclude: ['Welcome']
});