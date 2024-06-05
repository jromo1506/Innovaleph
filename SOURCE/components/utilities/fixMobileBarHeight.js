function fixMobileBarHeight() {

	var vh;

	/**
	 * Initial set
	 */
	createStyleElement();
	setVh();

	/**
	 * Resize handling (with debounce)
	 */
	$(window).on('resize', debounce(function () {
		setVh();
	}, 250));

	/**
	 * 100vh elements height correction
	 */
	function setVh() {

		vh = window.innerHeight * 0.01;

		$('#Innovaleph-fix-bar').html(':root { --fix-bar-vh: ' + vh + 'px; }');

	}

	function createStyleElement() {

		if (!$('#Innovaleph-fix-bar').length) {
			$('head').append('<style id=\"Innovaleph-fix-bar\"></style>');
		}

	}

}
