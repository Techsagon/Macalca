var musics = ['assets/audios/1.mp3' , 'assets/audios/2.mp3' , 'assets/audios/3.mp3' , 'assets/audios/4.mp3'] ;
var musicObejcts = musics.map( (music , index) => {
    var newAudio = new Audio(music);
    newAudio.addEventListener("playing" , handlePlay);
    newAudio.addEventListener("pause" , handlePause);
    newAudio.addEventListener("ended", songEndHandler)
    setTimeout(() => {
        var duration = newAudio.duration;
        duration = Math.floor(duration);
        var durationMinuts = Math.floor(duration / 60);
        var durationSeconds = duration % 60;
        document.querySelector(`.swiper-slide:nth-child(${index + 1}) .progress-box`).appendChild(newAudio);
        document.querySelector(`.swiper-slide:nth-child(${index + 1}) .audio-time-complete .audio-min`).innerText = addZeroToNumber(durationMinuts);
        document.querySelector(`.swiper-slide:nth-child(${index + 1}) .audio-time-complete .audio-seconds`).innerText = addZeroToNumber(durationSeconds);
    }, 500);
    return newAudio;
});


document.querySelectorAll("[data-play-song]").forEach(item => {
    item.addEventListener("click" , handlePlayMusic);
})

function handlePlayMusic(){
    var songNumber = this.getAttribute("data-play-song");
    var status = this.getAttribute("data-status");        
    if( status == "pause" ){
        musicObejcts[songNumber - 1].play();
        this.children[0].classList.remove("fa-play");
        this.children[0].classList.add("fa-pause");
        this.setAttribute("data-status" , "play");
    }else{
        musicObejcts[songNumber - 1].pause();
        this.children[0].classList.remove("fa-pause");
        this.children[0].classList.add("fa-play");
        this.setAttribute("data-status" , "pause");
    }
}

var timer ;
var audioTimer = 0;
var audioSeconds = 0;

function handlePlay(e){

    var duration = Math.floor(this.duration);

    var segment = 100 / duration;

    // var playBtn = this.parentNode.nextElementSibling.children[1];
    
    var thisProgressBar = this.previousElementSibling;
    var thisProgress = thisProgressBar.children[0];    

    var thisAudioTimes = this.previousElementSibling.previousElementSibling;
    var thisAudioMin = thisAudioTimes.children[0].children[0];
    var thisAudioSeconds = thisAudioTimes.children[0].children[2];    

    
    timer = setInterval(() => {
        var audioTimer = this.currentTime;        
        if( audioTimer <= duration ){
            // audioTimer++;

            thisProgress.style.width = segment * audioTimer + "%";

            if( audioSeconds < 59 ){
                thisAudioSeconds.innerText = addZeroToNumber(++audioSeconds);                
            }else{
                audioSeconds = 0;
                var min = thisAudioMin.innerText;
                min++
                thisAudioMin.innerText = addZeroToNumber(min);
            }
        }
    }, 1000);
}
function handlePause(){
    clearInterval(timer);
    document.querySelectorAll("[data-play-song]").forEach( item => item.removeEventListener("click", handlePlayMusic))
    setTimeout(() => {
        document.querySelectorAll("[data-play-song]").forEach( item => item.addEventListener("click", handlePlayMusic))
    }, 1000);
}

function songEndHandler(ev){    
    var progress = ev.target.parentNode.children[1];
    var progressBar = progress.children[0];
    var audioTime = ev.target.parentNode.children[0].children[0];
    var auidoMin = audioTime.children[0];
    var auidoSeconds = audioTime.children[2];

    audioTimer = 0;
    audioSeconds = 0;
    auidoMin.innerText = "00";
    auidoSeconds.innerText = "00";
    progressBar.style.width = '0';
    ev.target.parentNode.nextElementSibling.children[1].children[0].children[0].classList.remove('fa-pause')
    ev.target.parentNode.nextElementSibling.children[1].children[0].children[0].classList.add('fa-play')
    secondSwiper.slideNext();        
}

document.querySelectorAll(".next-music").forEach( item => {
    item.addEventListener("click" , function(){
        stopAllMusics();
        secondSwiper.slideNext();
    })
})
document.querySelectorAll(".prev-music").forEach( item => {
    item.addEventListener("click" , function(){
        stopAllMusics();
        secondSwiper.slidePrev();
    })
})
secondSwiper.on("slideChange" , function(){
    stopAllMusics();
})
function stopAllMusics(){
    document.querySelectorAll(".audio-time .audio-min").forEach(item => item.innerText = '00');
    document.querySelectorAll(".audio-time .audio-seconds").forEach(item => item.innerText =    '00');    
    document.querySelectorAll(".progress-bar").forEach( item => item.style.width = '0');
    document.querySelectorAll(".fa-pause").forEach( item => item.classList.add('fa-play'));
    document.querySelectorAll(".fa-pause").forEach( item => item.classList.remove('fa-pause'));
    audioTimer = 0;
    audioSeconds = 0;

    
    musicObejcts.forEach( musicObject => {
        musicObject.pause()
        musicObject.currentTime = 0;
    });
}