let result = '0';
let currentOperand = '';
let previousOperand = '';
let currentOperation = null;

function handleNumber(num) {
  if (currentOperand.includes('.') && num === '.') return; // prevent multiple decimal points
  currentOperand = currentOperand === '0' ? num : currentOperand + num;
  displayResult();
}

function handleOperator(op) {
  if (currentOperation !== null) {
    calculateResult();
  }
  currentOperation = op;
  previousOperand = currentOperand;
  currentOperand = '';
  displayResult();
}

function calculateResult() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (currentOperation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  currentOperand = result.toString();
  previousOperand = '';
  currentOperation = null;
  displayResult();
}

function clearResult() {
  result = '0';
  currentOperand = '';
  previousOperand = '';
  currentOperation = null;
  displayResult();
}

function displayResult() {
  const resultDisplay = document.querySelector('.result');
  let displayValue;

  if (currentOperation === null) {
    displayValue = currentOperand;
  } else {
    displayValue = `${previousOperand} ${currentOperation} ${currentOperand}`;
  }

  resultDisplay.textContent = displayValue || '0';
}

function toggleMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  const modeLabel = document.querySelector('.mode-label');
  modeLabel.textContent = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  isDarkMode = !isDarkMode;
}

window.addEventListener('load', () => {
  const modeToggle = document.querySelector('.mode-toggle input');
  modeToggle.checked = isDarkMode;
  toggleMode();
});