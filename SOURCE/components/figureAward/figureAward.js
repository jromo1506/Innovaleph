var FigureAward = function ($target) {
	if (!$target.length) {
		return;
	}

	var
		tl = new TimelineMax();

	tl
		.add(animateLines($target, 1.2, 0.1), '0')
		.add(animateChars($target, 1.2, 0.3, Power3.easeOut), '0');

	createOSScene($target, tl);
}
