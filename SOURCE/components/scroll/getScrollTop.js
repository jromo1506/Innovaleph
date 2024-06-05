function getScrollTop() {

	if (window.SB !== undefined) {
		window.lastTop = window.SB.scrollTop;
	} else {
		window.lastTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	}

	return window.lastTop;
}
