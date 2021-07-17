import calc from "./calc.js";
console.log("hi");
const lowerDisplayBox = document.querySelector(".lowerDisplayText");
const buttonBox = document.querySelector(".buttons");

// Build out the UI components
const createButtons = function (buttons) {
  const btnsArr = buttons.map((cur) => {
    return document.createElement("div");
  });
  btnsArr.forEach((cur, i) => {
    const text = calc.buttons[i];
    const h3 = document.createElement("h3");
    h3.textContent = text;
    cur.appendChild(h3);
    cur.dataset.value = buttons[i];
    cur.classList.add("button");
    cur.classList.add(`btn${buttons[i]}`);
    buttonBox.appendChild(cur);
    if (cur === 0) cur.classList.add("btn0");
  });

  console.log(btnsArr);
  console.log(btnsArr[3].dataset.value);
};

createButtons(calc.buttons);
const btnArr = Array.from(document.querySelectorAll(".button"));
const numberBtnArr = btnArr.filter((cur) => cur.dataset.value * 0 === 0);

// Add event listener
buttonBox.addEventListener("click", function (e) {
  const target = e.target.closest(".button");
  console.log(target);
  const value = target.dataset.value;
  const isNumber = numberBtnArr.includes(target);
  const isOperator = calc.operandButtons.includes(value);
  const isEqualsSign = value.includes("=");
  const isClearBtn = value.includes("AC");
  const isDecimalBtn = value.includes(".");
  const operandOneSet = calc.operandOne ? true : false;
  const operandTwoSet = calc.operandTwo ? true : false;
  const operatorSet = calc.operator ? true : false;
  if (isNumber && !operatorSet) {
    calc.setOperandOne(value);
    calc.setLowerText();
  }
  if (isOperator && operandOneSet && !operandTwoSet) {
    calc.setOperator(value);

    calc.setOperandOne();
    calc.setLowerText();
  }
  if (isNumber && operatorSet) {
    calc.setOperandTwo(value);
    calc.setLowerText();
  }
  if (isEqualsSign && operandOneSet && operandTwoSet && operatorSet) {
    calc.calculate();
  }
  if (isClearBtn) {
    calc.clear();
  }
  if (isOperator && calc.answer) {
    calc.setOperandOne();
    calc.setOperator(value);
    calc.setLowerText();
    console.log(calc.operandOne);
  }
  if (isOperator && operandOneSet && operatorSet && operandTwoSet) {
    calc.calculate();
    calc.setOperandOne();
    calc.setOperator(value);
    calc.setLowerText();
  }
  if (isDecimalBtn && !operatorSet && !operandTwoSet) {
    if (calc.operandOneArr.includes(".")) return;
    if (!calc.operandOneArr.length) return;
    calc.setOperandOne(value);
    calc.setLowerText();
  }

  // if (isDecimalBtn && operandOneSet && operatorSet) {
  //   calc.setOperandTwo(value);
  //   calc.setLowerText();
  // }
});

const btnOperandOne = document.querySelector(".btnOperandOne");
const btnOperandTwo = document.querySelector(".btnOperandTwo");
const btnAnswer = document.querySelector(".btnAnswer");
const btnOperandOneArr = document.querySelector(".btnOperandOneArr");
const btnOperandTwoArr = document.querySelector(".btnOperandTwoArr");

btnOperandOne.addEventListener("click", function () {
  console.log(calc.operandOne);
});

btnOperandTwo.addEventListener("click", function () {
  console.log(calc.operandTwo);
});

btnAnswer.addEventListener("click", function () {
  console.log(calc.answer);
});

btnOperandOneArr.addEventListener("click", function () {
  console.log(calc.operandOneArr);
});

btnOperandTwoArr.addEventListener("click", function () {
  console.log(calc.operandTwoArr);
});
