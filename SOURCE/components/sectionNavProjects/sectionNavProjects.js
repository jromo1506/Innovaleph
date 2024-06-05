var SectionNavProjects = function ($scope) {

	var $target = $scope.find('.section-nav-projects');

	if (!$target.length) {
		return;
	}

	var
		$allButton = $target.find('.section-nav-projects__inner_all'),
		$prevHeading = $target.find('.section-nav-projects__heading_prev'),
		$nextHeading = $target.find('.section-nav-projects__heading_next'),
		$prevArrow = $target.find('.section-nav-projects__arrow_prev'),
		$nextArrow = $target.find('.section-nav-projects__arrow_next'),
		$prevButton = $target.find('.section-nav-projects__inner_prev'),
		$nextButton = $target.find('.section-nav-projects__inner_next'),
		tl = new TimelineMax(),
		duration = 0.6,
		offset = 75,
		stagger = 0.2;

	new ButtonCircles($allButton);

	setChars($prevButton, offset);
	setChars($nextButton, offset);


	if (Modernizr.mq('(min-width: 767px)')) {

		window.$document
			.on('mouseenter touchstart', '.section-nav-projects__inner_prev', function () {
				tl
					.clear()
					.to($prevArrow, duration / 2, {
						autoAlpha: 0,
						x: (-1) * offset / 2 + 'px'
					}, '0')
					.add(animateChars($prevHeading, duration, stagger, Power4.easeOut), '0.2')
					.add(hideChars($nextHeading, duration, stagger, Power4.easeOut, (-1) * offset, 0, 'start'), '0.2');
			})
			.on('mouseleave touchend', '.section-nav-projects__inner_prev', function () {
				tl
					.clear()
					.to($prevArrow, duration / 2, {
						autoAlpha: 1,
						x: '0px'
					}, '0.2')
					.add(hideChars($prevHeading, duration, stagger, Power4.easeOut, offset, 0, 'end'), '0')
					.add(hideChars($nextHeading, duration, stagger, Power4.easeOut, (-1) * offset, 0, 'start'), '0');
			})
			.on('mouseenter touchstart', '.section-nav-projects__inner_next', function () {
				tl
					.clear()
					.to($nextArrow, duration / 2, {
						autoAlpha: 0,
						x: offset / 2 + 'px'
					}, '0')
					.add(animateChars($nextHeading, duration, stagger, Power4.easeOut), '0.2')
					.add(hideChars($prevHeading, duration, stagger, Power4.easeOut, offset, 0, 'end'), '0.2');
			})
			.on('mouseleave touchend', '.section-nav-projects__inner_next', function () {
				tl
					.clear()
					.to($nextArrow, duration / 2, {
						autoAlpha: 1,
						x: '0px'
					}, '0.2')
					.add(hideChars($nextHeading, duration, stagger, Power4.easeOut, (-1) * offset, 0, 'start'), '0')
					.add(hideChars($prevHeading, duration, stagger, Power4.easeOut, offset, 0, 'end'), '0');
			})
			.on('click', '.section-nav-projects__inner_prev', function () {
				tl
					.clear()
					.stop();

			})
			.on('click', '.section-nav-projects__inner_next', function () {
				tl
					.clear()
					.stop();

			});

	} else {

		animateChars($prevHeading, 0, 0, Power4.easeOut);
		animateChars($nextHeading, 0, 0, Power4.easeOut);

	}

}
