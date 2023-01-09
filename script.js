class Calc {
  constructor() {
    currNum.textContent = "0";
  }

  add(num) {
    if (previousNum.textContent === "") {
      previousNum.textContent = num;
      operateDisplay.textContent = "+";
      currNum.textContent = "0";
    } else if (currNum.textContent) {
      if (operateDisplay.textContent == "+") {
        previousNum.textContent =
          Number(previousNum.textContent) + Number(currNum.textContent);
        currNum.textContent = "0";
      } else {
        this.operate(operateDisplay.textContent);
        operateDisplay.textContent = "+";
      }
    }
  }

  subtract(num) {
    if (previousNum.textContent === "") {
      previousNum.textContent = num;
      operateDisplay.textContent = "-";
      currNum.textContent = "0";
    } else if (currNum.textContent) {
      if (operateDisplay.textContent == "-") {
        previousNum.textContent =
          Number(previousNum.textContent) - Number(currNum.textContent);
        currNum.textContent = "0";
      } else {
        this.operate(operateDisplay.textContent);
        operateDisplay.textContent = "-";
      }
    }
  }

  divide(num) {
    if (previousNum.textContent === "") {
      previousNum.textContent = num;
      operateDisplay.textContent = "÷";
      currNum.textContent = "0";
    } else if (currNum.textContent) {
      if (operateDisplay.textContent == "÷") {
        if (currNum.textContent == "0" || previousNum.textContent == "0") {
          alert("It simply cannot be done!");
          return;
        }
        previousNum.textContent =
          Number(previousNum.textContent) / Number(currNum.textContent);
        currNum.textContent = "0";
      } else {
        this.operate(operateDisplay.textContent);
        operateDisplay.textContent = "÷";
      }
    }
  }

  multiply(num) {
    if (previousNum.textContent === "") {
      previousNum.textContent = num;
      operateDisplay.textContent = "*";
      currNum.textContent = "0";
    } else if (currNum.textContent) {
      if (operateDisplay.textContent == "*") {
        previousNum.textContent =
          Number(previousNum.textContent) * Number(currNum.textContent);
        currNum.textContent = "0";
      } else {
        this.operate(operateDisplay.textContent);
        operateDisplay.textContent = "*";
      }
    }
  }

  operate(operator) {
    switch (operator) {
      case "+":
        this.add(currNum.textContent);
        break;
      case "-":
        this.subtract(currNum.textContent);
        break;
      case "÷":
        this.divide(currNum.textContent);
        break;
      case "*":
        this.multiply(currNum.textContent);
        break;
    }
  }

  decimal() {
    if (!currNum.textContent.includes(".")) {
      currNum.textContent += ".";
    }
  }

  backspace() {
    if (currNum.textContent.length == 1) {
      currNum.textContent = "0";
    } else {
      currNum.textContent = currNum.textContent.slice(
        0,
        currNum.textContent.length - 1
      );
    }
  }

  equals() {
    if (!operateDisplay.textContent) return;
    this.operate(operateDisplay.textContent);
    currNum.textContent = previousNum.textContent;
    operateDisplay.textContent = "";
    previousNum.textContent = "";
  }

  clear() {
    currNum.textContent = "0";
    operateDisplay.textContent = "";
    previousNum.textContent = "";
  }

  updateScreen(num) {
    if (currNum.textContent == "0") {
      currNum.textContent = num;
    } else {
      currNum.textContent += num;
    }
  }
}

const currNum = document.querySelector(".curr-num");
const operateDisplay = document.querySelector(".operate-display");
const previousNum = document.querySelector(".previous-num");
const buttons = document.querySelectorAll("button");

const myCalc = new Calc();

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("numbers")) {
      myCalc.updateScreen(button.textContent);
    } else if (button.classList.contains("clear")) {
      myCalc.clear();
    } else if (button.classList.contains("equals")) {
      myCalc.equals();
    } else {
      switch (button.dataset.operation) {
        case "add":
          myCalc.add(currNum.textContent);
          break;
        case "subtract":
          myCalc.subtract(currNum.textContent);
          break;
        case "divide":
          myCalc.divide(currNum.textContent);
          break;
        case "multiply":
          myCalc.multiply(currNum.textContent);
          break;
        case "decimal":
          myCalc.decimal();
          break;
        case "backspace":
          myCalc.backspace();
          break;
      }
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (!isNaN(Number(e.key))) {
    e.preventDefault();
    myCalc.updateScreen(e.key);
  } else {
    switch (e.key) {
      case "/":
        e.preventDefault();
        myCalc.divide(currNum.textContent);
        break;
      case "*":
        e.preventDefault();
        myCalc.multiply(currNum.textContent);
        break;
      case "+":
        e.preventDefault();
        myCalc.add(currNum.textContent);
        break;
      case "-":
        e.preventDefault();
        myCalc.subtract(currNum.textContent);
        break;
      case "Backspace":
        e.preventDefault();
        myCalc.backspace();
        break;
      case "Enter":
        e.preventDefault();
        myCalc.equals();
        break;
      case ".":
        e.preventDefault();
        myCalc.decimal();
        break;
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".calc").style.opacity = "1";
  let buttonList = Array.from(buttons);
  let revealButtons = 0;
  let myInterval = setInterval(() => {
    if (revealButtons >= buttonList.length) {
      clearInterval(myInterval);
      document.querySelector(".created-by").style.opacity = 1;
    } else {
      buttonList[revealButtons].classList.add("reveal");
      revealButtons++;
    }
  }, 75);
});
