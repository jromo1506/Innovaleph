function scrollToVeryTop() {

	window.scrollTo(0, 0);

	// safari fix
	try {
		window.top.scrollTo(0, 0);
	} catch (error) {

	}

	if (window.SB !== undefined) {
		window.SB.scrollTop = 0;
	}

}
