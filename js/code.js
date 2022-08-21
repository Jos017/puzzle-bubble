const instructionsBtn = document.getElementById('instructions-btn');
const instructionsModal = document.getElementById('instructions-modal');
const instructionsModalCloseBtn = document.querySelector('#instructions .close');
const aboutBtn = document.getElementById('about-btn');
const aboutModal = document.getElementById('about-modal');
const aboutModalCloseBtn = document.querySelector('#about .close');
const exitBtn = document.getElementById('exit-btn');

instructionsBtn.addEventListener('click', () => {
  instructionsModal.style.display = 'block';
});
instructionsModal.addEventListener('click', () => {
  instructionsModal.style.display = 'none'
});
instructionsModalCloseBtn.addEventListener('click', () => {
  instructionsModal.style.display = 'none';
});

aboutBtn.addEventListener('click', () => {
  aboutModal.style.display = 'block';
});
aboutModal.addEventListener('click', () => {
  aboutModal.style.display = 'none';
});
aboutModalCloseBtn.addEventListener('click', () => {
  aboutModal.style.display = 'none';
});



// exitBtn.addEventListener('click', () => {});
