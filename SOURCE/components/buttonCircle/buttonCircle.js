var ButtonCircle = function ($scope) {
	var $target = $scope.find('.js-button-circle');

	if (!$target.length) {
		return;
	}

	$target.each(function () {

		var
			$current = $(this),
			$currentCircle = $current.find('.circle'),
			tl = new TimelineMax();

		tl.set($currentCircle, {
			drawSVG: '100% 100%'
		});

		$current.on('mouseenter touchstart', function () {

			tl
				.clear()
				.fromTo($currentCircle, 0.6, {
					drawSVG: '100% 100%'
				}, {
					drawSVG: '0% 100%',
					ease: Power3.easeInOut,
				});

		}).on('mouseleave touchend', function () {

			tl
				.clear()
				.to($currentCircle, 0.6, {
					drawSVG: '0% 0%',
					ease: Power3.easeInOut
				});

		});

	});
}
