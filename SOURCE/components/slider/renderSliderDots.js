function renderSliderDots(slider, $dotsContainer) {

	var
		$dots = $dotsContainer.find('.slider__dot'),
		$circles;

	if (!$dots.length) {
		return false;
	} else {

		// append SVG circle
		$dots.append('<svg viewBox="0 0 152 152" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="none" fill-rule="evenodd"><g transform="translate(-134.000000, -98.000000)"><path class="circle" d="M135,174a75,75 0 1,0 150,0a75,75 0 1,0 -150,0"></path></g></g></svg>');
		$circles = $dots.find('.circle');

	}

	TweenMax.set($circles, {
		drawSVG: false,
	});

	slider
		.on('transitionStart', function () {
			unsetDots();
		})
		.on('transitionEnd', function () {
			setCurrentDot();
		});

	// on init
	setCurrentDot();

	function setCurrentDot() {

		var
			$currentDot = $dots.eq(slider.realIndex),
			$currentCircle = $currentDot.find('.circle'),
			autoPlaydelay = parseFloat(slider.params.speed / 1000) / 2;

		if (slider.params.autoplay.enabled) {
			autoPlaydelay = parseFloat(slider.params.autoplay.delay / 1000);
		}

		TweenMax.fromTo($currentCircle, autoPlaydelay, {
			drawSVG: '100% 100%',
			ease: Power4.easeInOut
		}, {
			drawSVG: '0% 100%'
		});

	}

	function unsetDots() {

		var
			transitionSpeed = parseFloat(slider.params.speed / 1000) / 2;

		if (slider.params.autoplay.enabled) {
			transitionSpeed = parseFloat(slider.params.speed / 1000);
		}

		TweenMax.to($circles, transitionSpeed, {
			drawSVG: '0% 0%',
			ease: Power4.easeInOut
		});

	}

}
