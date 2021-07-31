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
  if (calc.answer && value !== ".") {
    calc.operandOne = { string: calc.answer, number: calc.answer };
  } else {
    if (value == "." && calc.operandOneArr.includes(".")) return;
    if (value == "0" && calc.operandOneArr.length == 0) return;
    if (value) calc.operandOneArr.push(value);
    calc.operandOne = formatOperandArr(calc.operandOneArr);
  }
};

const setOperandTwo = function (value) {
  if (calc.answer) calc.operandTwo = null;
  if (value == "." && calc.operandTwoArr.includes(".")) return;
  if (value == "0" && calc.operandOneArr.length == 0) return;
  if (value) calc.operandTwoArr.push(value);
  calc.operandTwo = formatOperandArr(calc.operandTwoArr);
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

const setUpperText = function () {
  upperTextBox.textContent = calc.answer;
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
  const operandOneActive =
    (!calc.operator && !calc.operandTwo) || (calc.answer && calc.operandTwo);
  const operandTwoActive =
    (calc.operandOne && calc.operator && !calc.answer) ||
    (calc.answer && calc.operandOne && calc.operator);

  if ((isNum || isDecimal) && operandOneActive) {
    setOperandOne(value);
    setLowerText();
  }

  if (isOperator && calc.operandOne) {
    calc.operator = value;
    setLowerText();
  }

  if ((isNum || isDecimal) && operandTwoActive) {
    setOperandTwo(value);
    setLowerText();
  }

  if (isEquals && calc.operandOne && calc.operandTwo && calc.operator) {
    calculate();
  }

  if ((isNum || isDecimal) && calc.answer && calc.operandTwo) {
    clear();
    setOperandOne(value);
    setLowerText();
  }

  if (isOperator && calc.answer && operandOneActive) {
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

  if (isPlusMinus && operandOneActive && !calc.answer) {
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

  if (isPlusMinus && operandTwoActive && !calc.answer) {
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
});

const btnOperandOne = document.querySelector(".btnOperandOne");
const btnOperandOneArr = document.querySelector(".btnOperandOneArr");
const btnOperandTwo = document.querySelector(".btnOperandTwo");
const btnOperandTwoArr = document.querySelector(".btnOperandTwoArr");

btnOperandOne.addEventListener("click", function () {
  console.log(calc.operandOne);
});

btnOperandOneArr.addEventListener("click", function () {
  console.log(calc.operandOneArr);
});
