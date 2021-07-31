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
  if (calc.answer)
    calc.operandOne = { string: calc.answer, number: calc.answer };
  if (value == "." && calc.operandOneArr.includes(".")) return;
  calc.operandOneArr.push(value);
  calc.operandOne = formatOperandArr(calc.operandOneArr);
};

const setOperandTwo = function (value) {
  if (calc.answer) calc.operandTwo = null;
  if (value == "." && calc.operandTwoArr.includes(".")) return;
  calc.operandTwoArr.push(value);
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
  const operandOneActive = !calc.operator && !calc.operandTwo;
  const operandTwoActive = calc.operandOne && calc.operator && !calc.answer;

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

  if (isClear) {
    calc.operandOneArr = [];
    calc.operandTwoArr = [];
    calc.operandOne = null;
    calc.operandTwo = null;
    calc.answer = null;
    setLowerText();
    setUpperText();
  }
});

const btnOperandOne = document.querySelector(".btnOperandOne");
const btnOperandOneArr = document.querySelector(".btnOperandOneArr");
const btnOperandTwo = document.querySelector(".btnOperandTwo");
const btnOperandTwoArr = document.querySelector(".btnOperandTwoArr");

btnOperandOne.addEventListener("click", function () {
  console.log(calc.operandOne);
});
