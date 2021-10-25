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
const imageAPIRadio1 = document.querySelector('#rb1');
const imageAPIRadio2 = document.querySelector('#rb2');
const imageAPIRadio3 = document.querySelector('#rb3');
const imageAPITag = document.querySelector('.image-API__tag');

let randomNum = getRandomNum(20, 1);
const getTimeOfDate = () => {
  let partOfDayObject = {
    part: 'x',
    greeting: 'z',
  };
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  let lang = isChecked(settingsCheckbox, 'ru', 'en');
  if (lang === 'en') {
    greetingInput.placeholder = 'enter name';
    if (hours >= 6 && hours <= 11 && minutes <= 59) {
      partOfDayObject.part = 'morning';
      partOfDayObject.greeting = 'Good morning';
      return partOfDayObject;
    }
    if (hours >= 12 && hours <= 17 && minutes <= 59) {
      partOfDayObject.part = 'day';
      partOfDayObject.greeting = 'Good afternoon ';
      return partOfDayObject;
    }
    if (hours >= 18 && hours <= 23 && minutes <= 59) {
      partOfDayObject.part = 'evening';
      partOfDayObject.greeting = 'Good evening';
      return partOfDayObject;
    }
    if (hours >= 0 && hours <= 5 && minutes <= 59) {
      partOfDayObject.part = 'night';
      partOfDayObject.greeting = 'Good night';
      return partOfDayObject;
    }
  } else {
    greetingInput.placeholder = 'введите имя';
    if (hours >= 6 && hours <= 11 && minutes <= 59) {
      partOfDayObject.part = 'morning';
      partOfDayObject.greeting = 'Доброе утро';
      return partOfDayObject;
    }
    if (hours >= 12 && hours <= 17 && minutes <= 59) {
      partOfDayObject.part = 'day';
      partOfDayObject.greeting = 'Добрый день';
      return partOfDayObject;
    }
    if (hours >= 18 && hours <= 23 && minutes <= 59) {
      partOfDayObject.part = 'evening';
      partOfDayObject.greeting = 'Добрый вечер';
      return partOfDayObject;
    }
    if (hours >= 0 && hours <= 5 && minutes <= 59) {
      partOfDayObject.part = 'night';
      partOfDayObject.greeting = 'Доброй ночи';
      return partOfDayObject;
    }
  }
};

const setBackground = (randomNum) => {
  let part = getTimeOfDate();
  const img = new Image();
  img.src = `assets/img/${part.part}/${randomNum}.jpg`;
  img.addEventListener('load', () => {
    wrapper.style.background = `url("assets/img/${part.part}/${randomNum}.jpg") center/cover`;
  });
};
setBackground(randomNum);

async function getUnsplashImage(tag) {
  let part = getTimeOfDate();
  if (imageAPITag.value != '') {
    tag = imageAPITag.value;
  } else tag = part.part;
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=I9t3C-gPIbaN7XhSRrja6qtBsnxHNkJBMQm7yvpk5rc`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  console.log(data.urls.regular);
  img.src = `${data.urls.regular}`;
  img.addEventListener('load', () => {
    wrapper.style.backgroundImage = `url(${data.urls.regular})`;
    console.log('asd');
  });
}

async function getFlickrImage(randomNum, tag) {
  let part = getTimeOfDate();
  if (imageAPITag.value != '') {
    tag = imageAPITag.value;
  } else tag = 'momentum' + part.part;
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7ae4d952a108e7d3aee45fb6cb25684c&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  let imgURL = data.photos.photo[randomNum].url_l;
  const img = new Image();
  img.src = `${imgURL}`;
  img.addEventListener('load', () => {
    wrapper.style.backgroundImage = `url(${imgURL})`;
  });
}

const getSlideNext = () => {
  if (randomNum < 20) {
    randomNum = (parseInt(randomNum) + 1).toString();
  } else randomNum = '1';
  if (imageAPIRadio1.checked) {
    setBackground(randomNum);
  }
  if (imageAPIRadio2.checked) {
    getFlickrImage(randomNum);
  }
  if (imageAPIRadio3.checked) {
    getUnsplashImage();
  }
};

const getSlidePrev = () => {
  if (randomNum > 1) {
    randomNum = (parseInt(randomNum) - 1).toString();
  } else randomNum = '20';
  if (imageAPIRadio1.checked) {
    setBackground(randomNum);
  }
  if (imageAPIRadio2.checked) {
    getUnsplashImage();
  }
  if (imageAPIRadio3.checked) {
    getFlickrImage(randomNum);
  }
};

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
const dayListEn = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const dayListRu = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];
const showTime = (lang = 'en-En', dayArr) => {
  lang = isChecked(settingsCheckbox, 'ru-Ru', 'en-En');
  dayArr = isChecked(settingsCheckbox, dayListRu, dayListEn);
  const date = new Date();
  let greetingText = getTimeOfDate();
  greeting.textContent = `${greetingText.greeting},`;
  const currentTime = date.toLocaleTimeString();
  const options = {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };
  const currentDate = date.toLocaleDateString(lang, options);
  timeMomentum.textContent = currentTime;
  dateMomentum.textContent = dayArr[new Date().getDay()] + ', ' + currentDate;
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
