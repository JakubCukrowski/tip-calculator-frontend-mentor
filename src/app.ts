const moneyAmountInput: HTMLInputElement = document.querySelector("#bill-value")
const peopleCountInput: HTMLInputElement = document.querySelector("#people-count")
const tipPrecentButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".tip-percentage-buttons button")
const tipAmountSpan: HTMLSpanElement = document.querySelector(".tip-amount")
const totalValueSpan: HTMLSpanElement = document.querySelector(".total-value")
const errorZero: HTMLSpanElement = document.querySelector(".error-zero")
const errorNegative: HTMLSpanElement = document.querySelector(".error-negative")
const resetBtn: HTMLButtonElement = document.querySelector(".reset-btn")

let percentageValue: Number

const handleResult = () => {
    if (peopleCountInput.value !== "0" 
        && peopleCountInput.value !== ""
        && +peopleCountInput.value > 0 
        && moneyAmountInput.value !== ""
        && +moneyAmountInput.value > 0 
        && percentageValue !== undefined) {
        const result: Number = Number(moneyAmountInput.value) * Number(percentageValue) / Number(peopleCountInput.value)
        const roundedResult: Number = Math.floor(+result * 100) / 100
        tipAmountSpan.innerText = `$${(roundedResult.toFixed(2))}`
        resetBtn.removeAttribute("disabled") 
        
        if (result === Infinity) {
            tipAmountSpan.innerText = '$0.00'
            resetBtn.setAttribute("disabled", "")
        }
        
    } 
}

const handleButtons = (e: Event) => {
    e.preventDefault()
    const event = e.target as HTMLButtonElement
    percentageValue = Number(event.dataset.value)  
    tipPrecentButtons.forEach(button => button.classList.remove("selected"))
    if (Number(percentageValue) === Number(event.dataset.value)) {
        event.classList.add("selected")
    } 
    handleResult()
}

const handlePeopleCountInput = (e: Event) => {
    const event = e.target as HTMLInputElement
    if (+event.value === 0 || +event.value < 0) {
        tipAmountSpan.innerText = "$0.00"
        event.classList.add("error")
        Number(event.value) === 0 ? errorZero.style.display = "block" : errorNegative.style.display = "block"
    } else {
        event.classList.remove("error")
        errorZero.style.display = "none"
        errorNegative.style.display = "none"
    }

    if (event.value.length === 0) {
        event.classList.remove("error")
        errorZero.style.display = "none"
        errorNegative.style.display = "none"
    }

    handleResult()
}

tipPrecentButtons.forEach(button => {
    button.addEventListener("click", handleButtons)
})

peopleCountInput.addEventListener("input", handlePeopleCountInput)
moneyAmountInput.addEventListener("input", handleResult)