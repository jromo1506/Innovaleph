function animateChars($target, duration = 1.2, stagger = 0.3, ease = Power3.easeInOut, from) {

	var
		$chars = $target.find('.split-text__char'),
		tl = new TimelineMax();

	if (!$chars.length || $target.hasClass('js-split-text_cancel-animation')) {
		return tl;
	}

	var textAlign = $target.css('text-align');

	if (!from) {

		switch (textAlign) {
			case 'left':
				from = 'start';
				break;
			case 'center':
				from = 'center';
				break;
			case 'right':
				from = 'end';
				break;
		}

	}

	tl.staggerTo($chars, duration, {
		x: '0px',
		y: '0px',
		xPercent: 0,
		yPercent: 0,
		autoAlpha: 1,
		ease: ease,
		stagger: distributeByPosition({
			amount: stagger,
			from: from
		})
	});

	return tl;

}
