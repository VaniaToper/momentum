const todoInput = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo__list');
const todoButton = document.querySelector('.todo__button');
const todoPlaceholder = document.querySelector('.todo__list__placeholder');
const todoBody = document.querySelector('.todo');
let i = 0;

function setLocalStorage() {
  localStorage.setItem('todoElements', todoList.innerHTML);
  createToDo();
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('todoElements')) {
    todoList.innerHTML = localStorage.getItem('todoElements');
    createToDo();
  }
}
window.addEventListener('load', getLocalStorage);

const createToDo = () => {
  if (todoInput.value != '') {
    todoList.innerHTML += `  <li class="todo__list__item">
    <div class="todo__list__label"><input type="checkbox" class="todo__list__checkbox" id="${++i}">
    <label for="${i}" data-content="${todoInput.value}">${
      todoInput.value
    }</label></div><button class="todo__delete"></button>
  </li>`;
  }
  todoList.style.overflowY = 'scroll';
  removeToDoEl();
};

todoInput.addEventListener('change', createToDo);

const toggleTodo = () => {
  todoBody.classList.toggle('open');
};
todoButton.addEventListener('click', toggleTodo);
const removeToDoEl = () => {
  let todoButtonDelete = document.querySelectorAll('.todo__delete');
  let todoListItem = document.querySelectorAll('.todo__list__item');
  for (let i = 0; i < todoButtonDelete.length; i++) {
    todoButtonDelete[i].addEventListener('click', () => {
      todoListItem[i].remove();
    });
  }
};
