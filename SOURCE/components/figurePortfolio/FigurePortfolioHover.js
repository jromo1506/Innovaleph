var FigurePortfolioHover = function ($target) {
	var
		tl,
		$curtain,
		$category,
		$heading,
		$icon,
		$img;

	if (!$target.length) {
		return;
	}

	tl = new TimelineMax();
	$curtain = $target.find('.figure-portfolio__curtain');
	$category = $target.find('.figure-portfolio__category');
	$heading = $target.find('.figure-portfolio__heading');
	$img = $target.find('img');
	$icon = $target.find('.figure-portfolio__icon');

	setChars($target, 50);

	TweenMax.set($category, {
		autoAlpha: 0,
		y: '-40px'
	});

	TweenMax.set($icon, {
		autoAlpha: 0,
		x: '40px'
	});

	$target
		.on('mouseenter touchstart', function () {
			tl
				.clear()
				.to($curtain, 0.6, {
					y: '0%',
					skewY: '-5deg',
					ease: Power3.easeInOut
				})
				.to($img, 0.6, {
					y: '-40px',
					ease: Power3.easeInOut
				}, '0')
				.add(animateChars($heading, 0.6, 0.2, Power3.easeOut), '0.2')
				.to($category, 0.6, {
					autoAlpha: 1,
					y: '0px',
					ease: Power3.easeOut
				}, '0.2')
				.to($icon, 0.6, {
					autoAlpha: 1,
					x: '0px',
					ease: Power3.easeOut
				}, '0.4');

		})
		.on('mouseleave touchend', function () {
			tl
				.clear()
				.add(hideChars($heading, 0.6, 0.2, Power3.easeOut, 50, 0, 'end'), '0')
				.to($category, 0.6, {
					autoAlpha: 0,
					y: '-40px',
					ease: Power3.easeOut
				}, '0')
				.to($icon, 0.6, {
					autoAlpha: 0,
					x: '40px',
					ease: Power3.easeOut
				}, '0.2')
				.to($curtain, 0.6, {
					y: '100%',
					skewY: '0deg',
					ease: Power3.easeOut,
				}, '0.3')
				.to($img, 0.6, {
					y: '0px',
					ease: Power3.easeOut
				}, '0.3');
		});
}
