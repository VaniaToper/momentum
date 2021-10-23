const settingsCheckbox = document.querySelector('.settings-lang');
export const getRandomNum = (max = 20, count = 1) => {
  let randomNum = Math.ceil(Math.random() * max).toString();
  randomNum = randomNum.padStart(count, '0');
  return randomNum;
};
export const isChecked = (checkbox, on, off) => {
  if (checkbox.checked){
    return on
  } return off
};
