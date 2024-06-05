function setSliderOverlapEffect(slider, overlapFactor) {

	var
		i,
		innerOffset,
		innerTranslate,
		background;

	initialSet();

	/**
	 * Resize handling (with debounce)
	 */
	$(window).on('resize', debounce(function () {
		slider.update();
		initialSet();
	}, 250));

	function initialSet() {

		innerOffset = slider.width * overlapFactor;
		innerTranslate = innerOffset * (-1);
		background = slider.slides[1].querySelector('.slider__bg');

		TweenMax.set(background, {
			clearProps: 'transform'
		});

		TweenMax.set(background, {
			y: slider.params.direction == 'vertical' ? innerTranslate + 'px' : '',
			x: slider.params.direction == 'horizontal' ? innerTranslate + 'px' : '',
			transition: slider.params.speed + 'ms',
			z: 0.01,
			force3D: true
		});

	}

	slider
		.on('progress', function () {

			for (i = 0; i < slider.slides.length; i++) {

				innerTranslate = slider.slides[i].progress * innerOffset;
				background = slider.slides[i].querySelector('.slider__bg');

				try {
					TweenMax.set(background, {
						y: slider.params.direction == 'vertical' ? innerTranslate + 'px' : '',
						x: slider.params.direction == 'horizontal' ? innerTranslate + 'px' : '',
						transition: slider.params.speed + 'ms',
						z: 0.01,
						force3D: true
					});
				} catch (error) {

				}

			}

		})
		.on('touchStart', function () {

			for (i = 0; i < slider.slides.length; i++) {

				background = slider.slides[i].querySelector('.slider__bg');

				try {
					TweenMax.set(background, {
						transition: '',
						z: 0.01,
						force3D: true
					});
				} catch (error) {

				}

			}

		});

}
