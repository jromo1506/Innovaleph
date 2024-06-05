var FigurePortfolioAnimation = function ($target, animDelay = 0) {
	var
		$heading,
		$category,
		$letter,
		$imgWrapper,
		tl;

	$heading = $target.find('.figure-portfolio-big__heading');
	$category = $target.find('.figure-portfolio-big__category');
	$letter = $target.find('.figure-portfolio-big__wrapper-letter');
	$imgWrapper = $target.find('.figure-portfolio-big__wrapper-img');
	tl = new TimelineMax();

	prepare();
	animate();

	function prepare() {
		setChars($target, 0, -20);

		TweenMax.set($imgWrapper, {
			scaleY: 1.25,
			y: '25%',
			transformOrigin: 'top center',
			autoAlpha: 0
		});

		TweenMax.set($letter, {
			autoAlpha: 0,
			y: '200px'
		});

	}

	function animate() {
		tl
			.to($letter, 1.2, {
				y: 0,
				yPercent: 0,
				autoAlpha: 1,
				ease: Power3.easeOut,
				force3D: true
			})
			.to($imgWrapper, 1.2, {
				autoAlpha: 1,
				scaleY: 1,
				y: '0%',
				ease: Power3.easeOut,
				force3D: true,
				z: 0.01
			}, '-=0.8')
			.add(animateChars($heading, 1.2, 0.3, Power3.easeOut), '-=0.8')
			.add(animateChars($category, 1.2, 0.3, Power3.easeOut), '-=1.2');

		createOSScene($target, tl, null, false, animDelay);
	}
}
