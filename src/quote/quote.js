const reloadButton = document.querySelector('.change-quote');
let deg = 0
reloadButton.addEventListener('click', () => {
    deg = deg + 360
    reloadButton.style.transform = `rotate(${deg}deg)`
    console.log(deg);
});
