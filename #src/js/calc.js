'use strict';

const output = document.querySelector('#output');
const clean = document.querySelector('#clean');
const buttons = document.querySelector('#buttons');

let outputText = '';
let operand;
let operator;

function setOperand(event) {
  if (outputText.length === 8) return;
  outputText += event.target.value;
  output.innerText = outputText;
}

function getResult(operator) {
  switch (operator) {
    case '+':
      return Number(outputText) + Number(operand);
    case '-':
      return Number(outputText) - Number(operand);
    case '*':
      return Number(outputText) * Number(operand);
    case '/':
      return Number(outputText) / Number(operand);
  }
}

buttons.addEventListener('click', (event) => {
  if (event.target.dataset.group === 'number') {
    setOperand(event);
  }
  if (event.target.dataset.group === 'operator') {
    operator = event.target.value;
    if (outputText.length) {
      operand = outputText;
      outputText = '';
      return;
    }
    if (output.textContent) output.innerText = getResult(operator);
  }
});

clean.addEventListener('click', () => {
  outputText = '';
  output.innerText = outputText;
});
