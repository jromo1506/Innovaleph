var SliderTestimonials = function ($target) {

	if (!$target.length) {
		return;
	}

	var
		$footer = $target.parent().find('.js-slider-testimonials__footer'),
		$text = $target.find('.slider-testimonials__text'),
		$author = $target.find('.slider-testimonials__author'),
		$line = $target.find('.slider-testimonials__author-line');

	var slider = new Swiper($target, {
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		allowTouchMove: false,
		direction: 'horizontal',
		autoHeight: true,
		speed: $target.data('speed') || 1200,
		autoplay: {
			disableOnInteraction: false,
			enabled: $target.data('autoplay-enabled') || false,
			delay: $target.data('autoplay-delay') || 6000,
		},
		pagination: {
			el: '.js-slider-testimonials__dots',
			type: 'bullets',
			bulletElement: 'div',
			clickable: true,
			bulletClass: 'slider__dot',
			bulletActiveClass: 'slider__dot_active'
		},
		navigation: {
			nextEl: '.js-slider-testimonials__next',
			prevEl: '.js-slider-testimonials__prev',
		},
	});

	renderSliderDots(slider, $footer.find('.js-slider-testimonials__dots'));
	renderSliderCounter(
		slider,
		$footer.find('.js-slider-testimonials__counter-current'),
		'',
		$footer.find('.js-slider-testimonials__counter-total')
	);
	setSliderTestimonialsTransitions(slider, 'vertical', 20, $text, $author, $line);

}
