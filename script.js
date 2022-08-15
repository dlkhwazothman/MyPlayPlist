const musicContainer = document.getElementById('audio-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['50 Shades of Grey  - Crazy in love HQ _ Hannah Rue','The Weeknd - The Hills ', 'Witt Lowry - Into Your Arms (Lyrics) ft. Ava Max', 'Tove Lo - Habits',
'Tom Odell - Another Love', 'BIGBANG - Blue','The Weeknd - Call Out My Name', 'The Weeknd - After Hours','Azhdar wahbi ay tabiby','Tate McRae - you broke me first', 'Sia - Im Still Here' ,'Sia - Helium (Audio) Fifty Shades Darker', 'Sia - Elastic Heart', 'Olivia Rodrigo - traitor',
'Olivia Rodrigo - drivers license', 'Ludovico Einaudi - Experience','Duncan Laurence - Loving You Is A Losing Game','Mikael-Bochi bam dardam dabay','Glass Animals - Heat Waves','hunar hama jaza','Gesaffelstein The Weeknd - Lost in the Fire', 'Chord Overstreet - Hold On', 'AURORA - Runaway','Astrid S - Hurts So Good', 'The Weeknd - Save Your Tears',
'Selena Gomez - The Heart Wants What It Wants'];

// Keep track of song
let songIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

