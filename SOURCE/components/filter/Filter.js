var Filter = function ($scope, $filter) {
	if (!$filter.length) {
		return;
	}

	var
		self = this,
		itemClass = '.js-filter__item',
		$items = $scope.find(itemClass),
		activeItemClass = 'filter__item_active';

	this.$filter = $scope.find($filter);
	this.$items = $scope.find($items);

	bindEvents();
	updateLinePosition();

	function bindEvents() {

		$($scope)
			.on('mouseenter', itemClass, function () {

				updateLinePosition($(this));

			})
			.on('mouseleave', itemClass, function () {

				updateLinePosition($items.filter('.' + activeItemClass));

			})
			.on('click', itemClass, function () {

				var $el = $(this);

				$items.removeClass(activeItemClass);
				$el.addClass(activeItemClass);
				updateLinePosition($el);

			});

	}

	function updateLinePosition($target) {

		var
			$line = self.$filter.find('.js-filter__underline');

		if (!$line.length) {
			return;
		}

		if (!$target || !$target.length) {

			TweenMax.to($line, 0.6, {
				width: 0,
				ease: Expo.easeOut,
			});

		} else {

			var
				$heading = $target.find('div'),
				headingWidth = $heading.innerWidth(),
				headingPos = $heading.position(),
				colPos = $target.position();

			TweenMax.to($line, 0.6, {
				ease: Expo.easeInOut,
				width: headingWidth,
				x: headingPos.left + colPos.left,
			});

		}

	}

	function setActiveItem(index) {

		var $target = $items.eq(index);
		if (!$target) {
			return;
		}

		$items.removeClass(activeItemClass);
		$target.addClass(activeItemClass);
		updateLinePosition($target, self.$filter);

	}

	this.setActiveItem = function (index) {
		setActiveItem(index);
	}
}
