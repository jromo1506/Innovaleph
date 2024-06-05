function setLines($target = window.$document, offset = '100%') {

	return new Promise(function (resolve, reject) {

		var
			tl = new TimelineMax(),
			$lines = $target.find('[data-split-text-set="lines"] .split-text__line');

		if (!$lines.length) {
			resolve(true);
			return;
		}

		tl
			.set($lines, {
				y: offset,
				autoAlpha: 0
			})
			.add(function () {
				resolve(true);
			});

	});

}
