import { getRandomNum, isChecked } from '../index.js';
const reloadButton = document.querySelector('.change-quote');
const quoteText = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const settingsCheckbox = document.querySelector('.settings-lang');
let deg = 0;
let language;

settingsCheckbox.addEventListener('change', () => {
  language = isChecked(settingsCheckbox, 'Ru', 'En');
  getQuotes(language);
});

async function getQuotes(lang = 'En') {
  const quotes = `src/quote/quotes${lang}.json`;
  const res = await fetch(quotes);
  const data = await res.json();
  let randomNum = getRandomNum(data.length - 1, 1);
  quoteText.innerHTML = data[randomNum].text;
  quoteAuthor.innerHTML = data[randomNum].author;
}
getQuotes(language);

reloadButton.addEventListener('click', () => {
  deg = deg + 360;
  reloadButton.style.transform = `rotate(${deg}deg)`;
  getQuotes(language);
});
