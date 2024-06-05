function PJAXFinishLoading(data) {

	return new Promise(function (resolve, reject) {

		var
			tl = new TimelineMax();

		tl
			.add(function () {
				window.SMController.enabled(true);
				window.SMController.update(true);
				window.$pageHeader.removeClass('header_lock-submenus lockhover');
				window.$pageHeader.attr('data-header-animation', '');
			})
			.add(function () {
				lockScroll(false);
			}, '1.2')
			.add(function () {
				resolve(true);
			});

	});

}
