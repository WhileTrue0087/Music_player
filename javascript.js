var audio = document.getElementById("audio");
var time_past = document.getElementById("time-past");
var time_left = document.getElementById("time-left");
var fill = document.getElementById("fill");
var fill_btn = document.getElementById("fill-btn");
var played = false;

function play_pause_btn() {
    if (played) {
        audio.pause()
        document.getElementById("play-pause-btn").src = "img/icons8-circled-play-100.png"; // if music wasn`t  playing show play icon to play it
        played = false
    } else {
        audio.play()
        document.getElementById("play-pause-btn").src = "img/icons8-pause-button-100.png"; // if music  playing show pause button if he or she want`s to pause it 
        played = true
    }
}

function change_format(time) {
    var min = parseInt(time / 60); //Division time to 60 to Earn min  and with "parseInt" it remove Decimals
    var secound = parseInt(time - (min * 60)); //time is with secounds so we will Multiplication min to 60 and mines to time.
    if (secound > 9) return min.toString() + ":" + secound.toString();
    else return min.toString() + ":0" + secound.toString();
}

function next_5() {
    if (audio.currentTime + 5 > audio.duration) audio.currentTime = audio.duration;
    else audio.currentTime += 5;
}

function back_5() {
    if (audio.currentTime - 5 < 0) audio.currentTime = 0;
    else audio.currentTime -= 5;
}

slider("volume", "volume");
slider("time-line", "time-line", function() { audio.pause() }, function() { if (played) audio.play(); });

audio.addEventListener("timeupdate", function() {
    fill.style.width = (audio.currentTime * 100 / audio.duration) + "%" //for moving timeline. 
    fill_btn.style.left = (audio.currentTime * 100 / audio.duration) + "%" //for moving time line to left.
    time_past.innerText = change_format(audio.currentTime); //showing how much does it past it.
    time_left.innerText = "-" + change_format(audio.duration - audio.currentTime) //showing how long does it left.
})