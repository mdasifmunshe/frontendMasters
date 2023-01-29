let runningTotal = 0;
let buffer = "0";
let previousOperator;
const result = document.querySelector(".result");
const inputs = document.querySelector(".inputs");
const buttonArrow = document.querySelector("#buttonArrow");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else if (previousOperator === "÷") {
    runningTotal /= intBuffer;
  }
}

function handleSymbol(value) {
  if (value === "C") {
    buffer = "0";
    runningTotal = 0;
    buttonArrow.disabled = false;
  } else if (value === "←") {
    if (buffer.length === 1) {
      buffer = "0";
    } else {
      buffer = buffer.substring(0, buffer.length - 1);
    }
  } else if (value === "=") {
    if (previousOperator === null) {
      // need two numbers to do math
      return;
    }
    flushOperation(parseInt(buffer));
    previousOperator = null;
    buffer = +runningTotal;
    runningTotal = 0;
    buttonArrow.disabled = true;
  } else if (value === "+" || value === "-" || value === "×" || value === "÷") {
    handleMath(value);
    buttonArrow.disabled = false;
  } else {
    console.log("Error in handleSymbol Function");
  }
}

function rerender() {
  result.innerText = buffer;
}

function init() {
  inputs.addEventListener("click", function (event) {
    if (event.target.tagName == "BUTTON") {
      buttonClick(event.target.innerText);
    } else {
      console.log("Not a BUTTON");
    }
  });
}

init();
