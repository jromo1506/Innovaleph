function animateLines($target, duration = 1.2, stagger = 0.02, ease = Power3.easeOut) {

	var
		tl = new TimelineMax(),
		$lines = $target.find('.split-text__line');

	if (!$lines.length || $target.hasClass('js-split-text_cancel-animation')) {
		return tl;
	}

	tl
		.staggerTo($lines, duration, {
			y: '0px',
			yPercent: 0,
			ease: ease,
			autoAlpha: 1,
		}, stagger);

	return tl;

}
