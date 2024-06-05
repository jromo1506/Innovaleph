function PJAXAnimateCurtain(direction = 'in') {

	return new Promise(function (resolve, reject) {

		var
			tl = new TimelineMax(),
			$pageContent = $('.page-wrapper__content');

		if (!window.$curtain.length) {
			resolve(true);
			return;
		}

		tl.timeScale(1.5);

		if (direction == 'in') {

			tl
				.to(window.$curtain, 1.2, {
					y: '0%',
					ease: Expo.easeInOut
				}, '0')
				.to($pageContent, 1.2, {
					y: '-5vh',
					force3D: true,
					ease: Expo.easeInOut,
				}, '-=1.0')
				.add(function () {
					resolve(true);
				});

		} else if (direction == 'out') {

			tl
				.set($pageContent, {
					y: '10vh',
					force3D: true
				}, '0')
				.to($pageContent, 2.4, {
					y: '0vh',
					force3D: true,
					ease: Expo.easeInOut,
				}, '0')
				.to(window.$curtain, 1.2, {
					y: '-100%',
					ease: Expo.easeInOut
				}, '0.6')
				.add(function () {
					resolve(true);
				}, '-=1.0');

		}

	});

}
