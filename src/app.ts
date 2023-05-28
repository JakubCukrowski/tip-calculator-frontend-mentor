const moneyAmountInput: HTMLInputElement = document.querySelector("#bill-value")
const peopleCountInput: HTMLInputElement = document.querySelector("#people-count")
const tipPrecentButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".tip-percentage-buttons button")
const customTipInput: HTMLInputElement = document.querySelector("#custom")
const tipAmountSpan: HTMLSpanElement = document.querySelector(".tip-amount")
const totalValueSpan: HTMLSpanElement = document.querySelector(".total-value")
const errorZero: HTMLSpanElement = document.querySelector(".error-zero")
const errorNegative: HTMLSpanElement = document.querySelector(".error-negative")
const resetBtn: HTMLButtonElement = document.querySelector(".reset-btn")

let percentageValue: Number

const handleResult = () => {
    const valuePerPerson: Number = +moneyAmountInput.value
    const peopleCount: Number = +peopleCountInput.value

    if (peopleCountInput.value !== "0" 
        && peopleCountInput.value !== ""
        && +peopleCountInput.value > 0 
        && moneyAmountInput.value !== ""
        && +moneyAmountInput.value > 0 
        && +customTipInput.value !== 0
        && +percentageValue !== 0
        && percentageValue !== undefined) {
        const tipResult: Number = +valuePerPerson * +percentageValue / +peopleCount
        const roundedResult: Number = Math.floor(+tipResult * 100) / 100
        const totalResult: Number = (+tipResult * +peopleCount + +valuePerPerson) / +peopleCount
        totalValueSpan.innerText = `$${Number(totalResult.toFixed(2))}`
        tipAmountSpan.innerText = `$${(roundedResult.toFixed(2))}`
        resetBtn.removeAttribute("disabled") 
        
        if (tipResult === Infinity) {
            tipAmountSpan.innerText, totalValueSpan.innerText = '$0.00'
        }
        
    } 
}

const handleButtons = (e: Event) => {
    e.preventDefault()
    const event = e.target as HTMLButtonElement
    percentageValue = Number(event.dataset.value)  
    tipPrecentButtons.forEach(button => button.classList.remove("selected"))
    event.classList.add("selected")
    customTipInput.type = "text"
    customTipInput.value = "Custom"
    handleResult()
}

const handlePeopleCountInput = (e: Event) => {
    const event = e.target as HTMLInputElement
    if (+event.value === 0 || +event.value < 0) {
        tipAmountSpan.innerText = "$0.00"
        totalValueSpan.innerText = "$0.00"
        event.classList.add("error")
        Number(event.value) === 0 ? errorZero.style.display = "block" : errorNegative.style.display = "block"
        resetBtn.setAttribute("disabled", "")
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

const typeChangeToNumber = (e: Event) => {
    const event = e.target as HTMLInputElement
    if (event.type === "text") {
        event.type = "number"
    }
    tipPrecentButtons.forEach(button => {
        if (button.classList.contains("selected")) {
            totalValueSpan.innerText = "$0.00"
            tipAmountSpan.innerText = "$0.00"
        }
    })
    tipPrecentButtons.forEach(button => button.classList.remove("selected"))
    percentageValue = 0
}

const typeChangeToText = (e: Event) => {
    const event = e.target as HTMLInputElement
    if (event.value === "") {
        event.type = "text"
        event.value = "Custom"
    }
}

const handleCustomTip = (e: Event) => {
    const event = e.target as HTMLInputElement
    percentageValue = Number(event.value) * 0.01
    handleResult()

    if (event.value === "" || +event.value === 0) {
        totalValueSpan.innerText = "$0.00"
        tipAmountSpan.innerText = "$0.00"
        resetBtn.setAttribute("disabled", "")
    }
}

const handleReset = (e: Event) => {
    e.preventDefault()
    percentageValue = 0
    peopleCountInput.value = ""
    moneyAmountInput.value = ""
    tipAmountSpan.innerText = '$0.00'
    totalValueSpan.innerText = '$0.00'
    tipPrecentButtons.forEach(button => button.classList.remove("selected"))
    resetBtn.setAttribute("disabled", "")
    customTipInput.type = "text"
    customTipInput.value = "Custom"
}

tipPrecentButtons.forEach(button => {
    button.addEventListener("click", handleButtons)
})

peopleCountInput.addEventListener("input", handlePeopleCountInput)
moneyAmountInput.addEventListener("input", handleResult)
resetBtn.addEventListener("click", handleReset)
customTipInput.addEventListener("click", typeChangeToNumber)
customTipInput.addEventListener("focusout", typeChangeToText)
customTipInput.addEventListener("input", handleCustomTip)
