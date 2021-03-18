'use strict';

const output = document.querySelector('#output');
const clean = document.querySelector('#clean');
const buttons = document.querySelector('#buttons');

let firstOperand = '';
let secondOperand = '';
let operator = null;
let wasResult = false;

function setOperand(operator, event) {
  if (event.target.value === '0' && output.textContent === '0') return;
  if (firstOperand === '0') firstOperand = '';
  if (secondOperand === '0') secondOperand = '';
  if (wasResult) {
    clearData();
    wasResult = false;
  }
  if (!operator) {
    if (firstOperand.length < 8) {
      firstOperand += event.target.value;
      output.innerHTML = firstOperand;
    }
  } else if (secondOperand.length < 8) {
    secondOperand += event.target.value;
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
  switch (operator) {
    case '+':
      return Number(operand1) + Number(operand2);
    case '-':
      return Number(operand1) - Number(operand2);
    case '*':
      return Number(operand1) * Number(operand2);
    case '/':
      return Number(operand1) / Number(operand2);

    default:
      return null;
  }
}

function setOperator(event) {
  if (secondOperand !== '') {
    firstOperand = getResult(firstOperand, secondOperand, operator);
    secondOperand = '';
    if (String(firstOperand).length > 8) {
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
  if (String(result).length > 8) {
    output.innerHTML = result.toExponential(2);
  } else {
    output.innerHTML = result;
  }
}

buttons.addEventListener('click', (event) => {
  if (event.target.id === 'buttons') return;
  if (isFinite(Number(event.target.value))) {
    setOperand(operator, event);
  }
  if (
    isNaN(Number(event.target.value)) &&
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
  console.log(firstOperand, operator, secondOperand);
});

clean.addEventListener('click', () => {
  clearData();
});
