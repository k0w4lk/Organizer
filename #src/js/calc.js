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
