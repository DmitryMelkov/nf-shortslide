//card-block

const atroposEl = document.querySelectorAll('.card-block-atropos-js');

atroposEl.forEach((item) => {
  const myAtropos = Atropos({
    el: item,
    activeOffset: 40,
    shadowScale: 1.05,
    alwaysActive: true,

    rotate: true,
    rotateXMax: 50,
    rotateYMax: 50,
    activeOffset: 30,
    highlight: true,
  });
});

const cardBlock = document.querySelector('.card-block__swiper');

const cardBlockswiper = new Swiper(cardBlock, {
  effect: 'cube',
  grabCursor: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },

  navigation: {
    nextEl: '.card-block__btn-next',
    prevEl: '.card-block__btn-prev',
  },
});

// //btn-sound
// const slideContent = document.querySelectorAll('.card-block__slide');

// const slideChangeFunc = () => {
//   cardBlockswiper.on('slideChange', () => {
//     const sound = document.querySelectorAll('.card-block__audio');
//     sound.forEach((item) => {
//       item.classList.remove('play');
//       item.pause();
//     });
//   });
// };

// slideChangeFunc();

// const soundBtnFunc = () => {
//   slideContent.forEach((item) => {
//     const soundBtn = item.querySelector('.card-block__btn-sound');
//     soundBtn.addEventListener('click', () => {
//       const sound = item.querySelector('.card-block__audio');
//       sound.classList.add('play');
//       sound.play();
//     });
//   });
// };

// soundBtnFunc();

//player
const player = document.querySelector('.card-block__player');
const playBtn = document.querySelector('.card-block__player-btn-play');
const prevBtn = document.querySelector('.card-block__player-btn-prev');
const nextBtn = document.querySelector('.card-block__player-btn-next');
const audio = document.querySelector('.card-block__player-audio');
const progressContainer = document.querySelector('.card-block__player-progress-container');
const progress = document.querySelector('.card-block__player-progress');
const title = document.querySelector('.card-block__player-song');
const imgSrc = document.querySelector('.img__src');

const songs = ['song-1', 'song-2', 'song-3', 'song-4'];

//default song
let songIndex = 0;

//Init
const loadSong = (song) => {
  title.innerHTML = song;
  audio.src = `sounds/${song}.mp3`;
};

loadSong(songs[songIndex]);

//play
const playSong = () => {
  player.classList.add('play');
  imgSrc.src = 'img/pause.svg';
  audio.play();
};

//pause
const pauseSong = () => {
  player.classList.remove('play');
  imgSrc.src = 'img/play.svg';
  audio.pause();
};

playBtn.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//nextSong, prevSong
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

//progressBar

const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercents = (currentTime / duration) * 100;
  progress.style.width = `${progressPercents}%`;
};

audio.addEventListener('timeupdate', updateProgress);

//setProgress

const setProgress = (e) => {
  const width = progressContainer.offsetWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
};

progressContainer.addEventListener('click', setProgress);

//autoplay
audio.addEventListener('ended', nextSong);
