const calc = {
  operandOneArr: [],
  operandTwoArr: [],
  operandOne: null,
  operandTwo: null,
  operator: null,
  answer: null,
};

const buttons = document.querySelector(".buttons");
console.log(buttons);

const lowerTextBox = document.querySelector(".lowerDisplayText");
const upperTextBox = document.querySelector(".upperDisplayText");

const formatOperandArr = function (arr) {
  const obj = {};
  if (arr[0] == ".") arr.unshift("0");
  if (arr[arr.length - 1] == ".") {
    obj.string = arr.join("") + "0";
    obj.number = Number(arr.join(""));
  } else {
    obj.string = arr.join("");
    obj.number = Number(arr.join(""));
  }
  return obj;
};

const setOperandOne = function (value) {
  if (calc.operandOneArr.length + calc.operandTwoArr.length >= 18) return;
  if (lowerTextBox.textContent.length >= 18) return;
  if (calc.answer) {
    if (value == ".") {
      console.log("yup");
      calc.operandOneArr = ["."];
      calc.answer = null;
      return setOperandOne();
    } else {
      console.log("np");
      calc.operandOne = { string: calc.answer, number: calc.answer };
    }
  } else {
    if (value == "." && calc.operandOneArr.includes(".")) return;
    if (value == "0" && calc.operandOneArr.length == 0) return;
    if (value) calc.operandOneArr.push(value);
    calc.operandOne = formatOperandArr(calc.operandOneArr);
  }
};

const setOperandTwo = function (value) {
  if (calc.operandOneArr.length + calc.operandTwoArr.length >= 18) return;
  if (lowerTextBox.textContent.length >= 18) return;
  if (calc.answer && !operandTwoActive()) {
    calc.operandTwo = null;
  } else {
    console.log("hi");
    if (value == "." && calc.operandTwoArr.includes(".")) return;
    if (value == "0" && calc.operandTwoArr.length == 0) return;
    if (value) calc.operandTwoArr.push(value);
    calc.operandTwo = formatOperandArr(calc.operandTwoArr);
  }
};

const calculate = function () {
  if (!calc.operandOne || !calc.operandTwo || !calc.operator) return;
  calc.answer = undefined;
  if (calc.operator == "+")
    calc.answer = calc.operandOne.number + calc.operandTwo.number;
  if (calc.operator == "-")
    calc.answer = calc.operandOne.number - calc.operandTwo.number;
  if (calc.operator == "÷")
    calc.answer = calc.operandOne.number / calc.operandTwo.number;
  if (calc.operator == "×")
    calc.answer = calc.operandOne.number * calc.operandTwo.number;
  setUpperText();
  calc.operandOneArr = [];
  calc.operandTwoArr = [];
  calc.operandOne = null;
  calc.operandTwo = null;
  calc.operator = null;
};

const clear = function () {
  calc.operandOneArr = [];
  calc.operandTwoArr = [];
  calc.operandOne = null;
  calc.operandTwo = null;
  calc.answer = null;
  calc.operator = null;
  setLowerText();
  setUpperText();
};

const setLowerText = function () {
  lowerTextBox.textContent = `${
    calc.operandOne ? calc.operandOne.string : "0"
  } ${calc.operator ? calc.operator : ""} ${
    calc.operandTwo ? calc.operandTwo.string : ""
  }`;
};

const operandOneActive = function () {
  if (
    (!calc.operator && !calc.operandTwo) ||
    (calc.answer && calc.operandTwo && !operandTwoActive())
  ) {
    return true;
  } else {
    return false;
  }
};

const operandTwoActive = function () {
  if (
    (calc.operandOne && calc.operator && !calc.answer) ||
    (calc.answer && calc.operandOne && calc.operator)
  ) {
    return true;
  } else {
    return false;
  }
};

const setUpperText = function () {
  const upperText = calc.answer ? calc.answer.toString().slice(0, 13) : "";
  upperTextBox.textContent = `${calc.answer ? upperText : "0"}`;
};

buttons.addEventListener("click", function (e) {
  const btn = e.target;
  const value = e.target.dataset.value;
  const isNum = btn.classList.contains("btn-num");
  const isDecimal = value == ".";
  const isOperator = btn.classList.contains("btn-op");
  const isEquals = value == "=";
  const isClear = value == "AC";
  const isPlusMinus = value == "±";
  const isPercent = value == "%";

  if ((isNum || isDecimal) && operandOneActive()) {
    console.log("1");
    setOperandOne(value);
    // debugger;
    setLowerText();
  }

  if (isOperator && calc.operandOne && !calc.operator) {
    console.log("2");
    calc.operator = value;
    setLowerText();
  }

  if (isOperator && calc.operator && calc.operandTwo) {
    console.log("3");
    calculate();
    setOperandOne();
    calc.operator = value;
    setLowerText();
  }

  if ((isNum || isDecimal) && operandTwoActive()) {
    console.log("4");
    setOperandTwo(value);
    setLowerText();
  }

  if (isEquals && calc.operandOne && calc.operandTwo && calc.operator) {
    calculate();
  }

  if (
    (isNum || isDecimal) &&
    calc.answer &&
    calc.operandTwo &&
    !operandTwoActive()
  ) {
    console.log("5");
    clear();
    setOperandOne(value);
    setLowerText();
  }

  if (isOperator && calc.answer && operandOneActive()) {
    setOperandOne();
    calc.operandTwoArr = [];
    setOperandTwo();
    calc.operator = value;
    calc.answer = null;
    setLowerText();
  }

  if (isClear) {
    clear();
  }

  if (isPlusMinus && operandOneActive() && !calc.answer) {
    const firstEl = calc.operandOneArr[0];
    if (typeof Number(firstEl) == "number") {
      calc.operandOneArr[0] = (Number(calc.operandOneArr[0]) * -1).toString();
      setOperandOne();
      setLowerText();
    }
    if (firstEl == "0") {
      calc.operandOneArr.unshift("-");
      setOperandOne();
      setLowerText();
    }
    if (firstEl == "-") {
      calc.operandOneArr.shift();
      setOperandOne();
      setLowerText();
    }
  }

  if (isPlusMinus && operandTwoActive() && !calc.answer) {
    const firstEl = calc.operandTwoArr[0];
    if (!firstEl) return;
    if (typeof Number(firstEl) == "number") {
      calc.operandTwoArr[0] = (Number(calc.operandTwoArr[0]) * -1).toString();
      setOperandTwo();
      setLowerText();
    }
    if (firstEl == "0") {
      calc.operandTwoArr.unshift("-");
      setOperandTwo();
      setLowerText();
    }
    if (firstEl == "-") {
      calc.operandTwoArr.shift();
      setOperandTwo();
      setLowerText();
    }
  }

  if (isPercent && operandOneActive()) {
    if (!calc.operandOneArr[0]) return;
    calc.operandOneArr = (Number(calc.operandOneArr.join("")) / 100)
      .toString()
      .slice(0, calc.operandOneArr.length + 3)
      .split("");

    setOperandOne();
    setLowerText();
  }

  if (isPercent && operandTwoActive()) {
    calc.operandTwoArr = (Number(calc.operandTwoArr.join("")) / 100)
      .toString()
      .slice(0, calc.operandTwoArr.length + 3)
      .split("");

    setOperandTwo();
    setLowerText();
  }
});
