window.$document = $(document);
window.$window = $(window);
window.$body = $('body');
window.$pageContent = $('.page-wrapper__content');
window.$pageHeader = $('.header');
window.$overlay = $('.header__wrapper-overlay-menu');
window.$barbaWrapper = $('[data-barba="wrapper"]');
window.PagePreloader = new Preloader();
window.$curtain = $('.transition-curtain');
window.triggerTextAlign = 'left';

/**
 * Try to use high performance GPU on dual-GPU systems
 */
runOnHighPerformanceGPU();

/**
 * Begin Page Load
 */
window.PagePreloader.start();

/**
 * Default Theme Options
 * Used to prevent errors if there is
 * no data provided from backend
 */
if (typeof window.theme === 'undefined') {
	window.theme = {
		fonts: ['Roboto', 'Playfair Display'],
		customPreventRules: '',
		animations: {
			flyingHeadingsStagger: 0.25,
			timeScale: {
				onScrollReveal: 1,
				overlayMenuOpen: 1,
				overlayMenuClose: 1.5,
			}
		}
	}
}

/**
 * ScrollMagic Setup
 */
window.SMController = new ScrollMagic.Controller();
window.SMController.enabled(false);
window.SMSceneTriggerHook = 0.85;
window.SMSceneReverse = false;

/**
 * Don't save scroll position
 * after AJAX transition
 */
if ('scrollRestoration' in history) {
	history.scrollRestoration = 'manual';
}

/**
 * Page Load Strategy
 */
$window.on('load', function () {
	document.fonts.ready
		.then(function () {
			return doSplitText();
		})
		.then(function () {
			return setLines();
		})
		.then(function () {
			return setChars();
		})
		.then(function () {
			lazyLoad(window.$document);
			initComponents(window.$document);
			return window.PagePreloader.finish();
		})
		.then(function () {
			window.SMController.enabled(true);
			window.SMController.update(true);
		});

	new PJAX();
});

/**
 * Init Template Components
 */
function initComponents($scope = window.$document) {

	window.PageHeader = new Header();

	if (typeof window.PageMenu === 'undefined') {
		window.PageMenu = new MenuOverlay();
	}

	new SectionMasthead($scope);
	new SectionPortfolio($scope);
	new SectionNavProjects($scope);
	new SectionFullscreenSlider($scope);
	new SectionContent($scope);
	new SectionAbout($scope);
	new SectionServices($scope);
	new SectionTestimonials($scope);
	new SectionAwards($scope);
	new SliderImages($scope);
	new SliderProjects($scope);
	new SliderLetters($scope);
	$('.js-video').magnificPopup();
	new ScrollDown();
	new Form();
	new GMap($scope);
	new ButtonCircle($scope);
	new Grid();

	fixMobileBarHeight();
	lazyLoad($scope);
	$('[data-art-parallax]').artParallax({
		ScrollMagicController: window.SMController,
		SmoothScrollController: window.SB
	});

}
