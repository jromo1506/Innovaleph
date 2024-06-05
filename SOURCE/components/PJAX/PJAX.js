var PJAX = function () {

	var $barbaWrapper = $('[data-barba="wrapper"]');

	if (!$barbaWrapper.length) {
		return;
	}

	barba.init({

		timeout: 6000,

		// don't trigger barba for links outside wrapper 
		prevent: ({
			el
		}) => {

			var
				$el = $(el),
				exludeRules = [
					'[data-elementor-open-lightbox]', // Elementor lightbox gallery
					'.lang-switcher a' // Polylang & WPML language switcher
				];

			// elementor preview
			if (typeof elementor === 'object') {
				return true;
			}

			// clicked on elementor ouside barba wrapper
			if ($el.closest($barbaWrapper).length < 1) {
				return true;
			}

			// custom rules from WordPress Customizer
			if (window.theme.customPreventRules) {
				exludeRules.push(window.theme.customPreventRules);
			}

			// check against array of rules to prevent
			return $el.is(exludeRules.join(','));

		},
		// custom transitions
		transitions: [
			PJAXTransitionGeneral,
			PJAXTransitionFlyingHeading,
			PJAXTransitionOverlayMenu,
		]

	});


}
