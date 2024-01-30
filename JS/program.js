//const is used because the links won't be changed when page is working
const promMessages =
  ["Join Hong Kong Industrial University's College of Science for world-class education and research opportunities in science and technology! 20 QUOTAS LEFT!",
    "Join the future of engineering with Hong Kong Industrial University's College of Engineering, offering innovative programs and world-class faculty to prepare you for success in the field! 40 QUOTAS LEFT!",
    "Join the future of interdisciplinary studies with Hong Kong Industrial University's College of Interdisciplinary Studies, offering innovative programs and world-class faculty to prepare you for success in various fields! 30 QUOTAS LEFT!"];

const videoSources = ["https://personal.cs.cityu.edu.hk/~cs2204/2023/video/video1.mp4",
  "https://personal.cs.cityu.edu.hk/~cs2204/2023/video/video2.mp4"];

const videoBackup = ["https://personal.cs.cityu.edu.hk/~cs2204/2023/video/video1.mkv",
  "https://personal.cs.cityu.edu.hk/~cs2204/2023/video/video2.mkv"];

function shuffle(array) {
  var currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

shuffle(promMessages);

//keep track of the current displayed message
var indexOfText = 0;

function SetTextToElement() {
  if (indexOfText >= promMessages.length - 1) {
    indexOfText = 0;
  }
  else {
    indexOfText++;
  }
  document.getElementById("text-header").innerHTML = promMessages[indexOfText];
}

//setting video and its sources and
var video = null;
var key = 0;

function PlayVideo(videoIndex = 0) {
  var source = document.getElementById("video-source");
  source.setAttribute("src", videoSources[videoIndex]);
  source.setAttribute("type", "video/mp4");

  var backupSource = document.getElementById("backup-video");
  backupSource.setAttribute("src", videoBackup[videoIndex]);
  backupSource.setAttribute("type", "video/mkv");

  video.autoplay = true;
  video.load();
  video.play();
}

function NextVideo() {
  key++;
  if (key == videoSources.length) {
    key = 0;
    PlayVideo(key);
  } else {
    PlayVideo(key);
  }
}

function SiteLoad() {
  video = document.getElementById("video");

  setInterval(SetTextToElement, 3000);
  PlayVideo();

  document.getElementById('video').addEventListener('ended', NextVideo, false);
}
