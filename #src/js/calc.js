let one = document.querySelector('#one'),
  two = document.querySelector('#two'),
  three = document.querySelector('#three'),
  four = document.querySelector('#four'),
  five = document.querySelector('#five'),
  six = document.querySelector('#six'),
  seven = document.querySelector('#seven'),
  eight = document.querySelector('#eight'),
  nine = document.querySelector('#nine'),
  zero = document.querySelector('#zero'),
  plus = document.querySelector('#plus'),
  minus = document.querySelector('#minus'),
  mult = document.querySelector('#mult'),
  div = document.querySelector('#div'),
  equally = document.querySelector('#equally'),
  output = document.querySelector('#output'),
  clean = document.querySelector('#clean'),
  arr = [],
  res = undefined,
  isResOnScreen = false,
  isResWithOperator = false;

function pressNumber() {
  if (arr.length < 12) {
    if (isResOnScreen && !isResWithOperator) {
      arr[0] = this.textContent;
    } else {
      arr.push(this.textContent);
    }
    output.innerHTML = arr.join('');
    isResOnScreen = false;
    isResWithOperator = false;
  }
}

function pressOperator() {
  if (arr[0] != undefined && arr.length < 12) {
    if (
      arr[arr.length - 1] == '+' ||
      arr[arr.length - 1] == '-' ||
      arr[arr.length - 1] == '*' ||
      arr[arr.length - 1] == '÷'
    ) {
      arr[arr.length - 1] = this.textContent;
      output.innerHTML = arr.join('');
    } else {
      arr.push(this.textContent);
      output.innerHTML = arr.join('');
    }
    isResWithOperator = true;
  }
}

function expressionResult() {
  res = eval(arr.join('').replace('÷', '/'));
  let resString = res.toString();
  if (res != undefined) {
    if (resString.length > 12) {
      output.innerHTML = res.toFixed(3);
    } else {
      output.innerHTML = res;
    }
  }

  arr.length = 1;
  arr[0] = res;
  isResOnScreen = true;
}

function cleanOutput() {
  arr = [];
  output.innerHTML = arr.join('');
}

one.addEventListener('click', pressNumber);
two.addEventListener('click', pressNumber);
three.addEventListener('click', pressNumber);
four.addEventListener('click', pressNumber);
five.addEventListener('click', pressNumber);
six.addEventListener('click', pressNumber);
seven.addEventListener('click', pressNumber);
eight.addEventListener('click', pressNumber);
nine.addEventListener('click', pressNumber);
zero.addEventListener('click', pressNumber);

plus.addEventListener('click', pressOperator);
minus.addEventListener('click', pressOperator);
mult.addEventListener('click', pressOperator);
div.addEventListener('click', pressOperator);

equally.addEventListener('click', expressionResult);

clean.addEventListener('click', cleanOutput);
