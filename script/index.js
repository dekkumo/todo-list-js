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

  taskInput.value = '' // очистка поля ввода и возвращение на него фокуса
  taskInput.focus();
}



const close = document.querySelector('.close');

taskList.addEventListener('click', closeTask);

function closeTask(event) {
  let element = event.target.closest('.block__text'); 
  element.remove()
}
