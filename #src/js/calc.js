const output = document.querySelector('#output');
const clean = document.querySelector('#clean');
const buttons = document.querySelector('#buttons');

let firstOperand = '';
let secondOperand = '';
let operator = null;
let wasResult = false;

function setOperand(operator, event) {
  if (event.target.value === '0' && output.textContent === '0') return;
  if (wasResult) {
    clearData();
    wasResult = false;
  }
  if (!operator) {
    if (firstOperand.length < 8) {
      firstOperand += event.target.value;
      output.innerHTML = Number(firstOperand);
    }
  } else if (secondOperand.length < 8) {
    secondOperand += event.target.value;
    output.innerHTML = Number(secondOperand);
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
  const operatorValue = event.target.value;
  if (secondOperand !== '') {
    firstOperand = getResult(firstOperand, secondOperand, operator);
    secondOperand = '';
    if (String(firstOperand).length > 8) {
      output.innerHTML = firstOperand.toExponential(2);
    } else {
      output.innerHTML = firstOperand;
    }
    operator = operatorValue;
  }
  wasResult = false;
  operator = operatorValue;
}

function showResult() {
  const result = getResult(firstOperand, secondOperand, operator);
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
});

clean.addEventListener('click', () => {
  clearData();
});
