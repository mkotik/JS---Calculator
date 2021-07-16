console.log("hi");
const lowerDisplayBox = document.querySelector(".displayText");
const buttonBox = document.querySelector(".buttons");

const calc = {
  lowerText: lowerDisplayBox.textContent,
  setLowerText: function () {
    if (newValue.length > 14) return;
    lowerDisplayBox.textContent = this.operandOne;
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
};

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
console.log(numberBtnArr);

buttonBox.addEventListener("click", function (e) {
  const target = e.target.closest(".button");
  const value = target.dataset.value;
  if (numberBtnArr.includes(target)) {
    calc.setOperandOne(value);
  }
});

// .closest
