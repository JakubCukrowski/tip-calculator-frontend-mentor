const moneyAmountInput = document.querySelector("#bill-value");
const peopleCountInput = document.querySelector("#people-count");
const tipPrecentButtons = document.querySelectorAll(".tip-percentage-buttons button");
const tipAmountSpan = document.querySelector(".tip-amount");
const totalValueSpan = document.querySelector(".total-value");
const errorZero = document.querySelector(".error-zero");
const errorNegative = document.querySelector(".error-negative");
const resetBtn = document.querySelector(".reset-btn");
let percentageValue;
const handleResult = () => {
    if (peopleCountInput.value !== "0"
        && peopleCountInput.value !== ""
        && +peopleCountInput.value > 0
        && moneyAmountInput.value !== ""
        && +moneyAmountInput.value > 0
        && percentageValue !== undefined) {
        const result = Number(moneyAmountInput.value) * Number(percentageValue) / Number(peopleCountInput.value);
        const roundedResult = Math.floor(+result * 100) / 100;
        tipAmountSpan.innerText = `$${(roundedResult.toFixed(2))}`;
        resetBtn.removeAttribute("disabled");
        if (result === Infinity) {
            tipAmountSpan.innerText = '$0.00';
            resetBtn.setAttribute("disabled", "");
        }
    }
};
const handleButtons = (e) => {
    e.preventDefault();
    const event = e.target;
    percentageValue = Number(event.dataset.value);
    tipPrecentButtons.forEach(button => button.classList.remove("selected"));
    if (Number(percentageValue) === Number(event.dataset.value)) {
        event.classList.add("selected");
    }
    handleResult();
};
const handlePeopleCountInput = (e) => {
    const event = e.target;
    if (+event.value === 0 || +event.value < 0) {
        tipAmountSpan.innerText = "$0.00";
        event.classList.add("error");
        Number(event.value) === 0 ? errorZero.style.display = "block" : errorNegative.style.display = "block";
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
tipPrecentButtons.forEach(button => {
    button.addEventListener("click", handleButtons);
});
peopleCountInput.addEventListener("input", handlePeopleCountInput);
moneyAmountInput.addEventListener("input", handleResult);
