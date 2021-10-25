import { isChecked } from '../index.js';
const settingsButtonOpen = document.querySelector('.settings-button-open');
const settingsButtonClose = document.querySelector('.settings-button-close');
const player = document.querySelector('.player');
const weather = document.querySelector('.weather');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greetingBlock = document.querySelector('.greeting');
const quote = document.querySelector('.quote-block');
const settingsBlock = document.querySelector('.settings');
const todo = document.querySelector('.todo__body');
const checkboxList = document.querySelectorAll('.settings-checkbox');
const blockList = [player, time, date, quote, greetingBlock, weather, todo];
const settingsCheckbox = document.querySelector('.settings-lang');
const settingsCheckboxLabel = document.querySelectorAll('.label-text');
const imageAPITag = document.querySelector('.image-API__tag');
const settingsHeader = document.querySelector('.settings__header');
const settingsHideBlock = document.querySelector('.settings__hide-blocks');
const imageAPIRadio = document.querySelectorAll('.image-API__radio');
const imageAPI = document.querySelector('.image-API');
let language;
const loadLocalStorage = () => {
  for (let i = 0; i < checkboxList.length; i++) {
    checkboxList[i].checked = localStorage.getItem(`checkbox${i}`) == 'true';
  }
  for (let k = 0; k < imageAPIRadio.length; k++) {
    imageAPIRadio[k].checked = localStorage.getItem(`imageAPI${k}`) == 'true';
  }
  imageAPITag.value = localStorage.getItem('tag');
  settingsCheckbox.checked = localStorage.getItem('lang') == 'true';
};
loadLocalStorage();

const setLocalStorage = () => {
  for (let i = 0; i < checkboxList.length; i++) {
    localStorage.setItem(`checkbox${i}`, checkboxList[i].checked);
  }
  for (let i = 0; i < imageAPIRadio.length; i++) {
    localStorage.setItem(`imageAPI${i}`, imageAPIRadio[i].checked);
  }
  if (imageAPITag.value != '') {
    localStorage.setItem('tag', imageAPITag.value);
  }
  localStorage.setItem('lang', settingsCheckbox.checked);
};
window.addEventListener('beforeunload', setLocalStorage);

const changeLanguage = (lang = 'En') => {
  if (lang === 'En') {
    settingsCheckboxLabel[0].innerHTML = 'Player';
    settingsCheckboxLabel[1].innerHTML = 'Time';
    settingsCheckboxLabel[2].innerHTML = 'Date';
    settingsCheckboxLabel[3].innerHTML = 'Quote';
    settingsCheckboxLabel[4].innerHTML = 'Greeting';
    settingsCheckboxLabel[5].innerHTML = 'Weather';
    settingsCheckboxLabel[6].innerHTML = 'ToDo';
    imageAPITag.placeholder = 'Enter tag';
    settingsHeader.innerHTML = 'Settings';
  } else {
    settingsCheckboxLabel[0].innerHTML = 'Плеер';
    settingsCheckboxLabel[1].innerHTML = 'Время';
    settingsCheckboxLabel[2].innerHTML = 'Дата';
    settingsCheckboxLabel[3].innerHTML = 'Цитаты';
    settingsCheckboxLabel[4].innerHTML = 'Приветствие';
    settingsCheckboxLabel[5].innerHTML = 'Погода';
    settingsCheckboxLabel[6].innerHTML = 'Список дел';
    imageAPITag.placeholder = 'Введите тег';
    settingsHeader.innerHTML = 'Настройки';
  }
};
changeLanguage();
settingsCheckbox.addEventListener('change', () => {
  language = isChecked(settingsCheckbox, 'Ru', 'En');
  changeLanguage(language);
});

for (let i = 0; i < checkboxList.length; i++) {
  checkboxList[i].addEventListener('click', () => {
    if (checkboxList[i].checked) {
      blockList[i].style.opacity = '1';
      blockList[i].style.visibility = 'visible';
    } else {
      blockList[i].style.transition = '0.2s';
      blockList[i].style.opacity = '0';
      blockList[i].style.visibility = 'hidden';
    }
  });
}

const openSettings = () => {
  settingsBlock.classList.remove('anim-close');
  settingsBlock.classList.add('anim-open');
  settingsBlock.style.display = 'block';
  settingsBlock.style.transform = 'translateY(-50%)';
  settingsBlock.style.opacity = '1';
};
const closeSettings = () => {
  settingsBlock.classList.remove('anim-open');
  settingsBlock.classList.add('anim-close');
  settingsBlock.style.display = 'none';
  settingsBlock.style.transform = 'translateY(0%)';
  settingsBlock.style.opacity = '0';
};
settingsButtonOpen.addEventListener('click', openSettings);
settingsButtonClose.addEventListener('click', closeSettings);
