function lazyLoad($scope = $window.document) {
	var
		$elements = $scope.find('.lazy'),
		$images = $elements.find('img[data-src]'),
		$backgrounds = $scope.find('.lazy-bg[data-src]');

	prepareLazyImages($images, $backgrounds);
	loadLazyImages($images, $backgrounds);
}

function prepareLazyImages($images, $backgrounds) {
	$images.each(function () {

		var
			$el = $(this),
			$elParent = $el.parent(),
			elPB,
			elWidth = $el.attr('width') || false,
			elHeight = $el.attr('height') || false;

		// we need both width and height of element
		// to calculate proper value for "padding-bottom" hack
		if (!elWidth || !elHeight) {
			return;
		}

		elPB = (elHeight / elWidth) * 100 + '%';

		TweenMax.set($el, {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%'
		});

		TweenMax.set($elParent, {
			width: '100%',
			position: 'relative',
			overflow: 'hidden',
			paddingBottom: elPB
		});

	});
};

function loadLazyImages($images, $backgrounds, lazyCallback) {
	var
		lazyInstance,
		lazyInstanceBackgrounds;

	if ($images.length) {
		lazyInstance = $images.Lazy({
			threshold: 1000,
			chainable: false,
			afterLoad: function (el) {

				var
					$el = $(el),
					$elParent = $el.parent();

				$el.imagesLoaded({
					background: true
				}).always(function () {

					TweenMax.set($elParent, {
						className: '+=lazy_loaded'
					});

				});

				// update scrollbar geometry
				if (window.SB !== undefined) {
					window.SB.update();
				}

				if (lazyCallback !== undefined) {
					lazyCallback();
				}

			}

		});

	}

	if ($backgrounds.length) {
		lazyInstanceBackgrounds = $backgrounds.Lazy({
			threshold: 1000,
			chainable: false,
			afterLoad: function (el) {
				$(el).addClass('lazy-bg_loaded');
			}
		});
	}

	// update lazy load instance when smooth scroll is enabled
	if (window.SB !== undefined && lazyInstance && lazyInstance.config('delay') !== 0) {
		window.SB.addListener(function () {
			lazyInstance.update(true);
		});
	}

	// update lazy load instance when smooth scroll is enabled
	if (window.SB !== undefined && lazyInstanceBackgrounds && lazyInstanceBackgrounds.config('delay') !== 0) {
		window.SB.addListener(function () {
			lazyInstanceBackgrounds.update(true);
		});
	}
};
