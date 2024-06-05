var MenuOverlay = function () {
	var $menu = $('.js-menu-overlay');

	if (!$menu.length) {
		return;
	}

	var
		$overlay = $('.header__wrapper-overlay-menu'),
		$overlayWidgets = $overlay.find('.header__wrapper-overlay-widgets'),
		$social = $overlayWidgets.find('.social'),
		$links = $menu.find('.menu-item-has-children > a'),
		$allLinks = $menu.find('a'),
		$submenus = $menu.find('.sub-menu'),
		$submenuButton = $('#js-submenu-back'),
		OPEN_CLASS = 'opened',
		SELECTED_CLASS = 'selected',
		tl = new TimelineMax();

	function openSubmenu($submenu, $currentMenu) {
		var
			$currentLinks = $currentMenu.find('> li > a .menu-overlay__item-wrapper'),
			$submenuLinks = $submenu.find('> li > a .menu-overlay__item-wrapper');

		tl
			.clear()
			.add(function () {

				window.$pageHeader.attr('data-header-animation', 'intransition');

				$submenus.removeClass(OPEN_CLASS);
				$submenu.not($menu).addClass(OPEN_CLASS);

				if ($submenus.hasClass(OPEN_CLASS)) {

					tl
						.to($submenuButton, 0.3, {
							autoAlpha: 1,
							x: '0px'
						}, '-=1.2');

					if (isMediumScreen()) {
						tl
							.to($social, 0.6, {
								autoAlpha: 0,
								y: '100%'
							}, '0.2')
							.add(hideLines($overlayWidgets, 0.6, 0.07, '100%', Power3.easeOut, true), '0');
					}

				} else {

					tl
						.to($submenuButton, 0.3, {
							autoAlpha: 0,
							x: '-10px'
						}, '-=1.2');

					tl
						.to($social, 0.6, {
							autoAlpha: 1,
							y: '0%'
						}, '0.2')
						.add(animateLines($overlayWidgets, 0.6, 0.07), '-=1.2');

				}

			})
			.set($submenu, {
				autoAlpha: 1,
				zIndex: 100,
			}, '0')
			.add(hideChars($currentLinks, 0.6, 0.4, Power3.easeOut, -50, 0, 'start'))
			.add(animateChars($submenuLinks, 0.6, 0.4, Power3.easeOut, 'start'), '-=0.6')
			.add(function () {
				$allLinks.removeClass(SELECTED_CLASS);
				window.$pageHeader.attr('data-header-animation', '');
			});

	}

	function closeSubmenu($submenu, $currentMenu) {
		var
			$currentLinks = $currentMenu.find('> li > a .menu-overlay__item-wrapper'),
			$submenuLinks = $submenu.find('> li > a .menu-overlay__item-wrapper');

		tl
			.clear()
			.add(function () {

				window.$pageHeader.attr('data-header-animation', 'intransition');

				$submenus.removeClass(OPEN_CLASS);
				$currentMenu.not($menu).addClass(OPEN_CLASS);

				if ($submenus.hasClass(OPEN_CLASS)) {

					TweenMax.to($submenuButton, 0.3, {
						autoAlpha: 1,
						x: '0px'
					});

					if (isMediumScreen()) {
						tl
							.to($social, 0.6, {
								autoAlpha: 0,
								y: '-100%'
							}, '0.2')
							.add(hideLines($overlayWidgets, 0.6, 0.07, '100%', Power3.easeOut, true), '0');
					}

				} else {

					TweenMax.to($submenuButton, 0.3, {
						autoAlpha: 0,
						x: '-10px'
					});

					tl.to($social, 0.6, {
							autoAlpha: 1,
							y: '0%'
						}, '0.2')
						.add(animateLines($overlayWidgets, 0.6, 0.07), '0');

				}

			})
			.add(hideChars($submenuLinks, 0.6, 0.4, Power3.easeOut, 50, 0, 'end'))
			.add(animateChars($currentLinks, 0.6, 0.4, Power3.easeOut, 'end'), '-=0.6')
			.set($submenu, {
				autoAlpha: 0,
				zIndex: -1,
			})
			.add(function () {
				window.$pageHeader.attr('data-header-animation', '');
			});

	}

	$links.on('click', function (e) {

		e.preventDefault();

		if (window.$pageHeader.attr('data-header-animation') !== 'intransition') {
			var
				$el = $(this),
				$currentMenu = $el.parents('ul'),
				$submenu = $el.next('.sub-menu');

			$el.addClass(SELECTED_CLASS);

			openSubmenu($submenu, $currentMenu);
		}

	});

	$submenuButton.on('click', function (e) {

		e.preventDefault();

		if (window.$pageHeader.attr('data-header-animation') !== 'intransition') {
			var
				$openedMenu = $submenus.filter('.' + OPEN_CLASS),
				$prevMenu = $openedMenu.parent('li').parent('ul');

			closeSubmenu($openedMenu, $prevMenu);
		}

	});

	function isMediumScreen() {
		return Modernizr.mq('(max-width: 991px)');
	}
}
