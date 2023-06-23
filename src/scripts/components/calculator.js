import * as noUiSlider from 'nouislider'

const slider = document.getElementById('m-slider')

noUiSlider.create(slider, {
  start: 1000,
  connect: [true, false],
  step: 100,
  range: {
    'min': 100,
    'max': 100000
  }
})

const megahashesDiv = document.getElementById("megahashes")
const investPriceInput = document.getElementById("invest-price")

const coursesInputs = document.querySelectorAll('.calculator__currency input')

investPriceInput.addEventListener("input", e => {
  const val = +e.currentTarget.value
  slider.noUiSlider.set(val)
  update(val)
})

const asicCost = 7500 //$/asic
const asicHashes = 9000 //Mh/sec
const rublePrice = 1/84 //$/rub
const kwtPrice = 4.5 //rub/Kwt
const asicConsumption = 3.5 * 24 //Kwt/day
const asicDoges = 164.481 //doge/day per one asic
const dogePriceCurrent = 0.064 //$/doge
const asicLites = 0.09138 //LTC/day per one asic
const litePriceCurrent = 83.95 //$/LTC

const commission = 0.3 //30%

let dogePrice = dogePriceCurrent
let litePrice = litePriceCurrent
let contractLink = ''

function update(investAmount = +slider.noUiSlider.get()) {
  investPriceInput.value = investAmount

  const asicCount = investAmount / asicCost
  const megahashes = asicCount * asicHashes //Mhs/sec

  const electricityCost = asicConsumption * asicCount * kwtPrice // rub/day
  const electricityCostInUSDT = electricityCost * rublePrice * 30// $/month

  megahashesDiv.innerText = megahashes.toFixed(0)

  const dailyIncome = asicCount * (asicDoges * dogePrice + asicLites * litePrice) * (1 - commission) //$/day
  updateIncomes(investAmount, dailyIncome, electricityCostInUSDT)

  contractLink = `mailto:mail@example.com?body=Здравствуйте, я хочу заключить контракт на $${investAmount} (${megahashes} мегахешей)&subject=Контракт на облачный майнинг`
}

function updateIncomes(investAmount, dailyIncome, cost) {
  const onePercent = investAmount / 100

  const monthlyIncomeElement = document.querySelector(".calculator__report-item:nth-child(1) .calculator__report-price")
  const quarterlyIncomeElement = document.querySelector(".calculator__report-item:nth-child(2) .calculator__report-price")
  const yearlyIncomeElement = document.querySelector(".calculator__report-item:nth-child(3) .calculator__report-price")
  const monthlyIncome = dailyIncome * 30
  const quarterlyIncome = monthlyIncome * 3
  const yearlyIncome = monthlyIncome * 12
  monthlyIncomeElement.innerText = `$${monthlyIncome.toFixed(0)}`
  monthlyIncomeElement.nextElementSibling.innerText = `${(monthlyIncome / onePercent).toFixed(2)}%`
  quarterlyIncomeElement.innerText = `$${quarterlyIncome.toFixed(0)}`
  quarterlyIncomeElement.nextElementSibling.innerText = `${(quarterlyIncome / onePercent).toFixed(2)}%`
  yearlyIncomeElement.innerText = `$${yearlyIncome.toFixed(0)}`
  yearlyIncomeElement.nextElementSibling.innerText = `${(yearlyIncome / onePercent).toFixed(2)}%`

  const costElements = document.querySelectorAll('.calculator__price-sum-count')
  costElements[0].innerText = investAmount.toFixed(0)
  costElements[1].innerText = `$${cost.toFixed(0)}`
}

function sendMail() {
  window.open(contractLink, '_blank')
}

// document.querySelector('.calculator__price-btn').addEventListener('click', sendMail)

slider.noUiSlider.on('update', () => update(+slider.noUiSlider.get()))

const currentRate = document.querySelector('.calculator__current-rate')
const manualRate = document.querySelector('.calculator__second-rate')
let selected = currentRate

function addClass(event) {
  const {target} = event

  if (selected) {
    selected.classList.remove('active')
  }

  selected = target
  selected.classList.add('active')

  switchRates(selected)
}

function switchRates(selected) {
  if (selected === currentRate) {
    coursesInputs[0].value = dogePrice = dogePriceCurrent
    coursesInputs[1].value = litePrice = litePriceCurrent
    coursesInputs.forEach(i => i.disabled = true)
  } else {
    coursesInputs.forEach(i => i.disabled = false)
  }

  update()
}


coursesInputs[0].addEventListener("input",e => {
  dogePrice = +e.currentTarget.value
  update()
})
coursesInputs[1].addEventListener("input",e => {
  litePrice = +e.currentTarget.value
  update()
})

currentRate.addEventListener('click', addClass)
manualRate.addEventListener('click', addClass)

switchRates(currentRate)

slider.noUiSlider.set(1000)
update()
