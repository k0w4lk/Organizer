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
