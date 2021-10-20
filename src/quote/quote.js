const reloadButton = document.querySelector('.change-quote');
const quoteText = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
let randomNum = 0;
let deg = 0;

async function getQuotes() {
  const quotes = '/src/quote/data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  const getRandomNum = (() => {
    randomNum = Math.ceil(Math.random() * data.length);
    return randomNum;
  })();
  quoteText.innerHTML = data[randomNum].text;
  quoteAuthor.innerHTML = data[randomNum].author;
}
getQuotes();

reloadButton.addEventListener('click', () => {
  deg = deg + 360;
  reloadButton.style.transform = `rotate(${deg}deg)`;
  getQuotes();
});

