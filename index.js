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
    return el.id !== id;
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

    let newTodo = document.querySelectorAll('.block__text');

    newTodo[newTodo.length-1].querySelector('.complete').addEventListener('click', (event) => completeTask(event, el.id));
    newTodo[newTodo.length-1].querySelector('.close').addEventListener('click', (event) => closeTask(event, el.id));
  })
}


const select = document.querySelector('#select');

select.addEventListener('change', chooseSelect);

function chooseSelect(event) {
  let selectValue = event.target.value;

  let sortedTodos = [];

  switch (selectValue) {
    case 'All':
      sortedTodos = globalArr;
      break;
    case 'Completed':
      sortedTodos = globalArr.filter((el, i, arr) => {
        return el.type === 'completed';
      })
      console.log(sortedTodos)
      break;
    case 'Uncompleted':
      sortedTodos = globalArr.filter((el, i, arr) => {
        return el.type === 'uncompleted';
      })
      console.log(sortedTodos)
      break;
  }

  renderTodos(sortedTodos);
}