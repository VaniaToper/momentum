import { isChecked } from '../index.js';
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherWind = document.querySelector('.wind');
const weatherHumidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');
const settingsCheckbox = document.querySelector('.settings-lang');
city.value = localStorage.getItem('town');
let language;
settingsCheckbox.addEventListener('change', () => {
  language = isChecked(settingsCheckbox, 'ru', 'en');
  getWeather(language);
});
city.value = 'Minsk'
async function getWeather(lang = 'en') {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=404aa4276ea9b5257a6608fa41b63388&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.message) {
    weatherError.innerHTML =
      data.message.charAt(0).toUpperCase() + data.message.slice(1);
    weatherDescription.textContent = '';
    weatherHumidity.textContent = '';
    weatherWind.textContent = '';
    temperature.textContent = '';
    weatherIcon.style.display = 'none';
  } else weatherError.innerHTML = '';
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.style.display = 'block';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  if (lang === 'ru') {
    if (city.value === 'Minsk') city.value = 'Минск';
    city.placeholder = 'Введите город';
    temperature.textContent = `Температура ${Math.round(data.main.temp)}°C`;
    weatherWind.textContent = `Ветер ${Math.round(data.wind.speed)} m/s`;
    weatherHumidity.textContent = `Влажность ${Math.round(
      data.main.humidity
    )}%`;
  } else {
    if (city.value === 'Минск') city.value = 'Minsk';
    city.placeholder = 'Enter city';
    temperature.textContent = `Temperature ${Math.round(data.main.temp)}°C`;
    weatherWind.textContent = `Wind ${Math.round(data.wind.speed)} m/s`;
    weatherHumidity.textContent = `Humidity ${Math.round(data.main.humidity)}%`;
  }

  weatherDescription.textContent =
    data.weather[0].description.charAt(0).toUpperCase() +
    data.weather[0].description.slice(1);
}
// settingsCheckbox.addEventListener('change', () => {
//   let language = isChecked(settingsCheckbox, 'en', 'ru');
//   getWeather(language);
// });
getWeather();

city.addEventListener('change', () => {
  localStorage.setItem('town', city.value);
  getWeather(language);
});
