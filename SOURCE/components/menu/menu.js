/* ======================================================================== */
/* Menu */
/* ======================================================================== */
var Menu = function () {
	var $menu = $('.js-overlay-menu');

	if (!$menu.length) {
		return;
	}

	var
		$overlay = $('.header__wrapper-overlay-menu'),
		$links = $menu.find('.menu-item-has-children > a'),
		$submenus = $menu.find('.overlay-sub-menu'),
		$submenuButton = $('.js-submenu-back'),
		OPEN_CLASS = 'opened',
		tl = new TimelineMax();

	function openSubmenu($submenu, $currentMenu) {
		var
			$currentLinks = $currentMenu.find('> li > a .overlay-menu__item-wrapper'),
			$submenuLinks = $submenu.find('> li > a .overlay-menu__item-wrapper');

		tl
			.clear()
			.set($submenu, {
				autoAlpha: 1,
				zIndex: 100,
				y: '0px'
			})
			.to($currentLinks, 0.6, {
				y: '-100%',
				ease: Power4.easeIn
			}, '-=0.3')
			.staggerTo($submenuLinks, 0.6, {
				y: '0%',
				ease: Power4.easeOut
			}, 0.05);

		$submenus.removeClass(OPEN_CLASS);
		$submenu.not($menu).addClass(OPEN_CLASS);

		if ($submenus.hasClass(OPEN_CLASS)) {
			tl.to($submenuButton, 0.3, {
				autoAlpha: 1,
				y: '0px'
			}, '-=0.6');
		} else {
			tl.to($submenuButton, 0.3, {
				autoAlpha: 0,
				y: '10px'
			}, '-=0.6');
		}

	}

	function closeSubmenu($submenu, $currentMenu) {
		var
			$currentLinks = $currentMenu.find('> li > a .overlay-menu__item-wrapper'),
			$submenuLinks = $submenu.find('> li > a .overlay-menu__item-wrapper');

		tl
			.clear()
			.set($submenu, {
				zIndex: -1
			})
			.to($submenuLinks, 0.6, {
				y: '100%',
				ease: Power4.easeIn
			}, '-=0.3')
			.staggerTo($currentLinks, 0.6, {
				y: '0%',
				ease: Power4.easeOut
			}, 0.05)
			.set($submenu, {
				autoAlpha: 0,
				y: '10px'
			});

		$submenus.removeClass(OPEN_CLASS);
		$currentMenu.not($menu).addClass(OPEN_CLASS);

		if ($submenus.hasClass(OPEN_CLASS)) {
			TweenMax.to($submenuButton, 0.3, {
				autoAlpha: 1,
				y: '0px'
			}, '-=0.6');
		} else {
			TweenMax.to($submenuButton, 0.3, {
				autoAlpha: 0,
				y: '10px'
			}, '-=0.6');
		}
	}

	$links.on('click', function (e) {
		e.preventDefault();

		if (!$overlay.hasClass('in-transition')) {
			var
				$el = $(this),
				$currentMenu = $el.parents('ul'),
				$submenu = $el.next('.overlay-sub-menu');

			openSubmenu($submenu, $currentMenu);
		}
	});

	$submenuButton.on('click', function (e) {
		e.preventDefault();

		if (!$overlay.hasClass('in-transition')) {
			var
				$el = $(this),
				$openedMenu = $submenus.filter('.' + OPEN_CLASS),
				$prevMenu = $openedMenu.parent('li').parent('ul');

			closeSubmenu($openedMenu, $prevMenu);
		}
	});

}
