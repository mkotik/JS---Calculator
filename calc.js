const lowerDisplayBox = document.querySelector(".lowerDisplayText");
const upperDisplayBox = document.querySelector(".upperDisplayText");
const calc = {
  lowerText: lowerDisplayBox.textContent,
  setLowerText: function () {
    // if (new.length > 14) return;
    if (this.answer) {
      lowerDisplayBox.textContent = `${this.operandOne ? "ans" : "0"} ${
        this.operator ? this.operator : ""
      } ${this.operandTwo ? this.operandTwo : ""}`;
    } else {
      lowerDisplayBox.textContent = `${
        this.operandOne ? this.operandOne : ""
      } ${this.operator ? this.operator : ""} ${
        this.operandTwo ? this.operandTwo : ""
      }`;
    }
  },

  operandOne: null,
  operandOneArr: [],
  operandTwo: null,
  operandTwoArr: [],
  setOperandOne: function (value) {
    if (this.answer) {
      this.operandOne = Number(this.answer);
    } else {
      this.operandOneArr.push(value);
      const printedValue = this.operandOneArr.join("");
      if (printedValue[printedValue.length - 1] === ".") {
        const flPointPrintedValue = printedValue;
        this.operandOne = flPointPrintedValue;
        return;
      }
      this.operandOne = Number(printedValue);
    }
  },
  setOperandTwo: function (value) {
    this.operandTwoArr.push(value);
    const printedValue = this.operandTwoArr.join("");
    this.operandTwo = Number(printedValue);
  },
  operator: null,
  setOperator: function (value) {
    this.operator = value;
  },

  answer: null,
  setAnswer: function (value) {
    this.answer = value;
  },
  buttons: [
    "AC",
    "+/-",
    "%",
    "/",
    7,
    8,
    9,
    "X",
    4,
    5,
    6,
    "-",
    1,
    2,
    3,
    "+",
    0,
    ".",
    "=",
  ],
  operandButtons: ["X", "-", "/", "+"],
  calculate: function () {
    let ans;
    if (this.operator === "/")
      ans = Number(this.operandOne) / Number(this.operandTwo);
    if (this.operator === "X")
      ans = Number(this.operandOne) * Number(this.operandTwo);
    if (this.operator === "-")
      ans = Number(this.operandOne) - Number(this.operandTwo);
    if (this.operator === "+")
      ans = Number(this.operandOne) + Number(this.operandTwo);
    this.answer = ans;

    this.operandOne = null;
    this.operandOneArr = [];
    this.operandTwo = null;
    this.operandTwoArr = [];
    this.operator = null;

    upperDisplayBox.textContent = ans;
    this.setLowerText();
  },
  answer: null,
  setUpperText: function () {
    upperDisplayBox.textContent = `${this.answer ? "ans" : ""}`;
  },
  clear: function () {
    this.operandOne = null;
    this.operandOneArr = [];
    this.operandTwo = null;
    this.operandTwoArr = [];
    this.operator = null;
    this.answer = null;
    this.setLowerText();
    this.setUpperText();
  },
};

export const decFormatter = function (operandArr) {
  const lastIndex = operandArr.length - 1;
  const lastItem = operandArr[lastIndex];
  const object = {};
  if (lastItem === ".") {
    object.string = operandArr.join("") + "0";
    object.num = Number(operandArr.join(""));
  }
  return object;
};

export default calc;
