function setSliderTextTransitions(slider, direction, offset = 40, $heading, $subheading, $description, $link) {

	var
		tl = new TimelineMax(),
		textAlign = $heading.css('text-align'),
		offsetXNextIn = 0,
		offsetXNextOut = 0,
		offsetYNextIn = 0,
		offsetYNextOut = 0,
		offsetXPrevIn = 0,
		offsetXPrevOut = 0,
		offsetYPrevIn = 0,
		offsetYPrevOut = 0,

		fromNextIn = 'start',
		fromNextOut = 'start',
		fromPrevIn = 'end',
		fromPrevOut = 'end';


	switch (textAlign) {
		case 'left':
			// text align left & slider horizontal
			if (direction == 'horizontal') {

				offsetXNextIn = offset;
				offsetXNextOut = offset * (-1);
				offsetXPrevIn = offset * (-1);
				offsetXPrevOut = offset;

				fromNextOut = 'start';
				fromNextIn = 'start';
				fromPrevOut = 'end';
				fromPrevIn = 'end';

			}
			// text align left & slider vertical
			if (direction == 'vertical') {

				offsetYNextIn = offset;
				offsetYNextOut = offset * (-1);
				offsetYPrevIn = offset * (-1);
				offsetYPrevOut = offset;

				fromNextOut = 'start';
				fromNextIn = 'end';
				fromPrevOut = 'end';
				fromPrevIn = 'start';
			}
			break;
		case 'center':
			// text align center & slider horizontal
			if (direction == 'horizontal') {

				offsetXNextIn = offset;
				offsetXNextOut = offset * (-1);
				offsetXPrevIn = offset * (-1);
				offsetXPrevOut = offset;

				fromNextOut = 'start';
				fromNextIn = 'start';
				fromPrevOut = 'end';
				fromPrevIn = 'end';

			}
			// text align left & slider vertical
			if (direction == 'vertical') {

				offsetYNextIn = offset / 2;
				offsetYNextOut = offset * (-1) / 2;
				offsetYPrevIn = offset * (-1) / 2;
				offsetYPrevOut = offset / 2;

				fromNextOut = 'center';
				fromNextIn = 'center';
				fromPrevOut = 'center';
				fromPrevIn = 'center';
			}
			break;
		case 'right':
			// text align right & slider horizontal
			if (direction == 'horizontal') {

				offsetXNextIn = offset * (-1);
				offsetXNextOut = offset;
				offsetXPrevIn = offset;
				offsetXPrevOut = offset * (-1);

				fromNextOut = 'end';
				fromNextIn = 'end';
				fromPrevOut = 'start';
				fromPrevIn = 'start';

			}
			// text align right & slider vertical
			if (direction == 'vertical') {

				offsetYNextIn = offset * (-1);
				offsetYNextOut = offset;
				offsetYPrevIn = offset;
				offsetYPrevOut = offset * (-1);

				fromNextOut = 'end';
				fromNextIn = 'start';
				fromPrevOut = 'start';
				fromPrevIn = 'end';
			}
			break;
	}

	slider
		.on('slideNextTransitionStart', function () {

			var
				$activeSlide = $(slider.slides[slider.activeIndex]),
				$activeHeading = $activeSlide.find($heading),
				$activeSubheading = $activeSlide.find($subheading),
				$activeDescription = $activeSlide.find($description),
				$activeLink = $activeSlide.find($link);

			tl.clear();

			$heading.each(function () {

				tl
					.add(hideChars($(this), 0.6, 0.3, Power3.easeInOut, offsetXNextOut, offsetYNextOut, fromNextOut), '0')
					.add(hideChars($subheading, 0.6, 0.3, Power3.easeInOut, offsetXNextOut, offsetYNextOut, fromNextOut), '0')
					.add(hideLines($description, 0.6, 0.05, offsetYNextOut, Power3.easeOut, true), '0')
					.add(hideButton(), '-=0.6')
					.add(hideChars($(this), 0, 0, Power3.easeInOut, offsetXNextIn, offsetYNextIn))
					.add(hideChars($subheading, 0, 0, Power3.easeInOut, offsetXNextIn, offsetYNextIn))
					.add(hideLines($activeDescription, 0, 0, offsetYNextIn))
					.add(setButton());

			});

			tl
				.add(animateChars($activeHeading, 1.2, 0.3, Power3.easeOut, fromNextIn))
				.add(animateLines($activeDescription, 1.2, 0.1, Power3.easeOut, fromNextIn), '-=1.2')
				.add(animateChars($activeSubheading, 1.2, 0.3, Power3.easeOut, fromNextIn), '-=1.2')
				.add(showButton($activeLink), '-=0.9');

		})
		.on('slidePrevTransitionStart', function () {

			var
				$activeSlide = $(slider.slides[slider.activeIndex]),
				$activeHeading = $activeSlide.find($heading),
				$activeSubheading = $activeSlide.find($subheading),
				$activeDescription = $activeSlide.find($description),
				$activeLink = $activeSlide.find($link);

			tl.clear();

			$heading.each(function () {

				tl
					.add(hideChars($(this), 0.6, 0.3, Power3.easeInOut, offsetXPrevOut, offsetYPrevOut, fromPrevOut), '0')
					.add(hideChars($subheading, 0.6, 0.3, Power3.easeInOut, offsetXPrevOut, offsetYPrevOut, fromPrevOut), '0')
					.add(hideLines($description, 0.6, 0.05, offsetYPrevOut, Power3.easeOut), '0')
					.add(hideButton(), '-=0.6')
					.add(hideChars($(this), 0, 0, Power3.easeInOut, offsetXPrevIn, offsetYPrevIn))
					.add(hideChars($subheading, 0, 0, Power3.easeInOut, offsetXPrevIn, offsetYPrevIn))
					.add(hideLines($activeDescription, 0, 0, offsetYPrevIn))
					.add(setButton($link));

			});

			tl
				.add(animateChars($activeHeading, 1.2, 0.3, Power3.easeOut, fromPrevIn))
				.add(animateLines($activeDescription, 1.2, 0.1, Power3.easeOut, fromNextIn), '-=1.2')
				.add(animateChars($activeSubheading, 1.2, 0.3, Power3.easeOut, fromPrevIn), '-=1.2')
				.add(showButton($activeLink), '-=0.9');

		});

	function hideButton() {

		var tl = new TimelineMax();

		if (typeof $link != 'undefined' && $link.length) {
			tl.to($link, 0.6, {
				y: (offsetYNextOut || offsetXNextOut) * (-1) / 2 + 'px',
				autoAlpha: 0,
				// ease: Power3.easeOut
			});
		}

		return tl;

	}

	function showButton($activeLink) {

		var tl = new TimelineMax();

		if (typeof $activeLink != 'undefined' && $activeLink.length) {
			tl.to($activeLink, 0.6, {
				y: '0px',
				autoAlpha: 1,
				// ease: Power3.easeOut
			});
		}

		return tl;

	}

	function setButton() {

		var tl = new TimelineMax();

		if (typeof $link != 'undefined' && $link.length) {
			tl.set($link, {
				y: (offsetYNextIn || offsetXNextIn) / 2 + 'px',
				autoAlpha: 0
			});
		}

		return tl;

	}

}
