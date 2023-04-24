const range = document.querySelectorAll('.range');



function customsSlider() {

	for (let i = 0; i < range.length; i++) {
		const slider = range[i].querySelector('.range__slider');
		const thumb = range[i].querySelector('.range__thumb');
		const progress = range[i].querySelector('.range__progress');

	}

	const maxVal = slider.getAttribute('max');
	const val = (slider.value / maxVal) * 100 + '%';

	progress.style.width = val;
	thumb.style.left = val;
}

customsSlider()


