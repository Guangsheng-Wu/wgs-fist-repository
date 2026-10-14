const display = document.getElementById('display');

let currentValue = '0';
let storedValue = null;
let pendingOperator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.value = currentValue;
}

function inputNumber(value) {
  if (shouldResetDisplay) {
    currentValue = value;
    shouldResetDisplay = false;
  } else {
    currentValue = currentValue === '0' ? value : currentValue + value;
  }

  updateDisplay();
}

function inputDecimal() {
  if (shouldResetDisplay) {
    currentValue = '0.';
    shouldResetDisplay = false;
  } else if (!currentValue.includes('.')) {
    currentValue += '.';
  }

  updateDisplay();
}

function clearCalculator() {
  currentValue = '0';
  storedValue = null;
  pendingOperator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function backspace() {
  if (shouldResetDisplay) {
    currentValue = '0';
    shouldResetDisplay = false;
  } else {
    currentValue = currentValue.length <= 1 ? '0' : currentValue.slice(0, -1);
  }

  updateDisplay();
}

function performCalculation(first, second, operator) {
  switch (operator) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      return second === 0 ? 'Error' : first / second;
    default:
      return second;
  }
}

function handleOperator(operator) {
  const inputValue = Number(currentValue);

  if (storedValue === null) {
    storedValue = inputValue;
  } else if (pendingOperator) {
    const result = performCalculation(storedValue, inputValue, pendingOperator);
    storedValue = result;
    currentValue = String(result);
    updateDisplay();
  }

  pendingOperator = operator;
  shouldResetDisplay = true;
}

function calculateResult() {
  if (storedValue === null || pendingOperator === null) {
    return;
  }

  const inputValue = Number(currentValue);
  const result = performCalculation(storedValue, inputValue, pendingOperator);

  currentValue = String(result);
  storedValue = null;
  pendingOperator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function applyPercent() {
  const value = Number(currentValue) / 100;
  currentValue = String(value);
  updateDisplay();
}

document.querySelectorAll('[data-action="number"]').forEach((button) => {
  button.addEventListener('click', () => {
    inputNumber(button.dataset.value);
  });
});

document.querySelector('[data-action="decimal"]').addEventListener('click', inputDecimal);
document.querySelector('[data-action="clear"]').addEventListener('click', clearCalculator);
document.querySelector('[data-action="backspace"]').addEventListener('click', backspace);
document.querySelector('[data-action="percent"]').addEventListener('click', applyPercent);
document.querySelector('[data-action="equals"]').addEventListener('click', calculateResult);

document.querySelectorAll('[data-action="operator"]').forEach((button) => {
  button.addEventListener('click', () => {
    handleOperator(button.dataset.value);
  });
});

updateDisplay();
