var SectionTestimonials = function ($scope) {

	var $target = $scope.find('.section-testimonials');

	if (!$target.length) {
		return;
	}

	$target.each(function () {

		var
			tl = new TimelineMax(),
			$current = $(this),
			$slider = $target;

		prepare().then(function () {
			animate();
		});


		function prepare() {

			return new Promise(function (resolve, reject) {

				var tl = new TimelineMax();

				tl
					.add(function () {
						new SliderTestimonials($slider);
					})
					.add(function () {
						resolve(true);
					});

			});

		}

		function animate() {

			var
				$activeSlide = $target.find('.swiper-slide-active'),
				$activeText = $activeSlide.find('.slider-testimonials__text'),
				$activeAuthor = $activeSlide.find('.slider-testimonials__author');


			tl
				.add(animateLines($activeText, 1.2, 0.1, Power3.easeOut))
				.add(animateChars($activeAuthor, 1.2, 0.3, Power3.easeOut), '-=0.6');

		}

	})

}
