const timeMomentum = document.querySelector('.time');
const dateMomentum = document.querySelector('.date');

function showTime() {
  const date = new Date();
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

}
showTime();

// timeMomentum.addEventListener('mousemove', () => {
//   timeMomentum.innerHTML =
//     timeMomentum.textContent[0] +
//     timeMomentum.textContent[1] +
//     timeMomentum.textContent[2] +
//     timeMomentum.textContent[3] +
//     timeMomentum.textContent[4] +
//     `<span>` +
//     timeMomentum.textContent[5] +
//     timeMomentum.textContent[6] +
//     timeMomentum.textContent[7] +
//     `</span>`;
// });
// timeMomentum.addEventListener('mouseleave', () => {
//   timeMomentum.innerHTML =
//     timeMomentum.textContent[0] +
//     timeMomentum.textContent[1] +
//     timeMomentum.textContent[2] +
//     timeMomentum.textContent[3] +
//     timeMomentum.textContent[4] +
//     `<p>` +
//     timeMomentum.textContent[5] +
//     timeMomentum.textContent[6] +
//     timeMomentum.textContent[7] +
//     `</p>`;
// });
