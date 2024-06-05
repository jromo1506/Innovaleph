function setSliderTestimonialsTransitions(slider, direction, offset = 40, $text, $author, $line) {

	var
		tl = new TimelineMax(),
		textAlign = $text.css('text-align'),
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
				$activeText = $activeSlide.find($text),
				$activeAuthor = $activeSlide.find($author),
				$activeLine = $activeSlide.find($line);

			tl.clear();

			$text.each(function () {

				tl
					.to($line, 0.6, {
						ease: Power3.easeInOut,
						scaleX: 0,
						transformOrigin: 'right center'
					}, '0')
					.add(hideLines($(this), 0.6, 0.05, offsetYNextOut, Power3.easeOut), '0')
					.add(hideChars($author, 0.6, 0.3, Power3.easeInOut, offsetYNextIn, 0, fromNextIn), '0')
					.add(hideLines($(this), 0, 0, offsetYNextIn, Power3.easeInOut))
					.add(hideChars($author, 0, 0, Power3.easeInOut, offsetYNextOut, 0));

			});

			tl
				.add(animateLines($activeText, 1.2, 0.1, Power3.easeOut, fromNextIn))
				.add(animateChars($activeAuthor, 1.2, 0.3, Power3.easeOut, fromNextIn), '-=1.2')
				.add(animateHeadline($activeLine, 0.6, Power3.easeInOut, 'left center'), '-=1.2');

		})
		.on('slidePrevTransitionStart', function () {

			var
				$activeSlide = $(slider.slides[slider.activeIndex]),
				$activeText = $activeSlide.find($text),
				$activeAuthor = $activeSlide.find($author),
				$activeLine = $activeSlide.find($line);

			tl.clear();

			$text.each(function () {

				tl
					.to($line, 0.6, {
						ease: Power3.easeInOut,
						scaleX: 0,
						transformOrigin: 'left center'
					}, '0')
					.add(hideLines($(this), 0.6, 0.05, offsetYPrevOut, Power3.easeOut, true), '0')
					.add(hideChars($author, 0.6, 0.3, Power3.easeInOut, offsetYNextOut, 0, fromPrevIn), '0')
					.add(hideLines($(this), 0, 0, offsetYPrevIn, Power3.easeInOut))
					.add(hideChars($author, 0, 0, Power3.easeInOut, offsetYPrevOut, 0));

			});

			tl
				.add(animateLines($activeText, 1.2, 0.1, Power3.easeOut, fromPrevIn))
				.add(animateChars($activeAuthor, 1.2, 0.3, Power3.easeOut, fromPrevIn), '-=1.2')
				.add(animateHeadline($activeLine, 0.6, Power3.easeInOut, 'right center'), '-=1.2');

		});


}
