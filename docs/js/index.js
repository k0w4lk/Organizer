const currentDateWrapper = document.querySelector('#current-date');

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednessday',
  'Thursday',
  'Friday',
  'Saturday',
];

function showCurrentDate() {
  let today = new Date();
  currentDateWrapper.innerText = `${today.toLocaleDateString()} (${
    days[today.getDay()]
  })`;
}

showCurrentDate();

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
    let text = event.target.previousSibling.value.trim();
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
    let text = event.target.previousSibling.value.trim();
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
;
const QUOTE_URL = 'https://quotes.rest/qod';
const qodAuthor = document.querySelector('#qod-author');
const qodText = document.querySelector('#qod-text');

async function getQoD() {
  const response = await fetch(QUOTE_URL);
  const data = await response.json();
  const quote = await data.contents.quotes[0].quote;
  const author = await data.contents.quotes[0].author;
  qodAuthor.innerText = `${author}:`;
  qodText.innerText = `"${quote}"`;
}

getQoD();
;
const API_KEY = 'fc522175fa7782718e0d7c3b81e2f841';
const IMG_URL = `http://openweathermap.org/img/wn/10d@2x.png`;
const DEFAULT_CITY_NAME = 'Verkhnedvinsk';
const weatherIcon = document.querySelector('#weather-icon');
const weatherCity = document.querySelector('#weather-city');
const weatherTemperature = document.querySelector('#weather-temperature');
const feelsLikeText = document.querySelector('#feels-like');
const changeCity = document.querySelector('#change-city');
const changeCityButton = document.querySelector('#change-city-button');
const weatherBlock = document.querySelector('#weather-block');
const weatherPreload = document.querySelector('#weather-preload');
const weatherLoad = document.querySelector('#weather-load');
const refreshWeather = document.querySelector('#weather-refresh');

const savedCity = JSON.parse(localStorage.getItem('savedCity')) || {
  city: undefined,
};

function saveCity(cityName) {
  savedCity.city = cityName;
  localStorage.setItem('savedCity', JSON.stringify(savedCity));
}

async function getWeatherData(key, cityName) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

let temperature, feelsLike, icon, src, city;

function fillWeatherTemplate(response) {
  temperature = response.main.temp;
  feelsLike = response.main.feels_like;
  icon = response.weather[0].icon;
  city = response.name;
  src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  weatherCity.innerText = `${city}: `;
  feelsLikeText.innerHTML = `Feels like: ${Math.round(feelsLike)} &#730;C`;
  weatherTemperature.innerHTML = `${Math.round(temperature)} &#730;C`;
  weatherIcon.src = src;
  changeCity.innerHTML = `${city} isn't your city?`;
  changeCityButton.innerText = 'Change.';
  weatherPreload.classList.add('l-main-header__weather-preloader_hidden');
  weatherLoad.classList.remove('l-main-header__weather-loaded_hidden');
}

function renderWeather() {
  getWeatherData(
    API_KEY,
    localStorage.getItem('savedCity') ? savedCity.city : DEFAULT_CITY_NAME
  ).then((response) => {
    fillWeatherTemplate(response);
  });
}

const save = document.createElement('button');
save.innerText = 'Save';
const newCity = document.createElement('input');

changeCityButton.addEventListener('click', () => {
  weatherLoad.classList.add('l-main-header__weather-loaded_hidden');
  weatherBlock.append(newCity, save);
  save.style = `
  margin-left: 4px;
  `;
  newCity.focus();
  newCity.placeholder = 'Enter your city';
});

function renderSavedCityWeather() {
  getWeatherData(API_KEY, newCity.value).then((response) => {
    try {
      fillWeatherTemplate(response);
      saveCity(newCity.value);
      newCity.remove();
      save.remove();
    } catch {
      newCity.value = '';
      newCity.placeholder = 'City not found';
      newCity.focus();
    }
  });
}

save.addEventListener('click', () => {
  renderSavedCityWeather();
});

newCity.addEventListener('keypress', (event) => {
  if (event.code !== 'Enter') return;
  renderSavedCityWeather();
});

refreshWeather.addEventListener('click', () => {
  weatherPreload.classList.remove('l-main-header__weather-preloader_hidden');
  weatherLoad.classList.add('l-main-header__weather-loaded_hidden');
  renderWeather();
});

renderWeather();
;
'use strict';

const output = document.querySelector('#output'),
  clean = document.querySelector('#clean'),
  buttons = document.querySelector('#buttons');

let firstOperand = '',
  secondOperand = '',
  operator = null,
  wasResult = false;

function setOperand(operator, event) {
  if (event.target.value === '0' && output.textContent === '0') return;
  if (firstOperand === '0') firstOperand = '';
  if (secondOperand === '0') secondOperand = '';
  if (wasResult) {
    clearData();
    wasResult = false;
  }
  if (!operator) {
    firstOperand.length < 8
      ? (firstOperand += event.target.value)
      : firstOperand;
    output.innerHTML = firstOperand;
  } else {
    secondOperand.length < 8
      ? (secondOperand += event.target.value)
      : secondOperand;
    output.innerHTML = secondOperand;
  }
}

function clearData() {
  firstOperand = '';
  secondOperand = '';
  operator = null;
  output.innerHTML = '';
}

function getResult(operand1, operand2, operator) {
  let res;
  switch (operator) {
    case '+':
      res = +operand1 + +operand2;
      return res;
    case '-':
      res = +operand1 - +operand2;
      return res;
    case '*':
      res = +operand1 * +operand2;
      return res;
    case '/':
      res = +operand1 / +operand2;
      return res;

    default:
      break;
  }
}

function setOperator(event) {
  if (secondOperand !== '') {
    firstOperand = getResult(firstOperand, secondOperand, operator);
    secondOperand = '';
    if (('' + firstOperand).length > 8) {
      output.innerHTML = firstOperand.toExponential(2);
    } else {
      output.innerHTML = firstOperand;
    }
    operator = event.target.value;
  }
  wasResult = false;
  operator = event.target.value;
}

function showResult() {
  let result = getResult(firstOperand, secondOperand, operator);
  if (('' + result).length > 8) {
    output.innerHTML = result.toExponential(2);
  } else {
    output.innerHTML = result;
  }
}

buttons.addEventListener('click', (event) => {
  if (event.target.id === 'buttons') return;
  if (isFinite(+event.target.value)) {
    setOperand(operator, event);
  }
  if (
    isNaN(+event.target.value) &&
    event.target.value !== '=' &&
    firstOperand !== ''
  ) {
    setOperator(event);
  }
  if (
    event.target.value === '=' &&
    firstOperand !== '' &&
    secondOperand !== ''
  ) {
    showResult();
    firstOperand = output.textContent;
    operator = null;
    secondOperand = '';
    wasResult = true;
  }
});

clean.addEventListener('click', () => {
  clearData();
});
;
const prevMonthButton = document.querySelector('#prev-month');
const nextMonthButton = document.querySelector('#next-month');
const goToToday = document.querySelector('#go-to-today');
const daysTemplate = document.querySelector('#curr-month');
const calendarWrapper = document.querySelector('#calendar');

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const holidays = [
  { month: 0, day: 1 },
  { month: 0, day: 7 },
  { month: 2, day: 8 },
  { month: 4, day: 1 },
  { month: 4, day: 9 },
  { month: 6, day: 3 },
  { month: 10, day: 7 },
  { month: 11, day: 25 },
];

function currentMonthDays(month, year) {
  const lastDayTimestamp = new Date(year, month + 1).setDate(0);
  const lastDay = new Date(lastDayTimestamp).getDate();
  return lastDay;
}

function createCalendarTemplate() {
  const template = document.createElement('div');
  template.classList.add('l-main__calendar-dates');
  return template;
}

function createEmptyDateBlocks(firstDay, template) {
  for (let i = 1; i < firstDay; i++) {
    const div = document.createElement('div');
    template.append(div);
  }
}

function renderFirstDateSpace(template, month, year) {
  const firstDay = new Date(year, month).getDay();
  if (firstDay > 0) {
    createEmptyDateBlocks(firstDay, template);
  } else {
    createEmptyDateBlocks(7, template);
  }
}

function highlightToday(month, year, date, dateWrapper) {
  if (
    month === currentMonth &&
    year === currentYear &&
    date === currentDate.getDate()
  ) {
    dateWrapper.classList.add('l-main__calendar-dates-item_today');
  }
}

function highlightHoliday(month, date, dateWrapper) {
  for (let item of holidays) {
    if (month === item.month && date === item.day) {
      dateWrapper.classList.add('l-main__calendar-dates-item_red');
    }
  }
}

function highlightWeekend(month, year, date, dateWrapper) {
  const day = new Date(year, month, date).getDay();
  if (day === 0 || day === 6) {
    dateWrapper.classList.add('l-main__calendar-dates-item_red');
  }
}

function createCalendarDates(month, year, template) {
  for (let i = 1; i <= currentMonthDays(month, year); i++) {
    const dateWrapper = document.createElement('div');
    dateWrapper.classList.add('l-main__calendar-dates-item');
    dateWrapper.innerText = i;
    highlightToday(month, year, i, dateWrapper);
    highlightHoliday(month, i, dateWrapper);
    highlightWeekend(month, year, i, dateWrapper);
    template.append(dateWrapper);
  }
}

function renderCalendarDates(month, year) {
  const template = createCalendarTemplate();
  renderFirstDateSpace(template, month, year);
  createCalendarDates(month, year, template);
  calendarWrapper.innerHTML = '';
  calendarWrapper.append(template);
}

function renderCalendar(month, year) {
  daysTemplate.innerHTML = `${months[month]} ${year}`;
  renderCalendarDates(month, year);
}

let cbMonth = currentMonth;
let cbYear = currentYear;

prevMonthButton.addEventListener('click', () => {
  let month = cbMonth ? --cbMonth : (cbMonth = 11);
  let year = cbMonth === 11 ? --cbYear : cbYear;
  renderCalendar(month, year);
});

nextMonthButton.addEventListener('click', () => {
  let year = cbMonth !== 11 ? cbYear : ++cbYear;
  let month = cbMonth !== 11 ? ++cbMonth : (cbMonth = 0);
  renderCalendar(month, year);
});

goToToday.addEventListener('click', () => {
  cbMonth = currentMonth;
  cbYear = currentYear;
  renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);
;
