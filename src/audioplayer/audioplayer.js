import playList from './playList.js';
const playButton = document.querySelector('.play');
const playerTitle = document.querySelector('.player-title');
const playerProgress = document.querySelector('.player-progress-input');
const playerVolume = document.querySelector('.volume-progress');
const playerAudio = document.querySelector('.player-audio');
const playerPrev = document.querySelector('.play-prev');
const playerNext = document.querySelector('.play-next');
const muteButton = document.querySelector('.play-volume-button');
const audioCurrent = document.querySelector('.current-value');
const audioDuration = document.querySelector('.duration');
const audioMusic = document.querySelectorAll('.player-music');
const audioMusicImage = document.querySelectorAll('.player-music-img');
let currentMusic = 0;
let playerMousedown = false;
const getColor = (x) => `linear-gradient(90deg, #cfcfcf ${x}%, #FFFFFF ${x}%)`;

const togglePlay = () => {
  if (playerAudio.paused) {
    playButton.classList.add('pause');
    playerAudio.play();
  } else {
    playButton.classList.remove('pause');
    playerAudio.pause();
  }
};
playButton.addEventListener('click', togglePlay);

const getPrevMusic = () => {
  currentMusic--;
  if (currentMusic < 0) {
    currentMusic = 3;
  }
  playerAudio.src = playList[currentMusic].src;
  audioDuration.innerHTML = playList[currentMusic].duration;
};
playerPrev.addEventListener('click', () => {
  getPrevMusic();
  togglePlay();
});

const getNextMusic = () => {
  currentMusic++;
  if (currentMusic > 3) {
    currentMusic = 0;
  }
  playerAudio.src = playList[currentMusic].src;
  audioDuration.innerHTML = playList[currentMusic].duration;
};
playerNext.addEventListener('click', () => {
  getNextMusic();
  togglePlay();
});

let musicArray = Array.from(audioMusic);
for (let i = 0; i < audioMusic.length; i++) {
  audioMusic[i].addEventListener('click', () => {
    musicArray.map((x) => {
      x.classList.remove('player-music-pause');
    });
    playerAudio.src = playList[i].src;
    audioDuration.innerHTML = playList[i].duration;
    audioMusic[i].classList.add('player-music-pause');
    playerTitle.innerHTML = playList[i].title;
    togglePlay();
  });
}

const volumeButton = () => {
  let { name } = playerVolume;
  if (playerAudio[name] === 0) {
    playerAudio[name] = 0.5;
    playerVolume.value = 0.5;
  } else if (playerAudio[name] != 0) {
    playerAudio[name] = 0;
    playerVolume.value = 0;
  }
  const x = playerAudio[playerVolume.name] * 100;
  playerVolume.style.background = getColor(x);
};

const volumeUpdate = () => {
  const { value, name } = playerVolume;
  playerAudio[name] = value;
  if (playerAudio[name] === 0) {
    muteButton.classList.add('muted');
  } else if (playerAudio[name] != 0) {
    muteButton.classList.remove('muted');
  }
};

const volumeProgress = () => {
  const x = playerVolume.value * 100;
  playerVolume.style.background = getColor(x);
};
volumeProgress();
playerVolume.addEventListener('oninput', volumeUpdate);
playerVolume.addEventListener('mousemove', volumeUpdate);
playerVolume.addEventListener('mousemove', volumeProgress);
playerVolume.addEventListener('click', volumeProgress);
muteButton.addEventListener('click', () => {
  volumeButton();
  volumeUpdate();
});

const progressUpdate = () => {
  let { currentTime, duration } = playerAudio;
  const percent = (currentTime / duration) * 100;
  playerProgress.style.background = getColor(percent);
  let currentTimeSeconds = currentTime % 60;
  let currentTimeMinutes = Math.floor(currentTime / 60);
  audioCurrent.innerHTML =
    currentTimeMinutes +
    ':' +
    Math.round(currentTimeSeconds).toString().padStart(2, '0');
  if (!playerMousedown) {
    playerProgress.value = percent;
  }
  if (percent === 100) {
    getNextMusic();
    togglePlay();
  }
};

const scrub = () => {
  playerAudio.currentTime = (playerProgress.value * playerAudio.duration) / 100;
};

playerAudio.addEventListener('timeupdate', progressUpdate);
playerProgress.addEventListener('click', scrub);
playerProgress.addEventListener('oninput', () => playerMousedown && scrub());
playerProgress.addEventListener('mousedown', () => (playerMousedown = true));
playerProgress.addEventListener('mouseup', () => (playerMousedown = false));
playerProgress.addEventListener('mousemove', () => {
  const x = playerProgress.value;
  playerProgress.style.background = getColor(x);
});
