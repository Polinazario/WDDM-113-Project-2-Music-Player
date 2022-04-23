// Global variables
const wrapper = document.querySelector("main");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const audio = document.querySelector("audio");
const progressContainer = document.querySelector("progress-container");
const progress = document.querySelector(".progress");
const title = document.querySelector("h2");
const cover = document.querySelector("img");

// Song Titles
const songs = ["ballet", "christmas", "elevation", "winter"];

// 1st song to play when page is loaded
let songIndex = 0;

//Load songs into the DOM (Document Object Model)
loadSong(songs[songIndex]);

// Functions
// Update song details: title, song, and image
function loadSong(song) {
    title.innerText = song;
    audio.src = `songs/${song}.mp3`;
    cover.src = `img/${song}.jpg`;
}

function playSong() {
    wrapper.classList.add("play");
    play.querySelector("span.fa-solid").classList.remove("fa-play");
    play.querySelector("span.fa-solid").classList.add("fa-pause");

    // play audio
    audio.play();
}

function pauseSong() {
    wrapper.classList.remove("play");
    play.querySelector("span.fa-solid").classList.add("fa-play");
    play.querySelector("span.fa-solid").classList.remove("fa-pause");

    // play audio
    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    // load the song
    loadSong(songs[songIndex]);
    //play the song
    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
     // load the song
     loadSong(songs[songIndex]);
     //play the song
     playSong();
}

// e = event parameter
function updateProgress(e) {
    //const currentTime = e.srcElement;
    //const duration = e.srcElement;
    // Object destructuring
    const { currentTime, duration } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // console.log("time: " + event.srcElement.currentTime);
    // console.log("duration: " + event.srcElement.duration);
    //console.log(progressPercent);
}

function setProgress(e) {
    // this = width variable
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
    //console.log("width: " + width);
    //console.log("mouse click: " + clickX);
}

// Event Listeners
play.addEventListener("click", (isPlaying) => {
    isPlaying = wrapper.classList.contains("play");

    if (!isPlaying) {
        playSong();
    } else {
        pauseSong();
    }
});

// Change song
prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);


// Audio Progress Bar
audio.addEventListener("timeupdate", updateProgress);

// Audio Progress on click
progressContainer.addEventListener("click", setProgress);

// Auto-play next song
audio.addEventListener("ended", nextSong);
