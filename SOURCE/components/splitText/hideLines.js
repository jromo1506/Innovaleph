function hideLines($target, duration = 0.6, stagger = 0.02, offset = '-100%', ease = Power3.easeInOut, reverse) {

	var
		tl = new TimelineMax(),
		$lines = $target.find('.split-text__line');

	if (reverse) {
		$lines = $lines.get().reverse();
	}

	if ($lines.length) {

		tl.staggerTo($lines, duration, {
			y: offset,
			autoAlpha: 0,
			ease: ease
		}, stagger);

	};

	return tl;

}
