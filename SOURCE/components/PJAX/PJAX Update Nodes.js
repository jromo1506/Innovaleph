function PJAXUpdateNodes(data) {

	return new Promise(function (resolve, reject) {

		var
			$nextContainer = $($.parseHTML(data.next.html)),
			nodesToUpdate = [
				'.header',
				'.header__wrapper-overlay-menu',
				'.header .menu li',
				'.header .menu-overlay li',
				'.transition-curtain'
			]; // selectors of elements that needed to update

		$.each(nodesToUpdate, function () {

			var
				$item = $(this),
				$nextItem = $nextContainer.find(this);

			// different type of menu (overlay) found on the next page
			if (this === '.header .menu li' && !$nextItem.length) {
				$nextItem = $nextContainer.find('.header .menu-overlay li');
			}

			// different type of menu (classic) found on the next page
			if (this === '.header .menu-overlay li' && !$nextItem.length) {
				$nextItem = $nextContainer.find('.header .menu li');
			}

			// sync attributes if element exist in the new container
			if ($nextItem.length) {
				syncAttributes($nextItem, $item);
			}

		});

		resolve(true);
		f
	});

}
