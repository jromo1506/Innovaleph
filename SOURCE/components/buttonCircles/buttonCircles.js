var ButtonCircles = function ($target) {
	if (!$target.length) {
		return;
	}

	var
		$circles = $target.find('.circle'),
		tl = new TimelineMax();

	tl.set($circles, {
		drawSVG: '0% 0%',
	});

	$target
		.on('mouseenter touchstart', function () {

			tl
				.clear()
				.staggerTo($circles, 0.6, {
					drawSVG: '0% 100%',
					ease: Power4.easeOut,
				}, 0.05);

		})
		.on('mouseleave touchend', function () {

			tl
				.clear()
				.staggerTo($circles, 0.6, {
					drawSVG: '0% 0%',
					ease: Power4.easeOut
				}, 0.05);

		});
}
