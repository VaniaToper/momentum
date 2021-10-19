const reloadButton = document.querySelector('.change-quote');
let deg = 0;
reloadButton.addEventListener('click', () => {
  deg = deg + 360;
  reloadButton.style.transform = `rotate(${deg}deg)`;
  console.log(deg);
});

// async function getQuotes() {  
//   const quotes = 'data.json';
//   const res = await fetch(quotes);
//   const data = await res.json(); 
//   console.log(data);
// }
// getQuotes();