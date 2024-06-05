function renderSliderCounter(sliderMain, sliderCounter, slideClass, elTotal, sliderSecondary) {

	if ($(sliderMain).length && $(sliderSecondary).length && !$(sliderCounter)) {
		sliderSecondary.controller.control = sliderMain;
		sliderMain.controller.control = sliderSecondary;
	}

	if (!$(sliderMain).length || !$(sliderCounter).length || !$(elTotal).length) {
		return;
	}

	var
		numOfSlides = sliderMain.slides.length,
		startSlides = parseInt(sliderMain.params.slidesPerView, 10),
		prefixCurrent = '00',
		prefixTotal = numOfSlides >= 10 ? '0' : '00';

	var counter = new Swiper(sliderCounter, {
		direction: 'vertical',
		simulateTouch: false,
		allowTouchMove: false
	});

	counter.removeAllSlides();

	for (var index = startSlides; index <= numOfSlides; index++) {

		if (index >= 10) {

			prefixCurrent = '0';

		}

		counter.appendSlide('<div class="swiper-slide"><div class="' + slideClass + '">' + prefixCurrent + index + '</div></div>');

	}


	$(elTotal).html(prefixTotal + numOfSlides);

	sliderMain.controller.control = counter;
	counter.controller.control = sliderMain;

	if ($(sliderSecondary).length) {
		sliderSecondary.controller.control = counter;
		counter.controller.control = sliderSecondary;
	}

}
