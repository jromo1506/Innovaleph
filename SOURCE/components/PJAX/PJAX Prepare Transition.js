function PJAXPrepareTransition(data) {

	return new Promise(function (resolve, reject) {

		var
			tl = new TimelineMax(),
			$trigger = $(data.trigger);

		tl
			.set(window.$curtain, {
				display: 'block',
				y: '100%',
				zIndex: 550
			})
			.add(function () {
				window.triggerTextAlign = $trigger.css('text-align');
			})
			.set($trigger, {
				className: '+=selected'
			})
			.add(function () {
				lockScroll(true);
			})
			.add(function () {
				resolve(true);
			})

	});

}
