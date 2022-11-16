const myForm = document.querySelector('#form');

const taskInput = document.querySelector('#taskInput');

const taskList = document.querySelector('#taskList');


myForm.addEventListener('submit', addTask) 

function addTask(event) {
  event.preventDefault(); // отменяет стандартное поведение

  const taskText = taskInput.value; // текс задачи из поля ввода

  const taskHtml = `<li class="block__text">
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

  taskList.insertAdjacentHTML('beforeend', taskHtml); // добавляем задачу на страницу

  const todo = document.querySelectorAll('.block__text');
  
  for (let i = 0; i < todo.length; i++) {
    todo[i].querySelector('.close').addEventListener('click', closeTask);
    todo[i].querySelector('.complete').addEventListener('click', completeTask)
  }

  taskInput.value = '' // очистка поля ввода и возвращение на него фокуса
  taskInput.focus();
}

function closeTask(event) {
  let element = event.target.closest('.block__text'); 
  element.remove()
}

function completeTask(event) {
  let check = event.target.closest('.block__text');
  check.classList.toggle('_checked') 
}