const playBtn = document.getElementById('play-btn');
const instructionsBtn = document.getElementById('instructions-btn');
const instructionsModal = document.getElementById('instructions-modal');
const instructionsModalCloseBtn = document.querySelector('#instructions .close');
const aboutBtn = document.getElementById('about-btn');
const aboutModal = document.getElementById('about-modal');
const aboutModalCloseBtn = document.querySelector('#about .close');
const exitBtn = document.getElementById('exit-btn');

const bgAudio = document.getElementById('bg-audio');
bgAudio.volume = 0.04  ;
const audioOnHover = new Audio('./sounds/buttons-sound.wav');
audioOnHover.volume = 0.4;
const audioOnClick = new Audio('./sounds/pop-click.wav');
audioOnClick.volume = 0.4;
const soundBtnImg = document.querySelector('#sound-btn img');
const soundBtn = document.getElementById('sound-btn');

soundBtn.addEventListener('click', () => {
  if (soundBtn.classList.contains('muted')) {
    soundBtnImg.src = './images/sound.png';
    soundBtn.classList.toggle('muted');
    bgAudio.play();
  } else {
    soundBtnImg.src = './images/mute.png';
    soundBtn.classList.toggle('muted');
    bgAudio.pause();
  }
});

playBtn.addEventListener('mouseenter', () => {
  audioOnHover.play();
});
instructionsBtn.addEventListener('mouseenter', () => {
  audioOnHover.play();
});
aboutBtn.addEventListener('mouseenter', () => {
  audioOnHover.play();
});
exitBtn.addEventListener('mouseenter', () => {
  audioOnHover.play();
});

playBtn.addEventListener('click', () => {
  audioOnClick.play();
});
instructionsBtn.addEventListener('click', () => {
  instructionsModal.style.display = 'block';
  audioOnClick.play();
});
instructionsModal.addEventListener('click', () => {
  instructionsModal.style.display = 'none'
});
instructionsModalCloseBtn.addEventListener('click', () => {
  instructionsModal.style.display = 'none';
});

aboutBtn.addEventListener('click', () => {
  aboutModal.style.display = 'block';
  audioOnClick.play();
});
aboutModal.addEventListener('click', () => {
  aboutModal.style.display = 'none';
});
aboutModalCloseBtn.addEventListener('click', () => {
  aboutModal.style.display = 'none';
});
exitBtn.addEventListener('click', () => {
  audioOnClick.play();
});
