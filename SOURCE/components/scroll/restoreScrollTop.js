function restoreScrollTop() {

	if (window.SB !== undefined) {

		setTimeout(function () {
			window.SB.scrollTop = window.lastTop;
		}, 100);

	} else {

		$('html, body').animate({
			scrollTop: window.lastTop
		}, 100);

	}

}
