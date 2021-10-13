const timeMomentum = document.querySelector('.time');
const dateMomentum = document.querySelector('.date');
const greeting = document.querySelector('.greeting__text');
const wrapper = document.querySelector('.wrapper');

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

const getRandomNum = (max) => {
  num = Math.ceil(Math.random() * max).toString();
  return num;
};

const setBackground = () => {
  getTimeOfDate();
  getRandomNum(20);
  num = num.padStart(2, '0');
  wrapper.style.background = `url("/assets/img/${part.toLowerCase()}/${num}.jpg") center/cover, rgba(0, 0, 0, 0.5)`;
};
setBackground();

const showTime = () => {
  const date = new Date();
  getTimeOfDate();
  greeting.textContent = `Good ${part} ,`;
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
