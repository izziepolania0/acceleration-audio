const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const progressBar = document.getElementById("progress");
const customProgressBar = document.getElementById("custom-progress-bar");
const forwardButton = document.getElementById("forwardButton");
const backwardButton = document.getElementById("backwardButton");
const songTitle = document.getElementById("songTitle");
const speedDisplay = document.getElementById("speedDisplay");

const baseURL = "/songs";

let currentTrack = 0;

const songs = [
  { file: "Aidan.mp3", albumArt: "Aidan.jpg" },
  { file: "autumn_sun.mp3", albumArt: "autumn_sun.png" },
  { file: "best_part_of_me.mp3", albumArt: "BestPart.jpg" },
  { file: "Better Days - LAKEY INSPIRED.mp3", albumArt: "Better Days.jpg" },
];

function loadAndPlayTrack() {
  audioPlayer.src = `${baseURL}/${songs[currentTrack].file}`;
  audioPlayer.load();
  audioPlayer.playbackRate = 1.0;
  audioPlayer.play();
  updateImage();
  songTitle.textContent = songs[currentTrack].file;
}

const imgElement = document.getElementById("dynamicImage");

function updateImage() {
  imgElement.src = `/albumart/${songs[currentTrack].albumArt}`;
}

playButton.addEventListener("click", loadAndPlayTrack);

forwardButton.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % songs.length;
  loadAndPlayTrack();
});

backwardButton.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + songs.length) % songs.length;
  loadAndPlayTrack();
});

pauseButton.addEventListener("click", () => {
  audioPlayer.pause();
});

audioPlayer.addEventListener("timeupdate", () => {
  progressBar.value = audioPlayer.currentTime / audioPlayer.duration;
  customProgressBar.style.width = `${
    (audioPlayer.currentTime / audioPlayer.duration) * 100
  }%`;

  console.log(`${audioPlayer.currentTime} / ${audioPlayer.duration}`);

  audioPlayer.playbackRate += 0.01;
  speedDisplay.textContent = `Speed: ${audioPlayer.playbackRate.toFixed(2)}x`;
});

//display the playback!!!!!

document.addEventListener("keydown", (event) => {
  switch (event.key.toLowerCase()) {
    case " ":
      event.preventDefault();
      audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
      break;

    case "m":
      audioPlayer.muted = !audioPlayer.muted;
      break;

    case "arrowright":
      audioPlayer.currentTime = Math.min(
        audioPlayer.currentTime + 10,
        audioPlayer.duration
      );
      break;

    case "arrowleft":
      audioPlayer.currentTime = Math.max(audioPlayer.currentTime - 10, 0);
      break;
  }
});
