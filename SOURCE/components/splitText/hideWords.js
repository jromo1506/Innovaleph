function hideWords($target, duration = 0.6, stagger = 0.02, offset = -30, reverse, masterStagger, direction = 'x') {

	var masterTL = new TimelineMax();

	if ($target.length) {

		$target.each(function () {

			var
				tl = new TimelineMax(),
				$chars = $(this).find('.split-chars__char'),
				options = {};

			if (reverse) {
				$chars = $chars.get().reverse();
			}

			if (!masterStagger) {
				masterStagger = '-=' + duration;
			}

			if (direction == 'x') {
				options = {
					x: offset,
					autoAlpha: 0
				};
			} else {
				options = {
					y: offset,
					autoAlpha: 0
				}
			}

			tl.staggerTo($chars, duration, options, stagger);

			masterTL.add(tl, masterStagger);
		});

	};

	return masterTL;

}
