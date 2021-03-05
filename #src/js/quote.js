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
