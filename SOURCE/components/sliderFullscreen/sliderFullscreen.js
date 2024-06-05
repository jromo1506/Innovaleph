var SliderFullScreen = function ($slider) {

	if (!$slider.length) {
		return;
	}

	var
		$heading = $slider.find('.slider__heading'),
		$subheading = $slider.find('.slider__subheading'),
		$description = $slider.find('p'),
		$link = $slider.find('.slider-fullscreen__wrapper-button'),
		$sliderImg = $slider.find('.js-slider-fullscreen__images'),
		$sliderContent = $slider.find('.js-slider-fullscreen__content'),
		$inner = $slider.find('.slider__images-slide-inner'),
		sliderSpeed = $sliderImg.data('speed') || 1200,
		overlapFactor = $sliderImg.data('overlap-factor') || 0;

	createSliders();

	function createSliders() {

		var sliderImg = new Swiper($sliderImg, {
			direction: $sliderImg.data('direction') || 'vertical',
			preloadImages: true,
			updateOnImagesReady: true,
			keyboardControl: true,
			lazy: {
				loadPrevNextAmount: 6,
				loadPrevNext: true,
				loadOnTransitionStart: true
			},
			speed: sliderSpeed,
			allowTouchMove: false,
			watchSlidesProgress: true
		});

		var sliderContent = new Swiper($sliderContent, {
			autoHeight: true,
			effect: 'fade',
			fadeEffect: {
				crossFade: false
			},
			autoplay: {
				disableOnInteraction: false,
				enabled: $sliderImg.data('autoplay-enabled') || true,
				delay: $sliderImg.data('autoplay-delay') || 6000,
			},
			mousewheel: {
				eventsTarged: '.page-wrapper__content',
				releaseOnEdges: true,
			},
			navigation: {
				nextEl: '.js-slider-fullscreen__next',
				prevEl: '.js-slider-fullscreen__prev',
			},
			speed: $sliderImg.data('speed') || 1200,
			allowTouchMove: false,
			pagination: {
				el: '.js-slider-dots',
				type: 'bullets',
				bulletElement: 'div',
				clickable: true,
				bulletClass: 'slider__dot',
				bulletActiveClass: 'slider__dot_active'
			},
		});

		TweenMax.set($inner, {
			transitionDelay: sliderSpeed + 'ms' || '1200ms'
		});

		renderSliderDots(sliderContent, $slider.find('.js-slider-dots'));
		renderSliderCounter(
			sliderContent,
			$slider.find('.js-slider-fullscreen__counter-current'),
			'',
			$slider.find('.js-slider-fullscreen__counter-total'),
			sliderImg
		);

		setSliderTextTransitions(sliderContent, sliderImg.params.direction, 25, $heading, $subheading, $description, $link);
		setSliderOverlapEffect(sliderImg, overlapFactor);

	}

}
