const timeMomentum = document.querySelector('.time');
const dateMomentum = document.querySelector('.date');
const greeting = document.querySelector('.greeting__text');
const greetingInput = document.querySelector('.greeting__name');
const wrapper = document.querySelector('.wrapper');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
let randomNum;

const getTimeOfDate = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (hours >= 6 && hours <= 11 && minutes <= 59) {
    return (part = 'Morning');
  }
  if (hours >= 12 && hours <= 17 && minutes <= 59) {
    return (part = 'Day');
  }
  if (hours >= 18 && hours <= 23 && minutes <= 59) {
    return (part = 'Evening');
  }
  if (hours >= 0 && hours <= 5 && minutes <= 59) {
    return (part = 'Night');
  }
};

const getRandomNum = (() => {
  randomNum = Math.ceil(Math.random() * 20).toString();
  randomNum = randomNum.padStart(2, '0');
  return randomNum;
})();

const setBackground = () => {
  getTimeOfDate();
  const img = new Image();
  img.src = `/assets/img/${part.toLowerCase()}/${randomNum}.jpg`;
  img.addEventListener('load', () => {
    wrapper.style.background = `url("/assets/img/${part.toLowerCase()}/${randomNum}.jpg") center/cover`;
  });
};

setBackground();
const getSlideNext = () => {
  if (randomNum < 20) {
    randomNum = (parseInt(randomNum) + 1).toString();
    randomNum = randomNum.padStart(2, '0');
  } else randomNum = '01';
  setBackground();
};

const getSlidePrev = () => {
  if (randomNum > 1) {
    randomNum = (parseInt(randomNum) - 1).toString();
    randomNum = randomNum.padStart(2, '0');
  } else randomNum = '20';
  setBackground();
};

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

const showTime = () => {
  const date = new Date();
  getTimeOfDate();
  greeting.textContent = `Good ${part},`;
  const currentTime = date.toLocaleTimeString();
  const options = {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };
  const currentDate = date.toLocaleDateString('ru-Ru', options);
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
