// ===== GET ELEMENTS =====
const audio = document.getElementById("audioPlayer");
audio.crossOrigin = "anonymous";
const currentMantraText = document.getElementById("currentMantra");
const currentTimeText = document.getElementById("currentTime");
const totalTimeText = document.getElementById("totalTime");

// ===== PLAYLIST =====
const mantras = [
  { name: "Ganesh stotram", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/gayatri_mantra.mp3" },
  { name: "Ganesh pancharatnam", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/ganesha_pancharatnam.mp3" },
  { name: "vishnu_sahasranamam", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/vishnu_sahasranamam.mp3" },
  { name: "venkateswara_suprabhatham", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/suprabhatham.mp3" },
  { name: "Guruvayoor Ekadashi", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/guruvayoor.mp3" },
  { name: "ashtalakshmi", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/ashtalakshmi_stotram.mp3" },
  { name: "lalitha sahasranamam", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/lalitha_sahasranamam.mp3" },
  { name: "Karagre vasate", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/karagre.mp3" },
  { name: "kuber_ashtalakshmi", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/kuber.mp3" },
  { name: "dhanwantari", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/knnnnttccirunn_bhgvaani.mp3" },
  { name: "mrityunjaya_mantra", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/maha_mrityunjaya.mp3" },
  { name: "sai_mantra", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/sai.mp3" },
  { name: "Bhadrakali", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/bhdrkaalli.mp3" },
  { name: "mookabika_ashtakam", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/mookabika.mp3" },
  { name: "Hanuman chalisa", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/hanuman_chalisa.mp3" },
  { name: "Harivarasanam", file: "https://elhgzffxdadlyiplxwnk.supabase.co/storage/v1/object/public/mantras-divine/harivarasanam.mp3" },
];

let currentIndex = 0;
let isPlaying = false;

// ===== FORMAT TIME =====
function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// ===== LOAD SONG =====
function loadSong(index) {
  audio.src = mantras[index].file;
  currentMantraText.innerText = mantras[index].name;
  audio.load();
}

// ===== START =====
function startChant() {
  isPlaying = true;
  loadSong(currentIndex);
  audio.play().catch(error => {
    console.log("Playback error:", error);
  });
}

// ===== STOP =====
function stopChant() {
  isPlaying = false;
  audio.pause();
}

// ===== NEXT =====
function nextSong() {
  currentIndex++;
  if (currentIndex >= mantras.length) {
    currentIndex = 0;
  }
  loadSong(currentIndex);
  if (isPlaying) audio.play();
}

// ===== PREVIOUS =====
function previousSong() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = mantras.length - 1;
  }
  loadSong(currentIndex);
  if (isPlaying) audio.play();
}

// ===== RESET =====
function resetPlaylist() {
  currentIndex = 0;
  loadSong(currentIndex);
  audio.currentTime = 0;
  if (isPlaying) audio.play();
}

// ===== AUTO NEXT WHEN SONG ENDS =====
audio.addEventListener("ended", () => {
  if (isPlaying) {
    nextSong();
  }
});

// ===== UPDATE TIME =====
audio.addEventListener("loadedmetadata", () => {
  totalTimeText.innerText = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTimeText.innerText = formatTime(audio.currentTime);
});