const lowerDisplayBox = document.querySelector(".lowerDisplayText");
const upperDisplayBox = document.querySelector(".upperDisplayText");
const calc = {
  lowerText: lowerDisplayBox.textContent,
  setLowerText: function () {
    // if (new.length > 14) return;
    lowerDisplayBox.textContent = `${this.operandOne ? this.operandOne : ""} ${
      this.operator ? this.operator : ""
    } ${this.operandTwo ? this.operandTwo : ""}`;
  },

  operandOne: null,
  operandOneArr: [],
  operandTwo: null,
  operandTwoArr: [],
  setOperandOne: function (value) {
    this.operandOneArr.push(value);
    const printedValue = this.operandOneArr.join("");
    this.operandOne = Number(printedValue);
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
    if (this.operator === "/") ans = this.operandOne / this.operandTwo;
    if (this.operator === "X") ans = this.operandOne * this.operandTwo;
    if (this.operator === "-") ans = this.operandOne - this.operandTwo;
    if (this.operator === "+") ans = this.operandOne + this.operandTwo;
    this.answer = ans;
    console.log(this.answer);
    upperDisplayBox.textContent = ans;
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
    this.operandTwoAnswer = null;
    this.operator = null;
    this.answer = null;
    this.setLowerText();
    this.setUpperText();
  },
};

export default calc;
