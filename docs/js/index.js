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
        },
      ])
    );
  else {
    localStorage.setItem('dataTBD', JSON.stringify([...dataTBD]));
    localStorage.setItem('dataDone', JSON.stringify([...dataDone]));
  }
}

function addNewTask() {
  const taskText = newTaskText.value;
  newTaskText.focus();

  if (!taskText) {
    newTaskError.innerText = 'You have not entered a task name';
    return;
  }

  const taskID = Math.random().toString(32).slice(3);
  const isChecked = false;
  const toEdit = false;

  newTaskText.value = '';
  resetCheckboxesStatuses();
  massButtonActivity();
  saveTasksData({ taskText, taskID, isChecked, toEdit });

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
newTaskText.addEventListener('keyup', (event) => {
  if (event.code === 'Enter') addNewTask(newTaskText, listTBD);
});
newTaskText.addEventListener('blur', clearNewTaskErrorText);

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
const currentDate = document.querySelector('#current-date');
const qodAuthor = document.querySelector('#qod-author');
const qodText = document.querySelector('#qod-text');
const QUOTE_URL = 'https://quotes.rest/qod';

let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednessday',
  'Thursday',
  'Friday',
  'Saturday',
];

function getCurrentDate() {
  let today = new Date();
  return today;
}

function showCurrentDate() {
  let today = getCurrentDate();
  currentDate.innerText = `${today.toLocaleDateString()} (${
    days[today.getDay()]
  })`;
}

async function getQoD() {
  let response = await fetch(QUOTE_URL);
  let data = await response.json();
  let quote = await data.contents.quotes[0].quote;
  let author = await data.contents.quotes[0].author;
  qodAuthor.innerText = `${author}:`;
  qodText.innerText = `"${quote}"`;
}

getQoD();
showCurrentDate();

setInterval(() => {
  getQoD();
  showCurrentDate();
}, 6e4);
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

let savedCity = JSON.parse(localStorage.getItem('savedCity')) || {
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
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

let temperature, feelsLike, icon, src, city;

getWeatherData(
  API_KEY,
  localStorage.getItem('savedCity') ? savedCity.city : DEFAULT_CITY_NAME
).then((res) => {
  temperature = res.main.temp;
  feelsLike = res.main.feels_like;
  icon = res.weather[0].icon;
  city = res.name;
  src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  weatherCity.innerText = `${city}: `;
  feelsLikeText.innerHTML = `Feels like: ${Math.round(feelsLike)} &#730;C`;
  weatherTemperature.innerHTML = `${Math.round(temperature)} &#730;C`;
  weatherIcon.src = src;
  changeCity.innerHTML = `${city} isn't your city?`;
  changeCityButton.innerText = 'Change.';
  weatherPreload.classList.add('l-main-header__weather-preloader_hidden');
  weatherLoad.classList.remove('l-main-header__weather-loaded_hidden');
});

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

save.addEventListener('click', () => {
  getWeatherData(API_KEY, newCity.value).then((res) => {
    try {
      temperature = res.main.temp;
      feelsLike = res.main.feels_like;
      icon = res.weather[0].icon;
      city = res.name;
      src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      weatherCity.innerText = `${city}: `;
      feelsLikeText.innerHTML = `Feels like: ${Math.round(feelsLike)} &#730;C`;
      weatherTemperature.innerHTML = `${Math.round(temperature)} &#730;C`;
      weatherIcon.src = src;
      changeCity.innerHTML = `${city} isn't your city?`;
      changeCityButton.innerText = 'Change.';
      weatherPreload.classList.add('l-main-header__weather-preloader_hidden');
      weatherLoad.classList.remove('l-main-header__weather-loaded_hidden');
      saveCity(newCity.value);
      newCity.remove();
      save.remove();
    } catch {
      newCity.value = '';
      newCity.placeholder = 'City not found';
      newCity.focus();
      weatherBlock.append(errorText);
    }
  });
});
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
const daysTemplate = document.querySelector('#curr-month');
const calendarTemplate = document.querySelector('#calendar');

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

let months = [
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

let holidays = [
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
  let days = new Date(new Date(year, month + 1).setDate(0)).getDate();
  return days;
}

function showCurrentMonthDays(month, year) {
  let template = document.createElement('div');
  template.classList.add('l-main__calendar-dates');
  let firstDay = new Date(year, month).getDay();
  if (firstDay >= 2) {
    for (let i = 2; i < firstDay; i++) {
      let div = document.createElement('div');
      template.append(div);
    }
  }
  if (firstDay === 0) {
    for (let i = 0; i < 6; i++) {
      let div = document.createElement('div');
      template.append(div);
    }
  }
  createTemplate: for (let i = 1; i <= currentMonthDays(month, year); i++) {
    for (let item of holidays) {
      if (month === item.month && i === item.day) {
        let div = document.createElement('div');
        div.classList.add(
          'l-main__calendar-dates-item',
          'l-main__calendar-dates-item_red'
        );
        if (
          month === currentMonth &&
          year === currentYear &&
          i === new Date().getDate()
        ) {
          div.classList.add('l-main__calendar-item_today');
        }
        div.innerText = i;
        template.append(div);
        continue createTemplate;
      }
    }
    if (
      month === currentMonth &&
      year === currentYear &&
      i === new Date().getDate()
    ) {
      let div = document.createElement('div');
      div.classList.add(
        'l-main__calendar-dates-item',
        'l-main__calendar-dates-item_today'
      );
      div.innerText = i;
      template.append(div);
    } else {
      let div = document.createElement('div');
      div.classList.add('l-main__calendar-dates-item');
      div.innerText = i;
      template.append(div);
    }
  }
  calendar.innerHTML = '';
  calendar.append(template);
}

let cbMonth = currentMonth;
let cbYear = currentYear;

prevMonthButton.addEventListener('click', () => {
  let month = cbMonth ? --cbMonth : ((cbMonth = 11), 11);
  let year = cbMonth === 11 ? --cbYear : cbYear;
  render(month, year);
});

nextMonthButton.addEventListener('click', () => {
  let year = cbMonth !== 11 ? cbYear : ++cbYear;
  let month = cbMonth !== 11 ? ++cbMonth : ((cbMonth = 0), 0);
  render(month, year);
});

function render(month, year) {
  daysTemplate.innerHTML = `${months[month]} ${year}`;
  showCurrentMonthDays(month, year);
}

render(currentMonth, currentYear);
;