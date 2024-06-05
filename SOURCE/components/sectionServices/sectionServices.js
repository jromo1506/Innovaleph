var SectionServices = function ($scope) {

	var $target = $scope.find('.section-services[data-os-animation]');

	if (!$target.length) {
		return;
	}

	$target.each(function () {

		var
			$current = $(this),
			$serviceItem = $current.find('.section-services__wrapper-item'),
			$lines = $current.find('.section-services__border-line'),
			$bg = $current.find('.section-services__bg'),
			tl = new TimelineMax(),
			tlChild = new TimelineMax();

		prepare();
		animate();

		function prepare() {

			TweenMax.set($bg, {
				x: '-100%',
			});

			TweenMax.set($lines, {
				x: '-200%',
			})

		}

		function animate() {

			tl
				.to([$bg, $lines], 1.2, {
					x: '0%',
					ease: Expo.easeInOut
				});

			$serviceItem.each(function () {

				var
					$currentServiceItem = $(this),
					$counter = $currentServiceItem.find('.section-services__counter'),
					$heading = $currentServiceItem.find('.section-services__heading'),
					$link = $currentServiceItem.find('.section-services__wrapper-button');


				tlChild
					.add([
						animateChars($heading, 1.2, 0.4, Power3.easeOut),
						animateChars($counter, 1.2, 0.1, Power3.easeOut)
					], 'start')
					.fromTo($link, 0.6, {
						y: '100%',
						autoAlpha: 0
					}, {
						y: '0%',
						autoAlpha: 1
					}, 'start')

			});

			tl.add(tlChild, '-=0.2');

			createOSScene($target, tl);

		}

	});

}
