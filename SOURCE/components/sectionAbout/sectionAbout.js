var SectionAbout = function ($scope) {

	var
		$target = $scope.find('.section-about'),
		$counters,
		$animTarget;

	if (!$target.length) {
		return;
	}

	$animTarget = $scope.find('.section-about[data-os-animation]');
	$counters = $target.find('.js-counter');

	$counters.each(function () {

		new Counter($(this));

	});

	$animTarget.each(function () {

		var
			$current = $(this),
			// $heading = $current.find('.section-about__heading'),
			$header = $current.find('.section-about__header'),
			$headline = $current.find('.section__headline'),
			tl = new TimelineMax();

		prepare();
		animate();

		function prepare() {

			TweenMax.set($headline, {
				scaleX: 0
			});

		}

		function animate() {

			tl
				.add(animateHeadline($headline), '0')
				.add(animateChars($current, 1.2, 0.6, Power3.easeOut), '-=1.2')
				.add(animateLines($current, 1.2, 0.07, Power3.easeOut), '-=1.2')

			createOSScene($current, tl, $header);

		}

	});

}
