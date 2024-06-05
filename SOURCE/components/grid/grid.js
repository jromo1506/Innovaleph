var Grid = function ($target = $('.js-grid')) {
	if (!$target.length) {
		return;
	}

	$target.each(function () {

		var
			$current = $(this),
			$currentLazyImages = $current.find('img[data-src]'),
			currentInstance;

		currentInstance = $current.isotope({
			itemSelector: '.js-grid__item',
			columnWidth: '.js-grid__sizer',
			percentPosition: true
		});

		loadLazyImages($currentLazyImages, false, function () {
			$current.imagesLoaded().always(function () {
				currentInstance.isotope('layout');
			});
		});

		// update non-lazy images
		$current.imagesLoaded().always(function () {
			currentInstance.isotope('layout');
		});

		currentInstance.on('arrangeComplete', function () {
			loadLazyImages($currentLazyImages, false);
		});
	});

	return $target;
}
