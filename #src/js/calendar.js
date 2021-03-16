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
