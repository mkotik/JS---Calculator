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
  operandTwo: null,
  setOperandOne: function (value) {
    this.operandOne = value;
  },
  setOperandTwo: function (value) {
    this.operandTwo = value;
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
    this.operandOne = Number(this.operandOne);
    this.operandTwo = Number(this.operandTwo);
    console.log(typeof this.operandOne);
    if (this.operator === "/") ans = this.operandOne / this.operandTwo;
    if (this.operator === "X") ans = this.operandOne * this.operandTwo;
    if (this.operator === "-") ans = this.operandOne - this.operandTwo;
    if (this.operator === "+") ans = this.operandOne + this.operandTwo;
    upperDisplayBox.textContent = ans;
  },
};

export default calc;
