const form = document.querySelector('#form');

const taskInput = document.querySelector('#taskInput');

const taskList = document.querySelector('#taskList');

let globalArr = [];

if (localStorage.getItem('globalArr')) {
  globalArr = JSON.parse(localStorage.getItem('globalArr'));

  renderTodos(globalArr);
}

form.addEventListener('submit', addTask);

function addTask(event) {
  event.preventDefault(); // отменяет стандартное поведение

  const taskText = taskInput.value; // текст задачи из поля ввода


  let id = Math.random();

  let newObject = {
    id: id,
    text: taskText,
    isComplete: false,
  };

  globalArr.push(newObject);


  filterAndSearchTodo();
  

  taskInput.value = '' // очистка поля ввода и возвращение на него фокуса
  taskInput.focus();

  saveToLocalStorage();
}

function closeTask(event, id) {
  let elementTodo = event.target.closest('.block__text');
  elementTodo.remove();
  
  globalArr = globalArr.filter((el, i, arr) => {
    return el.id !== id;
  })

  saveToLocalStorage()
}

function completeTask(event, id) {
  let elementCheck = event.target.closest('.block__text');
  elementCheck.classList.toggle('_checked');

  globalArr.forEach((el, i, arr) => {
    if (el.id === id && el.isComplete === false) return el.isComplete = true;
    if (el.id === id && el.isComplete === true) return el.isComplete = false;
  })

  saveToLocalStorage()
}



function renderTodos(globalArr) {

  const nodesChild = document.querySelectorAll('.block__text');

  nodesChild.forEach(el => {
    el.remove();
  })



  globalArr.forEach((el, i, arr) => {
    let taskHtml = `<li class="block__text ${el.isComplete === true ? '_checked' : ''}">
                      <div class="text__wrapper" >
                        <span>${el.text}</span>
                      </div>
                      <div class="button__wrapper">
                        <button class="btn__icon complete">
                          <img src="icons/yes.png" alt="pic">
                        </button>
                        <button class="btn__icon close">
                          <img src="icons/no.png" alt="pic">
                        </button>
                      </div>
                    </li>`
    taskList.insertAdjacentHTML('beforeend', taskHtml);

    let todoList = document.querySelectorAll('.block__text');

    todoList[todoList.length-1].querySelector('.complete').addEventListener('click', (event) => completeTask(event, el.id));
    todoList[todoList.length-1].querySelector('.close').addEventListener('click', (event) => closeTask(event, el.id));
  })
}


const select = document.querySelector('#select');

select.addEventListener('change', filterAndSearchTodo);

function chooseSelect(globalArrCopy) {
  let selectValue = select.value;

  let sortedTodos = [];

  switch (selectValue) {
    case 'All':
      sortedTodos = globalArrCopy;
      break;
    case 'Completed':
      sortedTodos = globalArrCopy.filter((el, i, arr) => {
        return el.isComplete === true;
      })
      break;
    case 'Uncompleted':
      sortedTodos = globalArrCopy.filter((el, i, arr) => {
        return el.isComplete === false;
      })
      break;
  }

  return sortedTodos;
}


const searchInput = document.querySelector('#searchInput');

const searchBtn = document.querySelector('.search__button');

searchBtn.addEventListener('click', clearInput);

function clearInput(event) {
  searchInput.value = '';

  filterAndSearchTodo();
}


searchInput.addEventListener('input', filterAndSearchTodo);

function searchTodo(globalArrCopy) {
  let searchText = searchInput.value.toLowerCase();

  let searchArr = [];

  searchArr = globalArrCopy.filter(el => {
    let lowerText = el.text.toLowerCase()
    return lowerText.includes(searchText);
  })

  return searchArr;
}


function filterAndSearchTodo() {
  let globalArrCopy = [...globalArr];

  globalArrCopy = chooseSelect(globalArrCopy);

  globalArrCopy = searchTodo(globalArrCopy);

  renderTodos(globalArrCopy);
}


function saveToLocalStorage() {
  localStorage.setItem('globalArr', JSON.stringify(globalArr));
}


const portionSize = 5;

let offset = 0;


const loadButton = document.querySelector('.load__button');

loadButton.addEventListener('click', loadTodos);

async function loadTodos(event) {

  const loader = document.querySelector('.loading');

  loader.classList.add('_show');

  let loadTodosArr = [];
  loadTodosArr = await getTodo();

  let newLoadTodosArr = loadTodosArr.map((el, i, arr) => {
    return {
      id: el.id,
      text: el.title,
      isComplete: el.completed,
    };
  })

  globalArr = [...globalArr, ...newLoadTodosArr];

  filterAndSearchTodo();

  loader.style.display = 'none';

  offset = offset + 5;
}


async function getTodo() {
  try {
    let response = await fetch(`https://jsonplaceholder.typicode.com/todos?_start=${offset}&_limit=${portionSize}`);
    let todos = await response.json();
    return todos;
  } catch(err) {
    alert('Ошибка загрузки');
  }
}
getTodo();