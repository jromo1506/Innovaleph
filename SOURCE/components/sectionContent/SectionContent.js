var SectionContent = function ($scope) {

	var $target = $scope.find('.section-content[data-os-animation]');

	if (!$target.length) {
		return;
	}

	$target.each(function () {

		var
			tl = new TimelineMax(),
			$current = $(this),
			$header = $current.find('.section-content__header'),
			$wrapperButton = $current.find('.section-content__wrapper-button'),
			$headline = $current.find('.section__headline');

		prepare();
		animate();

		function prepare() {

			TweenMax.set($headline, {
				scaleX: 0,
				transformOrigin: 'left center'
			});

			TweenMax.set($wrapperButton, {
				autoAlpha: 0,
				y: '50%'
			});

		}

		function animate() {

			var $trigger = $current;

			if ($header.length) {
				$trigger = $header
			}

			tl
				.add(animateChars($current, 1.2, 0.3, Power3.easeOut), '0')
				.add(animateLines($current, 1.2, 0.05), '0')
				.add(animateHeadline($headline), '0')
				.to($wrapperButton, 1.2, {
					autoAlpha: 1,
					y: '0%'
				}, '-=0.9');

			createOSScene($current, tl, $trigger);

		}

	});

}
