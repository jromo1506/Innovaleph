var ScrollDown = function () {

	var $el = $('.js-scroll-down');

	if (!$el.length) {
		return;
	}

	$el.on('click', function (e) {

		e.preventDefault();

		$('html, body').animate({
			scrollTop: window.innerHeight
		}, 600, 'swing');

		if (window.SB !== undefined) {

			window.SB.scrollTo(0, window.innerHeight, 1200, {
				easing: function (pos) {
					if (pos === 0) return 0;
					if (pos === 1) return 1;
					if ((pos /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (pos - 1));
					return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
				}
			});
		}

	});

};
