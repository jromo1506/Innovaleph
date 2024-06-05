var SliderProjects = function ($scope) {

	var $slider = $scope.find('.js-slider-projects');

	if (!$slider.length) {
		return;
	}

	$slider.each(function () {

		var
			$current = $(this),
			breakpoints = {},
			lg = window.elementorFrontend ? window.elementorFrontend.config.breakpoints.lg - 1 : 1024,
			md = window.elementorFrontend ? window.elementorFrontend.config.breakpoints.md - 1 : 767;

		breakpoints[lg] = {
			slidesPerView: $current.data('slides-per-view-tablet') || 1.33,
			spaceBetween: $current.data('space-between-tablet') || 20,
			centeredSlides: $current.data('centered-slides-tablet') || true,
		};
		breakpoints[md] = {
			slidesPerView: $current.data('slides-per-view-mobile') || 1.33,
			spaceBetween: $current.data('space-between-mobile') || 20,
			centeredSlides: $current.data('centered-slides-mobile') || true,
		};

		var slider = new Swiper($current, {
			autoHeight: $current.data('auto-height') || false,
			speed: $current.data('speed') || 1200,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadOnTransitionStart: true
			},
			observer: true,
			watchSlidesProgress: true,
			watchSlidesVisibility: true,
			centeredSlides: $current.data('centered-slides') || false,
			slidesPerView: $current.data('slides-per-view') || 4,
			autoplay: {
				disableOnInteraction: false,
				enabled: $current.data('autoplay-enabled') || false,
				delay: $current.data('autoplay-delay') || 6000,
			},
			spaceBetween: $current.data('space-between') || 0,
			pagination: {
				el: '.js-slider-projects__dots',
				type: 'bullets',
				bulletElement: 'div',
				clickable: true,
				bulletClass: 'slider__dot',
				bulletActiveClass: 'slider__dot_active'
			},
			navigation: {
				nextEl: '.js-slider-projects__next',
				prevEl: '.js-slider-projects__prev',
			},
			breakpoints: breakpoints
		});

		// update height after images are loaded
		slider.on('lazyImageReady', function () {

			setTimeout(function () {
				slider.update();
			}, 300);

		});

		renderSliderDots(slider, $current.find('.js-slider-projects__dots'));
		renderSliderCounter(
			slider,
			$current.find('.js-slider-projects__counter-current'),
			'',
			$current.find('.js-slider-projects__counter-total')
		);

	});

}
