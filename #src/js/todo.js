'use strict';

const newTaskText = document.querySelector('#new-task-text'),
  newTaskAdd = document.querySelector('#new-task-add'),
  newTaskError = document.querySelector('#new-task-error');

const counterTBD = document.querySelector('#counter-TBD'),
  counterDone = document.querySelector('#counter-done');

const massButtonsTBD = document.querySelector('#mass-buttons-TBD'),
  massButtonsDone = document.querySelector('#mass-buttons-done');

const chooseAllTBD = document.querySelector('#choose-all-TBD'),
  chooseAllDone = document.querySelector('#choose-all-done');

const allToDone = document.querySelector('#all-to-done'),
  allToExecution = document.querySelector('#all-to-execution');

const deleteAllTBD = document.querySelector('#delete-all-TBD'),
  deleteAllDone = document.querySelector('#delete-all-done');

const listTBD = document.querySelector('#list-TBD'),
  listDone = document.querySelector('#list-done');

let dataTBD, dataDone;

function getTasksData() {
  dataTBD = JSON.parse(localStorage.getItem('dataTBD')) || [];
  dataDone = JSON.parse(localStorage.getItem('dataDone')) || [];
}

function saveTasksData(data) {
  if (data)
    localStorage.setItem(
      'dataTBD',
      JSON.stringify([
        ...dataTBD,
        {
          text: data.taskText,
          id: data.taskID,
          isChecked: data.isChecked,
          toEdit: data.toEdit,
          isDone: data.isDone,
        },
      ])
    );
  else {
    localStorage.setItem('dataTBD', JSON.stringify([...dataTBD]));
    localStorage.setItem('dataDone', JSON.stringify([...dataDone]));
  }
}

function addNewTask() {
  const taskText = newTaskText.value.trim();
  newTaskText.focus();

  if (!taskText) {
    newTaskError.innerText = 'You have not entered a task name';
    newTaskText.value = '';
    return;
  }

  const taskID = Math.random().toString(32).slice(3);
  const isChecked = false;
  const toEdit = false;
  const isDone = false;

  newTaskText.value = '';
  resetCheckboxesStatuses();
  massButtonActivity();
  clearNewTaskErrorText();
  saveTasksData({ taskText, taskID, isChecked, toEdit, isDone });

  renderTasks();
}

function createNewTaskTemplate(task, taskList) {
  const newTaskContainer = document.createElement('li');
  newTaskContainer.dataset.id = task.id;
  newTaskContainer.classList.add('l-main-task__container');

  const newTaskCheckbox = document.createElement('input');
  newTaskCheckbox.setAttribute('type', 'checkbox');
  newTaskCheckbox.checked = task.isChecked;
  newTaskCheckbox.classList.add('l-main-task__checkbox');

  const newTaskText = document.createElement('span');
  newTaskText.innerText = task.text;
  newTaskText.classList.add('l-main-task__text');
  if (task.isDone) {
    newTaskText.classList.add('l-main-task__text_done');
  } else {
    newTaskText.classList.remove('l-main-task__text_done');
  }

  const newTaskEdit = document.createElement('button');
  newTaskEdit.classList.add('l-main-task__edit-button');
  newTaskEdit.dataset.edit = 'edit';

  newTaskContainer.append(newTaskCheckbox, newTaskText, newTaskEdit);
  taskList.append(newTaskContainer);
}

function renderTasks() {
  getTasksData();
  listTBD.innerHTML = '';
  listDone.innerHTML = '';
  dataTBD.forEach((task) => createNewTaskTemplate(task, listTBD));
  dataDone.forEach((task) => createNewTaskTemplate(task, listDone));
  updateTasksCounter(counterTBD, listTBD);
  updateTasksCounter(counterDone, listDone);
  chooseAllDone.disabled = false;
  chooseAllTBD.disabled = false;
}

function resetCheckboxesStatuses() {
  chooseAllTBD.checked = false;
  chooseAllDone.checked = false;
  let checkboxes = document.querySelectorAll('.l-main-task__checkbox');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.nextSibling.classList.remove('l-main-task_checked');
  });
  dataTBD.forEach((task) => {
    task.isChecked = false;
    task.toEdit = false;
  });
  dataDone.forEach((task) => {
    task.isChecked = false;
    task.toEdit = false;
  });

  saveTasksData();
}

function clearNewTaskErrorText() {
  newTaskError.innerText = '';
}

function updateTasksCounter(counter, list) {
  counter.innerText = list.children.length;
  massButtonsDisplay();
}

function chooseAllTasks(data, button, list) {
  if (button.checked) {
    data.forEach((task) => (task.isChecked = true));
  } else {
    data.forEach((task) => (task.isChecked = false));
    unlockCheckboxesDone();
  }

  saveTasksData();
  renderTasks();
  if (button.checked) {
    if (list.id === 'list-TBD') {
      chooseAllDone.disabled = true;
      lockCheckboxesDone();
    }
    if (list.id === 'list-done') {
      chooseAllTBD.disabled = true;
      lockCheckboxesTBD();
    }
  } else {
    if (list.id === 'list-TBD') {
      chooseAllDone.disabled = false;
      unlockCheckboxesDone();
    }
    if (list.id === 'list-done') {
      chooseAllTBD.disabled = false;
      unlockCheckboxesTBD();
    }
  }
  massButtonActivity();
}

function moveTasksToDone() {
  dataTBD = dataTBD.filter((task) => {
    if (task.isChecked) {
      task.isDone = true;
      dataDone.push(task);
      return false;
    } else {
      return true;
    }
  });
  saveTasksData();
  resetCheckboxesStatuses();
  renderTasks();
  massButtonActivity();
}

function moveTasksToExecution() {
  dataDone = dataDone.filter((task) => {
    if (task.isChecked) {
      task.isDone = false;
      dataTBD.push(task);
      return false;
    } else {
      return true;
    }
  });
  saveTasksData();
  resetCheckboxesStatuses();
  renderTasks();
}

function chooseTask(event, data, list) {
  if (!event.target.classList.contains('l-main-task__checkbox')) return;
  data.forEach((task) => {
    if (task.id === event.target.parentNode.dataset.id) {
      if (event.target.checked) {
        task.isChecked = true;
        event.target.nextSibling.classList.add('l-main-task_checked');
        saveTasksData();
      } else {
        task.isChecked = false;
        event.target.nextSibling.classList.remove('l-main-task_checked');
        saveTasksData();
      }
    }
  });
  if (data.filter((task) => task.isChecked).length) {
    if (list.id === 'list-TBD') {
      lockCheckboxesDone();
      chooseAllDone.disabled = true;
    }
    if (list.id === 'list-done') {
      lockCheckboxesTBD();
      chooseAllTBD.disabled = true;
    }
  } else {
    if (list.id === 'list-TBD') {
      unlockCheckboxesDone();
      chooseAllDone.disabled = false;
    }
    if (list.id === 'list-done') {
      unlockCheckboxesTBD();
      chooseAllTBD.disabled = false;
    }
  }
  massButtonActivity();
}

function lockCheckboxesDone() {
  let checkboxesDone = listDone.querySelectorAll('.l-main-task__checkbox');
  checkboxesDone.forEach((checkbox) => (checkbox.disabled = true));
}

function unlockCheckboxesDone() {
  let checkboxesDone = listDone.querySelectorAll('.l-main-task__checkbox');
  checkboxesDone.forEach((checkbox) => (checkbox.disabled = false));
}

function lockCheckboxesTBD() {
  let checkboxesDone = listTBD.querySelectorAll('.l-main-task__checkbox');
  checkboxesDone.forEach((checkbox) => (checkbox.disabled = true));
}

function unlockCheckboxesTBD() {
  let checkboxesDone = listTBD.querySelectorAll('.l-main-task__checkbox');
  checkboxesDone.forEach((checkbox) => (checkbox.disabled = false));
}

function massButtonActivity() {
  let checkedTBDCounter = 0;
  let checkedDoneCounter = 0;
  dataTBD.forEach((task) => {
    if (task.isChecked) checkedTBDCounter++;
  });
  dataDone.forEach((task) => {
    if (task.isChecked) checkedDoneCounter++;
  });
  if (checkedTBDCounter) {
    allToDone.disabled = false;
    deleteAllTBD.disabled = false;
  } else {
    allToDone.disabled = true;
    deleteAllTBD.disabled = true;
  }
  if (checkedDoneCounter) {
    allToExecution.disabled = false;
    deleteAllDone.disabled = false;
  } else {
    allToExecution.disabled = true;
    deleteAllDone.disabled = true;
  }
}

function massButtonsDisplay() {
  if (counterTBD.innerText === '0') {
    massButtonsTBD.classList.add('l-main-tasks__mass-action-buttons_hidden');
    massButtonsTBD.classList.remove('l-main-tasks__mass-action-buttons_active');
  } else {
    massButtonsTBD.classList.add('l-main-tasks__mass-action-buttons_active');
    massButtonsTBD.classList.remove('l-main-tasks__mass-action-buttons_hidden');
  }

  if (counterDone.innerText === '0') {
    massButtonsDone.classList.add('l-main-tasks__mass-action-buttons_hidden');
    massButtonsDone.classList.remove(
      'l-main-tasks__mass-action-buttons_active'
    );
  } else {
    massButtonsDone.classList.add('l-main-tasks__mass-action-buttons_active');
    massButtonsDone.classList.remove(
      'l-main-tasks__mass-action-buttons_hidden'
    );
  }
}

function addNewTaskStatus(isLocked) {
  newTaskText.disabled = isLocked;
  newTaskAdd.disabled = isLocked;
  if (isLocked)
    newTaskAdd.classList.add('l-main-tasks-header__new-task-add-button_locked');
  else
    newTaskAdd.classList.remove(
      'l-main-tasks-header__new-task-add-button_locked'
    );
}

function editTaskTBD(event) {
  if (!event.target.classList.contains('l-main-task__edit-button')) return;
  if (event.target.dataset.edit === 'edit') {
    resetCheckboxesStatuses();
    massButtonActivity();
    event.target.classList.add('l-main-task__edit-button_save');
    dataTBD.forEach((task) => {
      if (event.target.parentNode.dataset.id === task.id) {
        task.toEdit = true;
      }
    });
    saveTasksData();

    lockEditButtons(dataTBD);
    addNewTaskStatus(true);
    let editInput = document.createElement('input');
    editInput.style = 'width: 85%';
    editInput.setAttribute('maxlength', '100');
    editInput.value = event.target.previousSibling.innerText;
    event.target.previousSibling.replaceWith(editInput);
    editInput.focus();
    event.target.dataset.edit = 'save';
    lockCheckboxesDone();
    lockCheckboxesTBD();
    chooseAllDone.disabled = true;
    chooseAllTBD.disabled = true;
    return;
  }
  if (event.target.dataset.edit === 'save') {
    let text = event.target.previousSibling.value;
    let currentId = event.target.parentNode.dataset.id;
    if (!text.length) {
      dataTBD = dataTBD.filter((task) => task.id !== currentId);
    } else {
      dataTBD = dataTBD.map((task) => {
        if (task.id === currentId) {
          task.text = text;
          return task;
        } else {
          return task;
        }
      });
    }
    saveTasksData();
    addNewTaskStatus(false);
    renderTasks();
  }
}

function editTaskDone(event) {
  if (!event.target.classList.contains('l-main-task__edit-button')) return;
  if (event.target.dataset.edit === 'edit') {
    resetCheckboxesStatuses();
    massButtonActivity();
    event.target.classList.add('l-main-task__edit-button_save');
    dataDone.forEach((task) => {
      if (event.target.parentNode.dataset.id === task.id) {
        task.toEdit = true;
      }
    });
    saveTasksData();
    addNewTaskStatus(true);

    lockEditButtons(dataDone);
    let editInput = document.createElement('input');
    editInput.style = 'width: 85%';
    editInput.setAttribute('maxlength', '100');
    editInput.value = event.target.previousSibling.innerText;
    event.target.previousSibling.replaceWith(editInput);
    editInput.focus();
    event.target.dataset.edit = 'save';
    lockCheckboxesDone();
    lockCheckboxesTBD();
    chooseAllDone.disabled = true;
    chooseAllTBD.disabled = true;
    return;
  }
  if (event.target.dataset.edit === 'save') {
    let text = event.target.previousSibling.value;
    let currentId = event.target.parentNode.dataset.id;
    if (!text.length) {
      dataDone = dataDone.filter((task) => task.id !== currentId);
    } else {
      dataDone = dataDone.map((task) => {
        if (task.id === currentId) {
          task.text = text;
          return task;
        } else {
          return task;
        }
      });
    }
    saveTasksData();
    addNewTaskStatus(false);
    renderTasks();
  }
}

function lockEditButtons(data) {
  let editButtons = document.querySelectorAll('.l-main-task__edit-button');
  data.forEach((task) => {
    if (task.toEdit) {
      editButtons.forEach((button) => {
        if (task.id !== button.parentNode.dataset.id) {
          button.disabled = true;
        }
      });
    }
  });
}

function deleteTasksTBD() {
  dataTBD = dataTBD.filter((task) => (task.isChecked ? false : true));
  saveTasksData();
  renderTasks();
  resetCheckboxesStatuses();
  massButtonActivity();
}

function deleteTasksDone() {
  dataDone = dataDone.filter((task) => (task.isChecked ? false : true));
  saveTasksData();
  renderTasks();
  resetCheckboxesStatuses();
  massButtonActivity();
}

newTaskAdd.addEventListener('click', () => addNewTask(newTaskText, listTBD));
newTaskText.addEventListener('keypress', (event) => {
  if (event.code === 'Enter') {
    event.preventDefault();
    addNewTask(newTaskText, listTBD);
  }
});
newTaskText.addEventListener('blur', clearNewTaskErrorText);
newTaskText.addEventListener('keydown', () => {
  if (newTaskText.value.length === 100) {
    newTaskError.innerText = 'The maximum number of characters is 100';
  }
});
newTaskText.addEventListener('input', () => {
  if (newTaskText.value.length === 100) {
    newTaskError.innerText = 'The maximum number of characters is 100';
  } else {
    clearNewTaskErrorText();
  }
});

chooseAllTBD.addEventListener('change', () =>
  chooseAllTasks(dataTBD, chooseAllTBD, listTBD)
);
chooseAllDone.addEventListener('change', () =>
  chooseAllTasks(dataDone, chooseAllDone, listDone)
);
allToDone.addEventListener('click', moveTasksToDone);
allToExecution.addEventListener('click', moveTasksToExecution);
listTBD.addEventListener('change', () => chooseTask(event, dataTBD, listTBD));
listDone.addEventListener('change', () =>
  chooseTask(event, dataDone, listDone)
);

listTBD.addEventListener('click', () => editTaskTBD(event));
listDone.addEventListener('click', () => editTaskDone(event));
deleteAllTBD.addEventListener('click', deleteTasksTBD);
deleteAllDone.addEventListener('click', deleteTasksDone);

getTasksData();
resetCheckboxesStatuses();
renderTasks();
