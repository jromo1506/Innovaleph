var PJAXTransitionOverlayMenu = {
	name: 'overlayMenu',
	custom: ({
		current,
		next,
		trigger
	}) => {
		return $(trigger).data('pjax-link') == 'overlayMenu';
	},

	before: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXPrepareTransition(data).then(function () {
				resolve(true);
			});

		});

	},

	beforeLeave: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXCloneHeading(data).then(function () {
				resolve(true);
			});

		});

	},

	beforeEnter: (data) => {

		return new Promise(function (resolve, reject) {

			var
				$nextContainer = $(data.next.container),
				$mastheadHeading = $nextContainer.find('.section-masthead .js-text-to-fly');

			// don't trigger reveal animation on heading
			$mastheadHeading.addClass('js-split-text_cancel-animation');
			resolve(true);

		});
	},

	enter: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXInitNewPage(data).then(function () {
				resolve(true);
			});

		});
	},

	afterEnter: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXAnimateClonnedHeading(data).then(function () {
				resolve(true);
			});

		});

	},

	after: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXFinishLoading(data).then(function () {
				resolve(true);
			});

		});

	}

}
