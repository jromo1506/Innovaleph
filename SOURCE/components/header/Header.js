var Header = function () {
	var $overlay = $('.header__wrapper-overlay-menu');

	this.hideOverlayMenu = function (speed, setMenu) {

		return closeOverlayMenu(speed, setMenu);

	};

	if (!$overlay.length) {
		return;
	}

	var
		$stickyHeader = $('.js-sticky-header'),
		$burger = $('#js-burger'),
		$menuLinks = $overlay.find('.menu-overlay > li > a'),
		$allLinks = $overlay.find('a'),
		$submenu = $overlay.find('.menu-overlay .sub-menu'),
		$submenuButton = $('#js-submenu-back'),
		$submenuLinks = $submenu.find('> li > a'),
		$overlayWidgets = $overlay.find('.header__wrapper-overlay-widgets'),
		$social = $overlayWidgets.find('.social'),
		$headerLeft = $('.header__col-left'),
		$headerRight = $('.header__col-right'),
		$langSwitcher = $('.lang-switcher'),
		$curtain = $('.header__curtain'),
		$circleLetters = $('.header__circle-letters'),
		$widgetListElements = $('.header__wrapper-overlay-widgets ul li'),
		OPEN_CLASS = 'header__burger_opened',
		STICKY_CLASS = 'header_sticky',
		STICKY_THEME = $stickyHeader.attr('data-header-sticky-theme');

	clickBurger();
	setOverlayMenu();
	stickHeader();

	function stickHeader() {

		if (!$stickyHeader.length) {
			return;
		}

		if (window.SB === undefined) {

			window.stickyScene = new $.ScrollMagic.Scene({
					offset: '1px',
				})
				.setClassToggle($stickyHeader, STICKY_CLASS + ' ' + STICKY_THEME)
				.addTo(SMController);

		} else {

			window.SB.addListener(changeHeaderClass);

		}

	}

	function unstickHeader() {

		if (!$stickyHeader.length) {
			return;
		}

		if (window.SB === undefined) {

			if (window.stickyScene) {

				window.stickyScene.destroy(true);
				$stickyHeader.removeClass(STICKY_CLASS);

			}

		} else {

			window.SB.removeListener(changeHeaderClass);
			$stickyHeader.removeClass(STICKY_CLASS);

		}

	}

	function changeHeaderClass() {

		if (window.SB.offset.y >= 1) {
			$stickyHeader.addClass(STICKY_CLASS).addClass(STICKY_THEME);
		} else {
			$stickyHeader.removeClass(STICKY_CLASS).removeClass(STICKY_THEME);
		}

	}

	function setOverlayMenu() {

		getScrollTop();

		TweenMax.set($overlay, {
			autoAlpha: 0,
			className: '-=opened',
		});

		TweenMax.set([$submenu, $submenuButton], {
			autoAlpha: 0
		});

		TweenMax.set($submenu, {
			className: '-=opened'
		});

		TweenMax.set($curtain, {
			y: '-110%',
		});

		TweenMax.set($circleLetters, {
			autoAlpha: 0
		});

		TweenMax.set($menuLinks.find('.split-text__line'), {
			y: '100%',
			autoAlpha: 0
		});

		TweenMax.set($menuLinks.find('.split-text__char'), {
			clearProps: 'transform',
			autoAlpha: 1
		});

		setLines($overlayWidgets);

		TweenMax.set($social, {
			autoAlpha: 0,
			y: '100%'
		});

		TweenMax.set($submenuLinks.find('.split-text__line'), {
			clearProps: 'transform',
			autoAlpha: 1
		});

		TweenMax.set($submenuLinks.find('.split-text__char'), {
			x: '50px',
			autoAlpha: 0
		});

		TweenMax.set($widgetListElements, {
			autoAlpha: 0,
			y: '50px'
		});

		$allLinks.removeClass('selected');

	};

	function openOverlayMenu() {

		var
			tl = new TimelineMax(),
			$pageContent = $('.page-wrapper__content');

		// adjust animation menu master speed
		if (window.theme !== 'undefined') {

			var scale = window.theme.animations.timeScale.overlayMenuOpen || 1;
			tl.timeScale(scale);

		}

		tl
			.set($overlay, {
				autoAlpha: 1,
				zIndex: 500
			}, '0')
			.add(function () {
				window.$pageHeader.attr('data-header-animation', 'intransition');
				getScrollTop();
			})
			.set($overlay, {
				className: '+=opened'
			})
			.to($curtain, 1.2, {
				y: '0%',
				ease: Expo.easeInOut,
			})
			.to($pageContent, 1.2, {
				y: '10vh',
				force3D: true,
				ease: Expo.easeInOut
			}, '-=1.2')
			.add(animateLines($menuLinks, 1.2, 0.05), '-=0.6')
			.staggerTo($widgetListElements, 0.6, {
				autoAlpha: 1,
				y: '0px'
			}, 0.03, '-=1.2')
			.add(animateLines($overlayWidgets, 1.2, 0.05), '-=1.2')
			.to($social, 0.6, {
				autoAlpha: 1,
				y: '0%'
			}, '-=1.2')
			.to($circleLetters, 1.2, {
				autoAlpha: 1,
			}, '-=1.2')
			.to([$headerLeft, $langSwitcher, $headerRight], 1.2, {
				x: '30px',
				autoAlpha: 0,
				ease: Expo.easeInOut
			}, '0')
			.to($pageContent, 0.3, {
				display: 'none'
			})
			.add(function () {
				unstickHeader();
			}, '0.6')
			.add(function () {
				lockScroll(true);
			}, '1.2')
			.add(function () {
				window.$pageHeader.attr('data-header-animation', '');
			});

	};

	function closeOverlayMenu(speed, setMenu = true) {

		var
			tl = new TimelineMax(),
			$pageContent,
			$submenuLinksCurrent;

		if (!$overlay.hasClass('opened')) {
			return tl;
		}

		$pageContent = $('.page-wrapper__content');
		$submenuLinksCurrent = $submenu.filter('.opened').find($submenuLinks);

		// adjust animation menu master speed
		if (window.theme !== 'undefined' && !speed) {

			var scale = window.theme.animations.timeScale.overlayMenuClose || 1;
			tl.timeScale(scale);

		} else {

			tl.timeScale(speed);

		}

		tl
			.set($overlay, {
				zIndex: 500
			})
			.add(function () {
				window.$pageHeader.attr('data-header-animation', 'intransition');
			})
			.add(function () {

				restoreScrollTop();
				stickHeader();

				if (typeof window.SB !== 'undefined' && window.SB.offset.y >= 1) {
					$stickyHeader.addClass(STICKY_CLASS);
				}

				if (setMenu === true) {
					lockScroll(false);
				}

			}, '0.6')
			.set($burger, {
				className: '-=header__burger_opened'
			}, '0')
			.set($pageContent, {
				y: '5vh',
				force3D: true
			}, '0')
			.add(hideLines($menuLinks, 1.2, 0.05, '-100%', true), '0')
			.add(hideLines($submenuLinksCurrent, 1.2, 0.05, '-100%', Power3.easeInOut, true), '0')
			.add(hideLines($overlayWidgets, 0.6), '0')
			.to($social, 0.6, {
				autoAlpha: 0,
				y: '-100%'
			}, '0')
			.staggerTo($widgetListElements, 0.6, {
				autoAlpha: 0,
				y: '-30px'
			}, 0.03, '0')
			.to($circleLetters, 1.2, {
				autoAlpha: 0,
			}, '0')
			.to($curtain, 1.2, {
				y: '-110%',
				ease: Expo.easeInOut
			}, '0.6')
			.to($pageContent, 2.4, {
				y: '0vh',
				force3D: true,
				autoAlpha: 1,
				ease: Expo.easeInOut,
				display: 'block'
			}, '0')
			.to($submenuButton, 0.6, {
				x: '-10px',
				autoAlpha: 0
			}, '0')
			.staggerFromTo([$headerLeft, $langSwitcher, $headerRight], 2.4, {
				x: '-50px',
			}, {
				x: '0px',
				autoAlpha: 1,
				ease: Expo.easeInOut
			}, 0.05, '0.4')
			.set($overlay, {
				className: '-=opened'
			}, '1')
			.add(function () {
				window.$pageHeader.attr('data-header-animation', '');
				if (setMenu === true) {
					setOverlayMenu();
				}
			});

		return tl;

	};

	function clickBurger() {

		$burger.off().on('click', function (e) {

			e.preventDefault();

			if (window.$pageHeader.attr('data-header-animation') !== 'intransition') {

				if ($burger.hasClass(OPEN_CLASS)) {
					closeOverlayMenu();
					$burger.removeClass(OPEN_CLASS);
				} else {
					openOverlayMenu();
					$burger.addClass(OPEN_CLASS);
				}

			}

		});
	};
}
