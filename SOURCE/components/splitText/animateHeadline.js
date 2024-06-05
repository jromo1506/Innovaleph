function animateHeadline($target, duration = 1.2, ease = Power3.easeInOut, origin) {

	var
		tl = new TimelineMax();

	if (!$target.length) {
		return tl;
	}

	var textAlign = $target.css('text-align');

	if (!origin) {

		switch (textAlign) {
			case 'left':
				origin = 'left center';
				break;
			case 'center':
				origin = 'center center';
				break;
			case 'right':
				origin = 'right center';
				break;
		}

	}

	tl.to($target, duration, {
		scaleX: 1,
		scaleY: 1,
		transformOrigin: origin,
		ease: ease
	});

	return tl;

}
