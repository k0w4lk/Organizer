const addTaskText = document.querySelector('.l-main-header__new-task-text');
const addTaskButton = document.querySelector('.l-main-header__new-task-add');
const doneTaskButton = document.querySelector('.done-task-button');
const undoneTaskButton = document.querySelector('.undone-task-button');
const tbdButtons = document.querySelector('.l-main__tbd-buttons');
const doneButtons = document.querySelector('.l-main__done-buttons');
const deleteTaskButton = document.querySelector('.delete-task-button');
const deleteDoneTaskButton = document.querySelector('.delete-done-task-button');
const toBeDone = document.querySelector('.l-main__tbd');
const tasksToBeDone = document.querySelector('.l-main__tbd-tasks');
const toBeDoneCounter = document.querySelector('.l-main__tbd-counter');
const done = document.querySelector('.l-main__done');
const tasksDone = document.querySelector('.l-main__done-tasks');
const doneCounter = document.querySelector('.l-main__done-counter');

let tbdData, doneData;

function chooseTask(event) {
  if (event.target.getAttribute('type') !== 'checkbox') return;
  event.target.nextSibling.classList.toggle('task-checked');
  let checkedTasks = tasksToBeDone.querySelectorAll('.task-checked');
  let editButtons = tasksToBeDone.querySelectorAll('button');
  for (button of editButtons) {
    if (checkedTasks.length > 1) button.setAttribute('disabled', '');
    else button.removeAttribute('disabled');
  }
  buttonsStatus();
}

function chooseDoneTask(event) {
  if (event.target.getAttribute('type') !== 'checkbox') return;
  event.target.nextSibling.classList.toggle('task-checked');
  let checkedTasks = tasksDone.querySelectorAll('.task-checked');
  let editButtons = tasksDone.querySelectorAll('button');
  for (button of editButtons) {
    if (checkedTasks.length > 1) button.setAttribute('disabled', '');
    else button.removeAttribute('disabled');
  }
  buttonsDoneStatus();
}

function getTasks() {
  tbdData = JSON.parse(localStorage.getItem('tbdData')) || [];
  doneData = JSON.parse(localStorage.getItem('doneData')) || [];
}

function createTaskTemplate(task) {
  const newTask = document.createElement('li');
  const newTaskText = document.createElement('span');
  const checkbox = document.createElement('input');
  const editButton = document.createElement('button');
  checkbox.setAttribute('type', 'checkbox');
  newTaskText.innerText = task.task;
  editButton.setAttribute('data-button-name', 'Редактировать');
  editButton.setAttribute('title', 'Редактировать');
  editButton.classList.add('edit-button');
  newTask.setAttribute('data-id', task.id);
  newTask.append(checkbox, newTaskText, editButton);
  tasksToBeDone.append(newTask);
  addTaskText.value = '';
}

function createTaskDoneTemplate(task) {
  const doneTask = document.createElement('li');
  const doneTaskText = document.createElement('span');
  const checkbox = document.createElement('input');
  const editButton = document.createElement('button');
  checkbox.setAttribute('type', 'checkbox');
  doneTaskText.innerText = task.task;
  editButton.setAttribute('data-button-name', 'Редактировать');
  editButton.setAttribute('title', 'Редактировать');
  editButton.classList.add('edit-button');
  doneTask.setAttribute('data-id', task.id);
  doneTask.append(checkbox, doneTaskText, editButton);
  tasksDone.append(doneTask);
}

function renderTasks() {
  getTasks();
  tasksToBeDone.innerHTML = '';
  for (let task of tbdData) createTaskTemplate(task);
  tasksDone.innerHTML = '';
  for (let task of doneData) createTaskDoneTemplate(task);
  buttonsStatus();
  buttonsDoneStatus();
  counterUpdate(toBeDoneCounter, tasksToBeDone);
  counterUpdate(doneCounter, tasksDone);
}

function buttonsStatus() {
  let checkedTasks = tasksToBeDone.querySelectorAll('.task-checked');
  if (checkedTasks.length !== 0) {
    deleteTaskButton.removeAttribute('disabled');
    doneTaskButton.removeAttribute('disabled');
  } else {
    deleteTaskButton.setAttribute('disabled', '');
    doneTaskButton.setAttribute('disabled', '');
  }

  if (tasksToBeDone.children.length === 0) {
    tbdButtons.style.display = 'none';
  } else {
    tbdButtons.style.display = 'block';
  }
}

function buttonsDoneStatus() {
  let checkedTasks = tasksDone.querySelectorAll('.task-checked');
  if (checkedTasks.length !== 0) {
    deleteDoneTaskButton.removeAttribute('disabled');
    undoneTaskButton.removeAttribute('disabled');
  } else {
    deleteDoneTaskButton.setAttribute('disabled', '');
    undoneTaskButton.setAttribute('disabled', '');
  }

  if (tasksDone.children.length === 0) {
    doneButtons.style.display = 'none';
  } else {
    doneButtons.style.display = 'block';
  }
}

function editTask(event) {
  if (event.target.tagName !== 'BUTTON') return;
  if (event.target.getAttribute('data-button-name') === 'Редактировать') {
    deleteTaskButton.setAttribute('disabled', '');
    doneTaskButton.setAttribute('disabled', '');
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    for (let item of checkboxes) {
      item.setAttribute('disabled', '');
    }
    let temp = event.target.previousSibling.textContent;
    let editInput = document.createElement('input');
    event.target.previousSibling.replaceWith(editInput);
    event.target.setAttribute('data-button-name', 'Сохранить');
    let editButtons = document.querySelectorAll('button');
    for (let item of editButtons) {
      if (item.getAttribute('data-button-name') === 'Редактировать')
        item.setAttribute('disabled', '');
    }
    editInput.value = temp;
    return;
  }
  if (event.target.getAttribute('data-button-name') === 'Сохранить') {
    let temp = event.target.previousSibling.value;
    let currentId = event.target.parentNode.getAttribute('data-id');
    tbdData = tbdData.map((item) => {
      if (item.id === currentId) {
        item.task = temp;
        return item;
      } else {
        return item;
      }
    });
    saveData();
    renderTasks();
    return;
  }
}

function editDoneTask(event) {
  if (event.target.tagName !== 'BUTTON') return;
  if (event.target.getAttribute('data-button-name') === 'Редактировать') {
    deleteDoneTaskButton.setAttribute('disabled', '');
    undoneTaskButton.setAttribute('disabled', '');
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    for (let item of checkboxes) {
      item.setAttribute('disabled', '');
    }
    let temp = event.target.previousSibling.textContent;
    let editInput = document.createElement('input');
    event.target.previousSibling.replaceWith(editInput);
    event.target.setAttribute('data-button-name', 'Сохранить');
    let editButtons = document.querySelectorAll('button');
    for (let item of editButtons) {
      if (item.getAttribute('data-button-name') === 'Редактировать')
        item.setAttribute('disabled', '');
    }
    editInput.value = temp;
    return;
  }
  if (event.target.getAttribute('data-button-name') === 'Сохранить') {
    let temp = event.target.previousSibling.value;
    let currentId = event.target.parentNode.getAttribute('data-id');
    doneData = doneData.map((item) => {
      if (item.id === currentId) {
        item.task = temp;
        return item;
      } else {
        return item;
      }
    });
    saveData();
    renderTasks();
    return;
  }
}

function onAddTask() {
  const taskId = Math.random().toString(32).slice(3);
  const taskName = addTaskText.value;
  addTaskText.focus();
  createTask(taskId, taskName, (checked = undefined), (toEdit = undefined));
}

function createTask(id, task, checked, toEdit) {
  if (!task) return;
  saveData({ id, task, checked, toEdit });
  renderTasks();
}

function saveData(data) {
  if (data)
    localStorage.setItem(
      'tbdData',
      JSON.stringify([
        ...tbdData,
        {
          id: data.id,
          task: data.task,
          checked: data.checked,
          toEdit: data.toEdit,
        },
      ])
    );
  else {
    localStorage.setItem('tbdData', JSON.stringify([...tbdData]));
    localStorage.setItem('doneData', JSON.stringify([...doneData]));
  }
}

function doneTask() {
  let tasks = document.querySelector('.l-main__tbd-tasks');
  for (task of tasks.children) {
    if (task.children[1].classList.contains('task-checked')) {
      tbdData = tbdData.filter((item) => {
        if (task.getAttribute('data-id') === item.id) {
          doneData.push(item);
          return false;
        } else {
          return true;
        }
      });
    }
  }
  saveData();
  renderTasks();
}

function undoneTask() {
  let tasks = document.querySelector('.l-main__done-tasks');
  for (task of tasks.children) {
    if (task.children[1].classList.contains('task-checked')) {
      doneData = doneData.filter((item) => {
        if (task.getAttribute('data-id') === item.id) {
          tbdData.push(item);
          return false;
        } else {
          return true;
        }
      });
    }
  }
  saveData();
  renderTasks();
}

function onDeleteTBDTask() {
  let tasks = tasksToBeDone;

  for (task of tasks.children) {
    if (task.children[1].classList.contains('task-checked')) {
      tbdData = tbdData.filter(
        (item) => !(task.getAttribute('data-id') === item.id)
      );
    }
  }

  saveData();
  renderTasks();
}

function onDeleteDoneTask() {
  let tasks = tasksDone;
  for (task of tasks.children) {
    if (task.children[1].classList.contains('task-checked')) {
      doneData = doneData.filter(
        (item) => !(task.getAttribute('data-id') === item.id)
      );
    }
  }

  saveData();
  renderTasks();
}

function counterUpdate(counter, counterBase) {
  counter.innerText = counterBase.children.length;
}

renderTasks();
buttonsStatus();
buttonsDoneStatus();
counterUpdate(toBeDoneCounter, tasksToBeDone);
counterUpdate(doneCounter, tasksDone);

addTaskButton.addEventListener('click', onAddTask);
tasksToBeDone.addEventListener('click', chooseTask);
tasksDone.addEventListener('click', chooseDoneTask);
tasksToBeDone.addEventListener('click', editTask);
tasksDone.addEventListener('click', editDoneTask);
deleteTaskButton.addEventListener('click', onDeleteTBDTask);
deleteDoneTaskButton.addEventListener('click', onDeleteDoneTask);
doneTaskButton.addEventListener('click', doneTask);
undoneTaskButton.addEventListener('click', undoneTask);
