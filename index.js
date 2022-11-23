const myForm = document.querySelector('#form');

const taskInput = document.querySelector('#taskInput');

const taskList = document.querySelector('#taskList');

let globalArr = [];

myForm.addEventListener('submit', addTask);

function addTask(event) {
  event.preventDefault(); // отменяет стандартное поведение

  const taskText = taskInput.value; // текс задачи из поля ввода

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

  console.log(globalArr)

  
  const todo = document.querySelectorAll('.block__text');
  
  
  todo[todo.length-1].querySelector('.close').addEventListener('click', (event) => closeTask(event, id));
  todo[todo.length-1].querySelector('.complete').addEventListener('click', (event)=> completeTask(event, id));
  
  

  taskInput.value = '' // очистка поля ввода и возвращение на него фокуса
  taskInput.focus();
}

function closeTask(event, id) {
  console.log('это айди', id)
  let element = event.target.closest('.block__text'); 
  element.remove();
  
  globalArr = globalArr.filter((el, i, arr) => {
    if (el.id !== id) return el;
    console.log('это айди элемента', el.id)
  })

  console.log(globalArr)
}

function completeTask(event, id) {
  let check = event.target.closest('.block__text');
  check.classList.toggle('_checked');

  globalArr.forEach((el, i, arr) => {
    if (el.id === id && el.type === 'uncompleted') return el.type = 'completed';
    if (el.id === id && el.type === 'completed') return el.type = 'uncompleted';
  })

  console.log(globalArr)
}



function renderTodos(globalArr) {

  const nodesChild = document.querySelectorAll('.block__text');

  nodesChild.forEach(el => {
    el.remove();
  })



  globalArr.forEach((el, i, arr) => {
    let taskHtml = `<li class="block__text">
                      <div class="text__wrapper">
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
  })
}