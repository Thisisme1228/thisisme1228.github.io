heleneSpace = function () {

    //背景音乐
    function backgroundMusic() {
        var radio = document.getElementById('radio');
        var h5audio_media = document.getElementById('h5audio_media');

        radio.addEventListener('click',function () {
            if(h5audio_media != ''){
                //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
                if (h5audio_media.paused) {
                    h5audio_media.play();// 这个就是播放
                    /*clickMe.innerText = '哎呀'*/
                } else {
                    h5audio_media.pause();// 这个就是暂停
                    /*clickMe.innerText = 'Click!'*/
                }
            }
        })
    }

    //供外面调用函数
    return {
        backgroundMusic : backgroundMusic
    }
}

heleneSpace().backgroundMusic()
