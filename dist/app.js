const moneyAmountInput = document.querySelector("#bill-value");
const peopleCountInput = document.querySelector("#people-count");
const tipPrecentButtons = document.querySelectorAll(".tip-percentage-buttons button");
const customTipInput = document.querySelector("#custom");
const tipAmountSpan = document.querySelector(".tip-amount");
const totalValueSpan = document.querySelector(".total-value");
const errorZero = document.querySelector(".error-zero");
const errorNegative = document.querySelector(".error-negative");
const resetBtn = document.querySelector(".reset-btn");
let percentageValue;
const handleResult = () => {
    const valuePerPerson = +moneyAmountInput.value;
    const peopleCount = +peopleCountInput.value;
    if (peopleCountInput.value !== "0"
        && peopleCountInput.value !== ""
        && +peopleCountInput.value > 0
        && moneyAmountInput.value !== ""
        && +moneyAmountInput.value > 0
        && +customTipInput.value !== 0
        && +percentageValue !== 0
        && percentageValue !== undefined) {
        const tipResult = +valuePerPerson * +percentageValue / +peopleCount;
        const roundedResult = Math.floor(+tipResult * 100) / 100;
        const totalResult = (+tipResult * +peopleCount + +valuePerPerson) / +peopleCount;
        totalValueSpan.innerText = `$${Number(totalResult.toFixed(2))}`;
        tipAmountSpan.innerText = `$${(roundedResult.toFixed(2))}`;
        resetBtn.removeAttribute("disabled");
        if (tipResult === Infinity) {
            tipAmountSpan.innerText, totalValueSpan.innerText = '$0.00';
        }
    }
};
const handleButtons = (e) => {
    e.preventDefault();
    const event = e.target;
    percentageValue = Number(event.dataset.value);
    tipPrecentButtons.forEach(button => button.classList.remove("selected"));
    event.classList.add("selected");
    customTipInput.type = "text";
    customTipInput.value = "Custom";
    handleResult();
};
const handlePeopleCountInput = (e) => {
    const event = e.target;
    if (+event.value === 0 || +event.value < 0) {
        tipAmountSpan.innerText = "$0.00";
        totalValueSpan.innerText = "$0.00";
        event.classList.add("error");
        Number(event.value) === 0 ? errorZero.style.display = "block" : errorNegative.style.display = "block";
        resetBtn.setAttribute("disabled", "");
    }
    else {
        event.classList.remove("error");
        errorZero.style.display = "none";
        errorNegative.style.display = "none";
    }
    if (event.value.length === 0) {
        event.classList.remove("error");
        errorZero.style.display = "none";
        errorNegative.style.display = "none";
    }
    handleResult();
};
const typeChangeToNumber = (e) => {
    const event = e.target;
    if (event.type === "text") {
        event.type = "number";
    }
    tipPrecentButtons.forEach(button => {
        if (button.classList.contains("selected")) {
            totalValueSpan.innerText = "$0.00";
            tipAmountSpan.innerText = "$0.00";
        }
    });
    tipPrecentButtons.forEach(button => button.classList.remove("selected"));
    percentageValue = 0;
};
const typeChangeToText = (e) => {
    const event = e.target;
    if (event.value === "") {
        event.type = "text";
        event.value = "Custom";
    }
};
const handleCustomTip = (e) => {
    const event = e.target;
    percentageValue = Number(event.value) * 0.01;
    handleResult();
    if (event.value === "" || +event.value === 0) {
        totalValueSpan.innerText = "$0.00";
        tipAmountSpan.innerText = "$0.00";
        resetBtn.setAttribute("disabled", "");
    }
};
const handleReset = (e) => {
    e.preventDefault();
    percentageValue = 0;
    peopleCountInput.value = "";
    moneyAmountInput.value = "";
    tipAmountSpan.innerText = '$0.00';
    totalValueSpan.innerText = '$0.00';
    tipPrecentButtons.forEach(button => button.classList.remove("selected"));
    resetBtn.setAttribute("disabled", "");
    customTipInput.type = "text";
    customTipInput.value = "Custom";
};
tipPrecentButtons.forEach(button => {
    button.addEventListener("click", handleButtons);
});
peopleCountInput.addEventListener("input", handlePeopleCountInput);
moneyAmountInput.addEventListener("input", handleResult);
resetBtn.addEventListener("click", handleReset);
customTipInput.addEventListener("click", typeChangeToNumber);
customTipInput.addEventListener("focusout", typeChangeToText);
customTipInput.addEventListener("input", handleCustomTip);
