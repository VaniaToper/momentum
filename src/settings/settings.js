const settingsButtonOpen = document.querySelector('.settings-button-open');
const settingsButtonClose = document.querySelector('.settings-button-close');
const player = document.querySelector('.player');
const weather = document.querySelector('.weather');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greetingBlock = document.querySelector('.greeting');
const quote = document.querySelector('.quote-block');
const settingsBlock = document.querySelector('.settings');
const checkboxList = document.querySelectorAll('.settings-checkbox');
const blockList = [player, time, date, quote, greetingBlock, weather];

for (let i = 0; i < checkboxList.length; i++) {
  checkboxList[i].addEventListener('click', () => {
    if (checkboxList[i].checked) {
      blockList[i].style.transition = '0.2s'
      blockList[i].style.opacity = '0';
      blockList[i].style.visibility = 'hidden';
    } else {
      blockList[i].style.opacity = '1';
      blockList[i].style.visibility = 'visible';
    }
  });
}

const openSettings = () => {
  settingsBlock.classList.remove('anim-close')
  settingsBlock.classList.add('anim-open')
  settingsBlock.style.display = 'block';
  settingsBlock.style.transform = 'translateY(-50%)';
  settingsBlock.style.opacity = '1';
};
const closeSettings = () => {
  settingsBlock.classList.remove('anim-open')
  settingsBlock.classList.add('anim-close')
  settingsBlock.style.display = 'none';
  settingsBlock.style.transform = 'translateY(0%)';
  settingsBlock.style.opacity = '0';
};
settingsButtonOpen.addEventListener('click', openSettings);
settingsButtonClose.addEventListener('click', closeSettings);
