var SectionPortfolio = function ($scope) {

	var
		$target = $scope.find('.section-portfolio'),
		$filter,
		$grid,
		$figurePortfolioHover,
		$figurePortfolio,
		animDelay,
		$animTarget,
		colsDesktop,
		colsTablet,
		colsMobile,
		lg,
		md,
		cols,
		FilterPortfolio,
		GridPortfolio;

	if (!$target.length) {
		return;
	}

	$animTarget = $scope.find('.section-portfolio[data-os-animation]');
	$figurePortfolioHover = $target.find('.figure-portfolio-item_hover');
	$figurePortfolio = $animTarget.find('.figure-portfolio[data-os-animation]');
	animDelay = $animTarget.data('os-animation-delay');
	$filter = $target.find('.js-filter');
	$grid = $target.find('.js-grid');
	colsDesktop = parseInt($grid.data('grid-columns'), 10) || -1;
	colsTablet = parseInt($grid.data('grid-columns-tablet'), 10) || -1;
	colsMobile = parseInt($grid.data('grid-columns-mobile'), 10) || -1;
	lg = window.elementorFrontend ? window.elementorFrontend.config.breakpoints.lg - 1 : 1024;
	md = window.elementorFrontend ? window.elementorFrontend.config.breakpoints.md - 1 : 767;
	cols = colsDesktop;

	if (Modernizr.mq('(max-width: ' + lg + 'px)')) {
		cols = colsTablet;
	}

	if (Modernizr.mq('(max-width: ' + md + 'px)')) {
		cols = colsMobile;
	}

	bindGridFilter();
	animateHover();
	animate();

	function bindGridFilter() {

		if (!$filter.length || !$grid.length) {
			return;
		}

		FilterPortfolio = new Filter($scope, $filter);
		GridPortfolio = new Grid($grid);

		if ($filter.length) {

			FilterPortfolio.setActiveItem(0);

			FilterPortfolio.$items.on('click', function (e) {

				e.preventDefault();

				var filterBy = $(this).data('filter');

				GridPortfolio.isotope({
					filter: filterBy
				});

			});

		}

		GridPortfolio.isotope({
			filter: '*'
		});

	}

	function animateHover() {

		$figurePortfolioHover.each(function () {

			var $current = $(this);

			new FigurePortfolioHover($current);

		});

	}

	function animate() {

		var
			tl = new TimelineMax();

		$figurePortfolio.each(function (index) {

			var
				$current = $(this),
				currentDelay = 0;

			if (index < cols) {
				currentDelay = animDelay;
			}

			new FigurePortfolioAnimation($current, currentDelay)

		});

		createOSScene($animTarget, tl);

	}

}
