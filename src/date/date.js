import { getRandomNum } from '../index.js';
import { isChecked } from '../index.js';
const timeMomentum = document.querySelector('.time');
const dateMomentum = document.querySelector('.date');
const greeting = document.querySelector('.greeting__text');
const greetingInput = document.querySelector('.greeting__name');
const wrapper = document.querySelector('.wrapper');
const slidePrev = document.querySelector('.slide-prev');
const settingsCheckbox = document.querySelector('.settings-lang');
const slideNext = document.querySelector('.slide-next');
let randomNum = getRandomNum(20, 2);

const getTimeOfDate = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  let lang = isChecked(settingsCheckbox, 'ru', 'en');
  if (lang === 'en') {
    if (hours >= 6 && hours <= 11 && minutes <= 59) {
      return 'Morning';
    }
    if (hours >= 12 && hours <= 17 && minutes <= 59) {
      return 'Day';
    }
    if (hours >= 18 && hours <= 23 && minutes <= 59) {
      return 'Evening';
    }
    if (hours >= 0 && hours <= 5 && minutes <= 59) {
      return 'Night';
    }
  } else {
    if (hours >= 6 && hours <= 11 && minutes <= 59) {
      return 'Доброе утро';
    }
    if (hours >= 12 && hours <= 17 && minutes <= 59) {
      return 'Добрый день';
    }
    if (hours >= 18 && hours <= 23 && minutes <= 59) {
      return 'Добрый вечер';
    }
    if (hours >= 0 && hours <= 5 && minutes <= 59) {
      return 'Доброй ночи';
    }
  }
};

const setBackground = (randomNum) => {
  const part = getTimeOfDate();
  const img = new Image();

  img.src = `/assets/img/${part.toLowerCase()}/${randomNum}.jpg`;
  img.addEventListener('load', () => {
    wrapper.style.background = `url("/assets/img/${part.toLowerCase()}/${randomNum}.jpg") center/cover`;
  });
};

setBackground(randomNum);
const getSlideNext = () => {
  if (randomNum < 20) {
    randomNum = (parseInt(randomNum) + 1).toString();
    randomNum = randomNum.padStart(2, '0');
  } else randomNum = '01';
  setBackground(randomNum);
};

const getSlidePrev = () => {
  if (randomNum > 1) {
    randomNum = (parseInt(randomNum) - 1).toString();
    randomNum = randomNum.padStart(2, '0');
  } else randomNum = '20';
  setBackground(randomNum);
};

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

const showTime = (lang = 'en-En') => {
  lang = isChecked(settingsCheckbox, 'ru-Ru', 'en-En');
  const date = new Date();
  const part = getTimeOfDate();
  greeting.textContent = `${part},`;
  const currentTime = date.toLocaleTimeString();
  const options = {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };
  const currentDate = date.toLocaleDateString(lang, options);
  timeMomentum.textContent = currentTime;
  dateMomentum.textContent = currentDate;
  setTimeout(showTime, 1000);
};
showTime();
function setLocalStorage() {
  localStorage.setItem('name', greetingInput.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    greetingInput.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);

// async function getLinkToImage() {
//   const url =
//     'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=I9t3C-gPIbaN7XhSRrja6qtBsnxHNkJBMQm7yvpk5rc';
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data.urls.regular);
// }

// getLinkToImage();
