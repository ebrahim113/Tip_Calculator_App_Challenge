let tipValue = 0;

const tips = document.querySelectorAll(".tip .percentages button");

const bill = document.getElementById("bill");

const customTip = document.querySelector(".tip .percentages input");

const error = document.querySelector(".people div .error");

const numberOfPeople = document.getElementById("numOfPeople");

const tipAmount = document.querySelector(".results .amount .result");

const total = document.querySelector(".results .total .result");

const reset = document.querySelector(".reset");

customTip.addEventListener("input", (_) => {
  const customTipValue = customTip.value;
  if (customTipValue > 0) {
    tipValue = customTipValue;
    tips.forEach((tip) => tip.classList.remove("selected"));
  }
});

tips.forEach((tip) => {
  tip.addEventListener("click", (e) => {
    tips.forEach((tip) => tip.classList.remove("selected"));
    customTip.value = "";
    const target = e.target;
    target.classList.add("selected");
    tipValue = +target.textContent
      .split("")
      .slice(0, target.value.indexOf("%"))
      .join("");
  });
});

numberOfPeople.addEventListener("input", (_) => {
  const numberOfPeopleValue = numberOfPeople.value;
  const billValue = bill.value;
  if (numberOfPeopleValue > 0) {
    numberOfPeople.classList.remove("error");
    error.style.display = "none";
    tipAmount.textContent = (
      (billValue * tipValue) /
      100 /
      numberOfPeopleValue
    ).toFixed(2);
    total.textContent = (
      +tipAmount.textContent +
      billValue / numberOfPeopleValue
    ).toFixed(2);
  } else {
    numberOfPeople.classList.add("error");
    error.style.display = "block";
  }
  if (+tipAmount.textContent > 0 || +total.textContent > 0) {
    reset.style.opacity = "1";
  } else {
    reset.style.opacity = ".1";
    reset.style.cursor = "not allowed";
  }
});

reset.addEventListener("click", (_) => {
  bill.value = "";
  tipAmount.textContent = "$0.00";
  numberOfPeople.value = "";
  total.textContent = "$0.00";
  reset.style.opacity = ".1";
  reset.style.cursor = "not allowed";
  tips.forEach((tip) => tip.classList.remove("selected"));
});
