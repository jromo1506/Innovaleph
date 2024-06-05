function PJAXInitNewPage(data) {

	return new Promise(function (resolve, reject) {

		var $nextContainer = $(data.next.container);

		Promise.all([
				// PJAXUpdateBody(data),
				PJAXUpdateNodes(data),
				PJAXUpdateHead(data),
			])
			.then(function () {
				return doSplitText();
			})
			.then(function () {
				return setLines($nextContainer);
			})
			.then(function () {
				return setChars($nextContainer);
			})
			.then(function () {

				return new Promise(function (resolve, reject) {

					// clear & re-init ScrollMagic
					window.SMController.destroy(true);
					window.SMController = new ScrollMagic.Controller();

					// re-init components
					initComponents($nextContainer);

					// don't start animations immediately
					window.SMController.enabled(false);

					// ensure that scroll is still locked
					lockScroll(true);

					// update ad trackers
					PJAXUpdateTrackers();

					setTimeout(function () {
						resolve(true);
					}, 100);

				});

			}).then(function () {

				// scroll at the page beginning
				scrollToVeryTop();

				setTimeout(function () {
					resolve(true);
				}, 100);

			});

	});

}
