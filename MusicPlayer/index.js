const play = document.querySelector(".fa-play");
const next = document.querySelector(".fa-forward");
const previous = document.querySelector(".fa-backward");
const music = document.querySelector("audio");
const img = document.querySelector("img");
const songTitle = document.querySelector(".songname");
const artist = document.querySelector(".artist");
let duration_currently = document.querySelector(".duration");
const current_duration = document.querySelector(".current_duration");
let dot = document.querySelector(".dot");
let isPlaying = false;
let index = 0;
const progressbar = document.querySelector(".progressbar");
const playlist = document.querySelector(".fa-list");
const playlist_songs = document.querySelector(".songs");
let playlistVisibility = true;
const songTitles = document.querySelectorAll(".song-title");

const songs = [
  {
    artist: "Shawn Mendes",
    title: "Treat You Better",
    song: "./assets/Music/Shawn_Mendes_-_Treat_You_Better(256k).mp3",
    img: "./assets/images/treat_you_better.jpg",
  },
  {
    artist: "Armaan Malik",
    title: "Ghalib Hona Hai",
    song: "./assets/Music/Ghalib_Hona_Hai___Sukoon___Sanjay_Leela_Bhansali___Armaan_Malik___Sharmin_Segal___A._M._Turaz(256k).mp3",
    img: "./assets/images/Ghalib_hona.jpg",
  },
  {
    artist: "Arijit Singh",
    title: "Laal Ishq",
    song: "./assets/Music/LAAL_ISHQ_-_Full_Audio_Song___Deepika_Padukone___Ranveer_Singh___Goliyon_Ki_Raasleela_Ram-leela(256k).mp3",
    img: "./assets/images/Laal_isqh.jpg",
  },
  {
    artist: "Taaruk Raina",
    title: "Kho Gaye",
    song: "./assets/Music/Kho_gaye.mp3",
    img: "./assets/images/kho_gaye.jpg",
  },
  {
    artist: "Arijit Singh",
    title: "Aayat",
    song: "./assets/Music/Lyrical__Aayat___Full_Song_with_Lyrics___Bajirao_Mastani(256k).mp3",
    img: "./assets/images/aayat.jpg",
  },
  {
    artist: "K.S Harisankar",
    title: "Pavizha Mazha",
    song: "./assets/Music/pavizha.mp3",
    img: "./assets/images/pavizha.jpg",
  },
  {
    artist: "Javed Bashir",
    title: "Aaj Ibaadat",
    song: "./assets/Music/Aaj_Ibaadat__Lyrical_Full_Song____Bajirao_Mastani___Ranveer_Singh___Deepika_Padukone(256k).mp3",
    img: "./assets/images/aayat.jpg",
  },
];

const PlayMusic = () => {
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("animation");
};

const PauseMusic = () => {
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("animation");
};

play.addEventListener("click", () => {
  playController();

  isPlaying ? PlayMusic() : PauseMusic();
});

function playController() {
  isPlaying = !isPlaying;
}

const loadSongs = (song) => {
  artist.textContent = song.artist;
  songTitle.textContent = song.title;
  music.src = `${song.song}`;
  img.src = `${song.img}`;
};

next.addEventListener("click", () => {
  nextSong();
});
loadSongs(songs[index]);

previous.addEventListener("click", () => {
  previousSong();
});

const nextSong = () => {
  index++;

  if (index === songs.length) {
    index = 0;
    loadSongs(songs[index]);
    PlayMusic();
    isPlaying = true;
  } else {
    loadSongs(songs[index]);
    PlayMusic();
    isPlaying = true;
  }
};

const previousSong = () => {
  index--;

  if (index <= -1) {
    index = 0;
    loadSongs(songs[index]);
  }

  loadSongs(songs[index]);
  PlayMusic();
};

music.addEventListener("timeupdate", (e) => {
  const { currentTime, duration } = e.srcElement;

  let progress_time = (currentTime / duration) * 100;
  dot.style.width = `${progress_time}%`;
  const min = Math.floor(duration / 60);
  const secs = Math.floor(duration % 60);

  let tot_time = `${min}:${secs}`;

  if (duration) {
    duration_currently.textContent = `${tot_time}`;
  } else {
    duration_currently.textContent = `4:16`;
  }

  let currentSec = Math.round(currentTime);

  if (currentSec < 10) {
    current_duration.textContent = `00:0${currentSec}`;
  } else if (currentSec >= 60) {
    const minutes = Math.floor(currentSec / 60);
    const seconds = Math.floor(currentSec % 60);
    current_duration.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  } else {
    current_duration.textContent = `00:${
      currentSec < 10 ? "0" : ""
    }${currentSec}`;
  }
});

progressbar.addEventListener("click", (e) => {
  const total_width = e.srcElement.clientWidth;
  const offsetX = e.offsetX;
  const { duration } = music;
  console.log(duration);
  const position = Math.round((offsetX / total_width) * duration);
  console.log(position);
  dot.style.width = `${position}%`;

  music.currentTime = position;
});

music.addEventListener("ended", () => {
  nextSong();
});

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    if (isPlaying) {
      PauseMusic();
      isPlaying = !isPlaying;
    } else {
      PlayMusic();
      isPlaying = !isPlaying;
    }
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowRight") {
    // Skip forward by 10 seconds
    music.currentTime += 10;
  } else if (event.key === "ArrowLeft") {
    // Skip backward by 10 seconds
    music.currentTime -= 10;
  } else if (event.key === "ArrowUp") {
    // Increase volume by 10%
    music.volume = Math.min(1, music.volume + 0.1);
  } else if (event.key === "ArrowDown") {
    // Decrease volume by 10%
    music.volume = Math.max(0, music.volume - 0.1);
  }
});

playlist.addEventListener("click", () => {
  playlistVisibility
    ? (playlist_songs.style.display = "block")
    : (playlist_songs.style.display = "none");
  playlistVisibility = !playlistVisibility;
});

songTitles.forEach((title, i) => {
  title.addEventListener("click", (event) => {
    const clickedSongTitle = event.target.textContent.toUpperCase();
    const foundSong = songs.find(
      (song) => song.title.toUpperCase() === clickedSongTitle
    );
    if (foundSong) {
      console.log("Found song in playlist:", foundSong.song);
      artist.textContent = foundSong.artist;
      songTitle.textContent = foundSong.title;
      music.src = `${foundSong.song}`;
      img.src = `${foundSong.img}`;
      index = i;
      playlist_songs.style.display = "none";

      PlayMusic();
      isPlaying = true;
      playlistVisibility = !playlistVisibility;
    } else {
      console.log("Song not found in playlist");
    }
  });
});
