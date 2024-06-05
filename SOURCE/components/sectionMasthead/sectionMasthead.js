var SectionMasthead = function ($scope) {

	var $target = $scope.find('.section-masthead[data-os-animation]');

	if (!$target.length) {
		return;
	}

	$target.each(function () {

		var
			$current = $(this),
			$currentBig = $current.filter('.section-masthead_big-heading'),
			tl = new TimelineMax(),
			$background = $current.find('.section-masthead__background'),
			$curtain = $current.find('.section-masthead__curtain'),
			$heading = $current.find('.section-masthead__heading'),
			$headingBig = $current.find('.section-masthead__heading-big'),
			$text = $current.find('.section-masthead__text'),
			$subheading = $current.find('.section-masthead__subheading'),
			$button = $current.find('.section-masthead__wrapper-button'),
			$headline = $current.find('.section__headline');

		prepare();
		animate();

		function prepare() {

			TweenMax.set($headline, {
				scaleX: 0,
				transformOrigin: 'left center'
			});

			TweenMax.set($curtain, {
				scaleY: 0,
				transformOrigin: 'bottom center'
			});

			TweenMax.set($background, {
				scale: 1.1,
			});

			TweenMax.set($button, {
				y: '100%',
				autoAlpha: 0
			});

		}

		function animate() {

			tl
				.set($current, {
					autoAlpha: 1
				}, '0')
				.add(animateChars($subheading, 1.2, 0.4, Power3.easeInOut))
				.add(animateLines($text, 1.2, 0.08, Power3.easeOut), '0.9')
				.add(animateHeadline($headline), '-=1.2')
				.add(hideChars($headingBig, 0.6, 0.1, Power3.easeInOut, 0, '-200%'), '+=0.1')
				.to($currentBig, 0.3, {
					display: 'none',
					onComplete: function () {
						new Grid();
					}
				}, '-=0.6');

			if (!$heading.hasClass('js-split-text_cancel-animation')) {
				tl.add(animateChars($heading, 1.2, 0.4, Power3.easeInOut), '0');
			}

			if ($curtain.length) {
				tl.to($curtain, 1.2, {
					scaleY: 1,
					ease: Expo.easeInOut
				}, '0');
			}

			if ($background.length) {
				tl.to($background, 2.4, {
					scale: 1
				}, '0');
			}

			if ($button.length) {
				tl.to($button, 1.2, {
					y: '0%',
					autoAlpha: 1,
					ease: Power3.easeOut
				}, '0.9');
			}

			createOSScene($current, tl);

		}

	});

}
