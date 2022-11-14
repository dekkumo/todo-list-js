const myForm = document.querySelector('#form');

const taskInput = document.querySelector('#taskInput');

const taskList = document.querySelector('#taskList');


myForm.addEventListener('submit', function(event) {
  event.preventDefault(); // отменяет стандартное поведение

  const taskText = taskInput.value; // текс задачи из поля ввода

  const taskHtml = `<li class="block__text">${taskText}</li>`

  taskList.insertAdjacentHTML('beforeend', taskHtml); // добавляем задачу на страницу
})

