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

  let taskHtml = `<li class="block__text">
                      <div class="text__wrapper">
                        <span>${taskText}</span>
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


  let id = Math.random();

  let newObject = {
    id: id,
    text: taskText,
    type: 'uncompleted',
  };

  globalArr.push(newObject);

  
  const todo = document.querySelectorAll('.block__text');
  
  todo[todo.length-1].querySelector('.close').addEventListener('click', (event) => closeTask(event, id));
  todo[todo.length-1].querySelector('.complete').addEventListener('click', (event)=> completeTask(event, id));
  

  taskInput.value = '' // очистка поля ввода и возвращение на него фокуса
  taskInput.focus();

  saveToLocalStorage()
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
    if (el.id === id && el.type === 'uncompleted') return el.type = 'completed';
    if (el.id === id && el.type === 'completed') return el.type = 'uncompleted';
  })

  saveToLocalStorage()
}



function renderTodos(globalArr) {

  const nodesChild = document.querySelectorAll('.block__text');

  nodesChild.forEach(el => {
    el.remove();
  })



  globalArr.forEach((el, i, arr) => {
    let taskHtml = `<li class="block__text ${el.type === 'completed' ? '_checked' : ''}">
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
        return el.type === 'completed';
      })
      break;
    case 'Uncompleted':
      sortedTodos = globalArrCopy.filter((el, i, arr) => {
        return el.type === 'uncompleted';
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
}


searchInput.addEventListener('input', filterAndSearchTodo);

function searchTodo(globalArrCopy) {
  let searchText = searchInput.value.toLowerCase();

  let searchArr = [];

  searchArr = globalArrCopy.filter(el => {
    return el.text.includes(searchText);
  })

  return searchArr;
}


function filterAndSearchTodo(event) {
  let globalArrCopy = [...globalArr];

  globalArrCopy = chooseSelect(globalArrCopy);

  globalArrCopy = searchTodo(globalArrCopy);

  renderTodos(globalArrCopy);
}


function saveToLocalStorage() {
  localStorage.setItem('globalArr', JSON.stringify(globalArr));
}