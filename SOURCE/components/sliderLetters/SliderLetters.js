var SliderLetters = function ($scope) {

	var
		$SVGLetters = $('.vector-letters'),
		$letters = $SVGLetters.find('.vector-letter'),
		$menuItems = $scope.find('.menu-overlay a'),
		tl = new TimelineMax();

	if (!$SVGLetters.length || !$letters.length) {
		return;
	}

	hoverMenuitems();

	function hoverMenuitems() {

		$menuItems.each(function () {

			var
				$current = $(this),
				currentLetter = $current.data('letter'),
				targetLetter = $letters.filter('#vector-' + currentLetter);

			$current
				.on('mouseenter touchstart', function () {
					tl
						.clear()
						.to($letters[0], 0.6, {
							morphSVG: targetLetter,
							ease: Expo.easeInOut
						});
				});

		});

	}

}
