const currentDate = document.querySelector('#current-date');

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
  currentDate.innerText = `${today.toLocaleDateString()} (${
    days[today.getDay()]
  })`;
}

@@include('todo.js');
@@include('quote.js');
@@include('weather.js');
@@include('calc.js');
@@include('calendar.js');
