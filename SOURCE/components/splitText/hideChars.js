function hideChars($target, duration = 1.2, stagger = 0.3, ease = Power3.easeInOut, x = 0, y = 100, from) {

	var tl = new TimelineMax();

	if (typeof $target == 'undefined' || !$target.length) {
		return tl;
	}

	var
		$chars = $target.find('.split-text__char'),
		textAlign = $target.css('text-align');

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
		x: x,
		y: y,
		autoAlpha: 0,
		ease: ease,
		stagger: distributeByPosition({
			amount: stagger,
			from: from
		})
	});

	return tl;

}
