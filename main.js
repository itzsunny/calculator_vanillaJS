let totalValue = 0;
let bufferValue = "0";
let previousOperator = null;
const btn = document.getElementById("calculator_buttons");
let screen = document.getElementById("screen");

btn.addEventListener("click", event => {
  function audioPlay(url){
    var audio = new Audio(url);
    audio.play();
  }
  audioPlay('click.mp3')
  handleClick(event.target.innerText);
});

function handleClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  displayValue();
}
function handleNumber(value) {
  if (bufferValue === "0") {
    bufferValue = value;
  } else {
    bufferValue += value;
  }
}

function handleSymbol(value) {
  if (value === "C") {
    bufferValue = "0";
    totalValue = 0;
  } else if (value === "=") {
    if (previousOperator === null) {
      return;
    } else {
      handleOperators(parseInt(value));
      previousOperator = null;
      bufferValue = totalValue;
      totalValue = 0;
    }
  } else if (value === "←") {
    if (bufferValue.length === 1) {
      bufferValue = "0";
    } else {
      bufferValue = bufferValue.substring(0, bufferValue.length - 1);
    }
  } else {
    handleOperators(value);
  }
}

function handleOperators(value) {
  const convertedNum = parseInt(bufferValue);
  if (totalValue === 0) {
    totalValue += convertedNum;
  } else {
    handleMathOperation(convertedNum);
  }
  previousOperator = value;
  bufferValue = "0";
}

function handleMathOperation(convertedNum) {
  if (previousOperator === "÷") {
    totalValue /= convertedNum;
  } else if (previousOperator === "×") {
    totalValue *= convertedNum;
  } else if (previousOperator === "+") {
    totalValue += convertedNum;
  }else if (previousOperator === "-") {
    totalValue -= convertedNum;
  }
}

function displayValue() {
  screen.innerText = bufferValue;
  if (bufferValue.length > 9){
      bufferValue = 0; 
  }
  }

