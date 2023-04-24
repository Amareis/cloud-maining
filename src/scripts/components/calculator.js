import * as noUiSlider from 'nouislider';

const calculator = document.getElementById('m-slider');
const currentRate = document.querySelector('.calculator__current-rate');
const secondRate = document.querySelector('.calculator__second-rate');
let selected = currentRate;

function addClass(event) {
        const {target} = event;

        if (selected) {
            selected.classList.remove('active');
        }

        selected = target;
        selected.classList.add('active');
}

currentRate.addEventListener('click', addClass)
secondRate.addEventListener('click', addClass)







noUiSlider.create(calculator, {
    start: 30,
    connect: [true, false],
    range: {
        'min': 0,
        'max': 100
    }
});