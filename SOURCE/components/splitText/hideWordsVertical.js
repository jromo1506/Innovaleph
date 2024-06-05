function hideWordsVertical($target, duration = 0.6, stagger = 0.02, offset = -30, reverse, masterStagger) {

	var masterTL = new TimelineMax();

	if ($target.length) {

		$target.each(function () {

			var
				tl = new TimelineMax(),
				$chars = $(this).find('.split-chars__char');

			if (reverse) {
				$chars = $chars.get().reverse();
			}

			if (!masterStagger) {
				masterStagger = '-=' + duration;
			}

			tl.staggerTo($chars, duration, {
				y: offset,
				autoAlpha: 0
			}, stagger);

			masterTL.add(tl, masterStagger);
		});

	};

	return masterTL;

}
