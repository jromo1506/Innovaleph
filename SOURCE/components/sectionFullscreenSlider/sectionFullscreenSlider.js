var SectionFullscreenSlider = function ($scope) {

	var $target = $scope.find('.section-fullscreen-slider[data-os-animation]');

	if (!$target.length) {

		return;

	}

	$target.each(function () {

		var
			tl = new TimelineMax(),
			$current = $(this),
			$slider = $current.find('.js-slider-fullscreen'),
			$buttonWrapper = $slider.find('.slider__wrapper-button');

		prepare().then(function () {
			animate();
		});


		function prepare() {

			return new Promise(function (resolve, reject) {

				var tl = new TimelineMax();

				tl
					.set($buttonWrapper, {
						autoAlpha: 0,
						y: '20px'
					})
					.add(function () {
						new SliderFullScreen($slider);
					})
					.add(function () {
						resolve(true);
					});

			});

		}

		function animate() {

			var
				$activeSlide = $target.find('.swiper-slide-active'),
				$activeHeading = $activeSlide.find('.slider__heading'),
				$activeSubheading = $activeSlide.find('.slider__subheading'),
				$activeButton = $activeSlide.find('.slider__wrapper-button');

			$activeSlide.imagesLoaded({
				background: true,
			}, function () {

				tl
					.delay(0.6)
					.add(animateChars($activeHeading, 1.2, 0.3, Power3.easeOut), '0')
					.add(animateChars($activeSubheading, 1.2, 0.3, Power3.easeOut), '0')
					.to($activeButton, 1.2, {
						y: '0px',
						autoAlpha: 1,
						ease: Power3.easeOut
					}, '-=1.2');

				createOSScene($current, tl);

			});

		}

	})

}
