function lockScroll(lock) {

	var LOCK_CLASS = 'body_lock-scroll';

	if (lock === true) {

		if (!window.$body.hasClass(LOCK_CLASS)) {

			window.$body.addClass(LOCK_CLASS);

			if (window.SB !== undefined) {

				window.SB.updatePluginOptions('lockscroll', {
					lock: true
				});

			}

		}

	} else {

		window.$body.removeClass(LOCK_CLASS);

		if (window.SB !== undefined) {

			window.SB.updatePluginOptions('lockscroll', {
				lock: false
			});

		}

	}

}
