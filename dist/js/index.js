const addTaskErrorText = document.querySelector('.l-main-header__input-error'),
  addTaskText = document.querySelector('.l-main-header__input-task-text'),
  addTaskButton = document.querySelector('.l-main-header__new-task-add-button');

const toBeDone = document.querySelector('#tasks-to-be-done-container'),
  toBeDoneCounter = document.querySelector('#tasks-to-be-done-counter'),
  tbdButtons = document.querySelector('#to-be-done-mass-action-buttons'),
  chooseAllToBeDoneTasksButton = document.querySelector(
    '#choose-all-to-be-done-tasks-button'
  ),
  doneTaskButton = document.querySelector('.l-main-tasks__done-button'),
  deleteTaskButton = document.querySelector('#to-be-done-delete-button'),
  tasksToBeDone = document.querySelector('#to-be-done-list');

const done = document.querySelector('#tasks-done-container'),
  doneCounter = document.querySelector('#tasks-done-counter'),
  doneButtons = document.querySelector('#done-mass-action-buttons'),
  chooseAllDoneTasksButton = document.querySelector(
    '#choose-all-done-tasks-button'
  ),
  undoneTaskButton = document.querySelector('.l-main-tasks__undone-button'),
  deleteDoneTaskButton = document.querySelector('#done-delete-button'),
  tasksDone = document.querySelector('#done-list');

let tbdData, doneData;

function getTasks() {
  tbdData = JSON.parse(localStorage.getItem('tbdData')) || [];
  doneData = JSON.parse(localStorage.getItem('doneData')) || [];
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

function renderTasks() {
  getTasks();
  tasksToBeDone.innerHTML = '';
  for (let task of tbdData) createTaskTemplate(task, tasksToBeDone);
  tasksDone.innerHTML = '';
  for (let task of doneData) createTaskTemplate(task, tasksDone);
  functionalButtonsStatus(
    tasksToBeDone,
    deleteTaskButton,
    doneTaskButton,
    tbdButtons
  );
  functionalButtonsStatus(
    tasksDone,
    deleteDoneTaskButton,
    undoneTaskButton,
    doneButtons
  );
  counterUpdate(toBeDoneCounter, tasksToBeDone);
  counterUpdate(doneCounter, tasksDone);
  resetChosenTasks(
    tbdData,
    chooseAllToBeDoneTasksButton,
    chooseAllDoneTasksButton
  );
  resetChosenTasks(
    doneData,
    chooseAllDoneTasksButton,
    chooseAllToBeDoneTasksButton
  );
}

function createTask(id, task, checked, toEdit) {
  if (!task) {
    addTaskErrorText.innerText = 'You have not entered a task name';
    return;
  }
  saveData({ id, task, checked, toEdit });
  renderTasks();
}

function onAddTask() {
  const taskId = Math.random().toString(32).slice(3);
  const taskName = addTaskText.value;
  const checked = false;
  addTaskText.focus();
  createTask(taskId, taskName, checked, (toEdit = undefined));
}

function chooseToBeDoneTask(event) {
  if (event.target.getAttribute('type') !== 'checkbox') return;
  for (let task of tbdData) {
    if (task.id === event.target.parentNode.dataset.id) {
      task.checked = !task.checked;
      saveData();
    }
  }
  changeCheckboxStatus(tbdData, tasksDone);
  event.target.nextSibling.classList.toggle('l-main-task_checked');
  changeEditButtonsStatus(tasksToBeDone);
  functionalButtonsStatus(
    tasksToBeDone,
    deleteTaskButton,
    doneTaskButton,
    tbdButtons
  );
}

function chooseDoneTask(event) {
  if (event.target.getAttribute('type') !== 'checkbox') return;
  for (let task of doneData) {
    if (task.id === event.target.parentNode.dataset.id) {
      task.checked = !task.checked;
      saveData();
    }
  }
  changeCheckboxStatus(doneData, tasksToBeDone);
  event.target.nextSibling.classList.toggle('l-main-task_checked');
  changeEditButtonsStatus(tasksDone);
  functionalButtonsStatus(
    tasksDone,
    deleteDoneTaskButton,
    undoneTaskButton,
    doneButtons
  );
}

function chooseAllTasks(
  data,
  list,
  otherData,
  otherList,
  otherChooseAllTasksButton
) {
  data.forEach((item) =>
    item.checked ? (item.checked = false) : (item.checked = true)
  );
  saveData();
  for (item of data) {
    if (item.checked === true) {
      for (let i = 0; i < list.children.length; i++) {
        if (item.id === list.children[i].dataset.id) {
          list.children[i].children[0].checked = true;
          list.children[i].children[1].classList.add('l-main-task_checked');
        }
      }
    } else {
      for (let i = 0; i < list.children.length; i++) {
        if (item.id === list.children[i].dataset.id) {
          list.children[i].children[0].checked = false;
          list.children[i].children[1].classList.remove('l-main-task_checked');
        }
      }
    }
  }
  otherChooseAllTasksButton.disabled
    ? (otherChooseAllTasksButton.disabled = false)
    : (otherChooseAllTasksButton.disabled = true);
  changeCheckboxStatus(data, otherList);
  changeEditButtonsStatus(list);
}

chooseAllToBeDoneTasksButton.addEventListener('click', () =>
  chooseAllTasks(
    tbdData,
    tasksToBeDone,
    doneData,
    tasksDone,
    chooseAllDoneTasksButton
  )
);

chooseAllDoneTasksButton.addEventListener('click', () =>
  chooseAllTasks(
    doneData,
    tasksDone,
    tbdData,
    tasksToBeDone,
    chooseAllToBeDoneTasksButton
  )
);

function changeEditButtonsStatus(list) {
  let checkedTasks = list.querySelectorAll('.l-main-task_checked');
  let editButtons = list.querySelectorAll('button');
  for (button of editButtons) {
    if (checkedTasks.length > 1) button.setAttribute('disabled', '');
    else button.removeAttribute('disabled');
  }
}

function resetChosenTasks(data, allButton, otherAllButton) {
  for (let task of data) {
    task.checked = false;
    allButton.checked = false;
    otherAllButton.disabled = false;
    saveData();
  }
}

function changeCheckboxStatus(data, list) {
  let chosenTasks = 0;
  for (let task of data) {
    if (task.checked) chosenTasks++;
  }
  let checkboxes = list.querySelectorAll('.l-main-task__checkbox');
  if (chosenTasks) {
    for (let checkbox of checkboxes) {
      checkbox.setAttribute('disabled', 'disabled');
    }
  } else {
    for (let checkbox of checkboxes) {
      checkbox.removeAttribute('disabled');
    }
  }
}

function createTaskTemplate(task, taskList) {
  const taskContainer = document.createElement('li');
  const taskText = document.createElement('span');
  const checkbox = document.createElement('input');
  const editButton = document.createElement('button');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('l-main-task__checkbox');
  taskText.innerText = task.task;
  taskText.classList.add('l-main-task__text');
  editButton.setAttribute('data-button-name', 'Edit');
  editButton.setAttribute('title', 'Edit');
  editButton.classList.add('l-main-task__edit-button');
  taskContainer.setAttribute('data-id', task.id);
  taskContainer.classList.add('l-main-task__container');
  taskContainer.append(checkbox, taskText, editButton);
  taskList.append(taskContainer);
  addTaskText.value = '';
}

function functionalButtonsStatus(
  tasks,
  deleteButton,
  statusButton,
  functionalButtons
) {
  let checkedTasks = tasks.querySelectorAll('.l-main-task_checked');
  if (checkedTasks.length !== 0) {
    deleteButton.removeAttribute('disabled');
    statusButton.removeAttribute('disabled');
  } else {
    deleteButton.setAttribute('disabled', '');
    statusButton.setAttribute('disabled', '');
  }

  if (tasks.children.length === 0) {
    functionalButtons.classList.add('l-main-tasks__mass-action-buttons_hidden');
    functionalButtons.classList.remove(
      'l-main-tasks__mass-action-buttons_active'
    );
  } else {
    functionalButtons.classList.add('l-main-tasks__mass-action-buttons_active');
    functionalButtons.classList.remove(
      'l-main-tasks__mass-action-buttons_hidden'
    );
  }
}

function editTask(event) {
  if (event.target.tagName !== 'BUTTON') return;
  if (event.target.getAttribute('data-button-name') === 'Edit') {
    deleteTaskButton.setAttribute('disabled', '');
    doneTaskButton.setAttribute('disabled', '');
    event.target.style;
    let checkboxes = document.querySelectorAll('.l-main-task__checkbox');
    for (let item of checkboxes) {
      item.setAttribute('disabled', '');
    }
    let temp = event.target.previousSibling.textContent;
    let editInput = document.createElement('input');
    editInput.classList.add('l-main-task__edit-input');
    editInput.setAttribute('maxlength', '30');
    event.target.previousSibling.replaceWith(editInput);
    event.target.setAttribute('data-button-name', 'Save');
    let editButtons = document.querySelectorAll('button');
    for (let item of editButtons) {
      if (item.getAttribute('data-button-name') === 'Edit')
        item.setAttribute('disabled', '');
    }
    editInput.value = temp;
    return;
  }
  if (event.target.getAttribute('data-button-name') === 'Save') {
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
  if (event.target.getAttribute('data-button-name') === 'Edit') {
    deleteDoneTaskButton.setAttribute('disabled', '');
    undoneTaskButton.setAttribute('disabled', '');
    let checkboxes = document.querySelectorAll('.l-main-task__checkbox');
    for (let item of checkboxes) {
      item.setAttribute('disabled', '');
    }
    let temp = event.target.previousSibling.textContent;
    let editInput = document.createElement('input');
    editInput.classList.add('l-main-task__edit-input');
    editInput.setAttribute('maxlength', '30');
    event.target.previousSibling.replaceWith(editInput);
    event.target.setAttribute('data-button-name', 'Save');
    let editButtons = document.querySelectorAll('button');
    for (let item of editButtons) {
      if (item.getAttribute('data-button-name') === 'Edit')
        item.setAttribute('disabled', '');
    }
    editInput.value = temp;
    return;
  }
  if (event.target.getAttribute('data-button-name') === 'Save') {
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

function doneTask() {
  let tasks = tasksToBeDone;
  for (task of tasks.children) {
    if (task.children[1].classList.contains('l-main-task_checked')) {
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

addTaskText.addEventListener('blur', () => {
  addTaskErrorText.innerText = '';
});

addTaskText.addEventListener('input', () => {
  addTaskErrorText.innerText = '';
  if (addTaskText.value.length === 30) {
    addTaskErrorText.innerText = 'The maximum number of characters is 30';
  }
});

function undoneTask() {
  let tasks = document.querySelector('.l-main__done-tasks');
  for (task of tasks.children) {
    if (task.children[1].classList.contains('l-main-task_checked')) {
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
    if (task.children[1].classList.contains('l-main-task_checked')) {
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
    if (task.children[1].classList.contains('l-main-task_checked')) {
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
counterUpdate(toBeDoneCounter, tasksToBeDone);
counterUpdate(doneCounter, tasksDone);

addTaskButton.addEventListener('click', onAddTask);
tasksToBeDone.addEventListener('click', chooseToBeDoneTask);
tasksDone.addEventListener('click', chooseDoneTask);
tasksToBeDone.addEventListener('click', editTask);
tasksDone.addEventListener('click', editDoneTask);
deleteTaskButton.addEventListener('click', onDeleteTBDTask);
deleteDoneTaskButton.addEventListener('click', onDeleteDoneTask);
doneTaskButton.addEventListener('click', doneTask);
undoneTaskButton.addEventListener('click', undoneTask);
