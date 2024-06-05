function PJAXAnimateClonnedHeading(data, $customPositionElement) {

	return new Promise(function (resolve, reject) {

		var
			tl = new TimelineMax(),
			$nextContainer = $(data.next.container),
			$trigger = $(data.trigger),
			$nextContent = $nextContainer.find('.page-wrapper__content'),
			$clonnedHeading = $('.js-text-to-fly.clone'),
			$clonnedHeadingChars = $clonnedHeading.find('.split-text__char.clone'),
			$mastheadHeading = $nextContainer.find('.section-masthead .js-text-to-fly'),
			staggerAmount = 0.25,
			$mastheadHeadingChars,
			$mastheadHeadingWords,
			$mastheadHeadingLines,
			coordinates = [],
			setMastheadHeadingChars,
			CSSProperties,
			from;

		if (!$mastheadHeading.length) {

			tl.set($nextContent, {
					y: '10vh',
					force3D: true
				})
				.to($clonnedHeading, 0.6, {
					autoAlpha: 0,
					display: 'none',
					y: '-100%'
				})
				.to(window.$curtain, 1.2, {
					y: '-100%',
					ease: Expo.easeInOut
				}, '0.6')
				.to($nextContent, 2.4, {
					y: '0vh',
					force3D: true,
					ease: Expo.easeInOut,
				}, '0')
				.set(window.$curtain, {
					y: '100%',
					display: 'none'
				})
				.set($trigger, {
					autoAlpha: 1
				})
				.add(function () {
					$clonnedHeading.remove();
				})
				.add(function () {
					resolve(true);
				}, '0.8');

			return;

		}

		if (window.theme !== 'undefined') {
			staggerAmount = window.theme.animations.flyingHeadingsStagger || 0.25;
		}

		$mastheadHeadingChars = $mastheadHeading.find('.split-text__char');
		$mastheadHeadingWords = $mastheadHeading.find('.split-text__word');
		$mastheadHeadingLines = $mastheadHeading.find('.split-text__line');
		CSSProperties = $mastheadHeadingChars.css(['text-align', 'font-size', 'line-height', 'color', 'opacity']);
		from = PJAXGetFlyingDirection($clonnedHeading, $mastheadHeading);

		// clear any transforms for the correct
		// position calculation
		setMastheadHeadingChars = new Promise(function (resolve, reject) {

			TweenMax.set([$nextContent, $mastheadHeadingChars, $mastheadHeadingWords, $mastheadHeadingLines], {
				clearProps: 'transform',
				onComplete: function () {

					$mastheadHeadingChars.each(function (index) {

						var current = $(this).get(0).getBoundingClientRect();

						coordinates[index] = {
							top: current.top,
							left: current.left
						};

					});

					resolve(true);

				}
			});

		});


		setMastheadHeadingChars.then(function () {

			tl
				.set($nextContent, {
					y: '10vh',
					force3D: true
				})
				.staggerTo($clonnedHeadingChars, 1.2, {
					position: 'absolute',
					fontSize: CSSProperties['font-size'],
					lineHeight: CSSProperties['line-height'],
					transform: 'none',
					autoAlpha: 1,
					cycle: {
						left: function (index) {

							if (coordinates[index]) {
								return coordinates[index].left + 'px';
							} else {
								$clonnedHeadingChars[index].remove();
								return '0px';
							}

						},
						top: function (index) {

							if (coordinates[index]) {
								return coordinates[index].top + 'px';
							} else {
								$clonnedHeadingChars[index].remove();
								return '0px';
							}

						}
					},
					stagger: distributeByPosition({
						amount: staggerAmount,
						from: from
					}),
					ease: Power3.easeInOut,
					force3D: true
				})
				.set([$mastheadHeadingChars, $mastheadHeadingWords, $mastheadHeadingLines], {
					autoAlpha: 1,
					clearProps: 'transform'
				}, '+=0.6')
				.add(function () {
					$clonnedHeading.remove();
				})
				.add(function () {
					if ($mastheadHeading.hasClass('section-masthead__heading-big')) {
						tl.to($clonnedHeadingChars, 1.2, {
							opacity: .3
						}, '0.6');
					}
				}, '0.6')
				.to($clonnedHeadingChars, 1.2, {
					color: CSSProperties['color'],
				}, '0.6')
				.to(window.$curtain, 1.2, {
					y: '-100%',
					ease: Expo.easeInOut
				}, '0.6')
				.to($nextContent, 2.4, {
					y: '0vh',
					force3D: true,
					ease: Expo.easeInOut,
				}, '0')
				.set(window.$curtain, {
					y: '100%',
					display: 'none'
				})
				.set($trigger, {
					autoAlpha: 1
				})
				.add(function () {
					resolve(true);
				}, '0.9');

		});

	});

}
