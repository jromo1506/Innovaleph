function Preloader() {
	var
		tl = new TimelineMax(),
		$preloader = $('.js-preloader'),
		$curtainInner = $preloader.find('.preloader__curtain_inner'),
		$curtainOuter = $preloader.find('.preloader__curtain_outer'),
		$logo = $preloader.find('.preloader__wrapper-logo'),
		$pageContent = $('.page-wrapper__content');

	tl.timeScale(2);

	this.start = function () {

		if (!$preloader.length) {
			return;
		}

		TweenMax.set($pageContent, {
			y: '10vh',
			force3D: true
		});

	}

	this.finish = function () {
		return new Promise(function (resolve, reject) {

			if (!$preloader.length) {
				resolve(true);
				return;
			}

			tl
				.set($curtainInner, {
					animationPlayState: 'paused',
				})
				.to($curtainInner, 1.2, {
					animation: 'none',
					scaleX: 1,
					transformOrigin: 'left center',
					ease: Expo.easeInOut
				})
				.to($curtainInner, 1.2, {
					top: '0px',
					y: '0%',
					ease: Expo.easeInOut,
				})
				.to($logo, 1.2, {
					y: '-50px',
					ease: Expo.easeInOut,
				}, '-=1.1')
				.set($logo, {
					autoAlpha: 0
				})
				.to($curtainInner, 1.2, {
					y: '-102%',
					ease: Expo.easeInOut,
				})
				.to($curtainOuter, 1.2, {
					y: '-100%',
					ease: Expo.easeInOut,
				}, '-=0.9')
				.to($pageContent, 2.4, {
					y: '0vh',
					force3D: true,
					ease: Expo.easeInOut,
				}, '-=1.9')
				.add(function () {
					resolve(true);
				}, '-=1.5')
				.set($preloader, {
					display: 'none'
				});

		});
	}
}
