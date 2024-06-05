function PJAXCloneHeading(data, $customPositionElement) {

	return new Promise(function (resolve, reject) {
		var
			tl = new TimelineMax(),
			$trigger = $(data.trigger),
			$pageContent = $('.page-wrapper__content'),
			$heading = $trigger.find('.js-text-to-fly'),
			$headingChars,
			CSSProperties = [],
			coordinates,
			$clone;

		window.cloneCoordinates = [];

		if (!$heading.length) {
			$heading = $trigger.parent().parent().find('.js-text-to-fly');
		}

		if (!$heading.length) {
			resolve(true);
		}

		CSSProperties = $heading.css([
			'font-size',
			'font-style',
			'font-weight',
			'line-height',
			'letter-spacing',
			'color',
			'text-align'
		]);

		$headingChars = $heading.find('.split-text__char');
		$clone = $heading.clone();
		$clone.css(CSSProperties);
		coordinates = $heading.get(0).getBoundingClientRect();

		if ($trigger.find('img').length) {

			tl.set($heading, {
				autoAlpha: 0
			});

		} else {

			tl.set($trigger, {
				autoAlpha: 0
			});

		}

		tl
			.add(function () {

				return new Promise(function (resolve, reject) {

					$clone.attr({
						'data-origin-top': coordinates['top'],
						'data-origin-left': coordinates['left'],
						'data-origin-right': coordinates['right'],
						'data-origin-bottom': coordinates['bottom'],
					});

					$headingChars.each(function (index) {

						var
							$current = $(this),
							current = $current.get(0).getBoundingClientRect(),
							$cloneChar = $clone.find('.split-text__char')[index];

						window.cloneCoordinates[index] = {
							top: current.top,
							left: current.left
						};

						TweenMax.set($cloneChar, {
							position: 'fixed',
							top: window.cloneCoordinates[index].top,
							left: window.cloneCoordinates[index].left,
							className: '+=clone',
							clearProps: 'transform',
							zIndex: 600
						});

					});

					resolve(true);

				});

			})
			.set($clone, {
				className: '+=clone',
				position: 'fixed',
				top: 0,
				left: 0,
				width: 0,
				height: 0,
				margin: 0,
				padding: 0,
				zIndex: 600
			})
			.add(function () {
				$clone.appendTo(window.$barbaWrapper);
			})
			.add([
				window.PageHeader.hideOverlayMenu(1.5, false),
				TweenMax.to(window.$curtain, 1.2, {
					y: '0%',
					ease: Expo.easeInOut
				}),
				TweenMax.to($pageContent, 2.4, {
					y: '-5vh',
					force3D: true,
					ease: Expo.easeInOut,
				})
			])
			.add(function () {
				resolve(true);
			}, '-=1.2');

	});

}
