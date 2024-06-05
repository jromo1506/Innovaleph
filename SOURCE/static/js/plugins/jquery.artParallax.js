(function ($, ScrollMagic, TimelineMax, TweenMax, undefined) {

	$.fn.artParallax = function (options) {

		var settings = $.extend({
			factor: 0.3,
			ScrollMagicController: undefined,
			SmoothScrollController: undefined,
		}, options);

		if (typeof settings.ScrollMagicController === undefined) {
			settings.ScrollMagicController = new ScrollMagic.Controller();
		}

		/**
		 * Add scene to ScrollMagic controller
		 */
		function addToScrollMagic(options = {
			trigger,
			duration,
			timeline,
			controller
		}) {

			return new ScrollMagic.Scene({
					triggerElement: options.trigger,
					triggerHook: 1,
					duration: options.duration
				})
				.setTween(options.timeline)
				.addTo(options.controller)
				.update(true);

		};

		/**
		 * Update scene in Smooth Scroll plugin (virtual scroll)
		 */
		function addToSmoothScroll(options = {
			controller,
			scene
		}) {

			if (typeof options.controller !== 'undefined') {

				options.controller.addListener(function () {
					options.scene.refresh();
				});
			}

		};

		/**
		 * Create parallax timeline
		 */
		function getParallaxTimeline(options = {
			element,
			fromY,
			fromX,
			toY,
			toX,
			scale
		}) {

			var tl = new TimelineMax();

			return tl.fromTo(options.element, 1, {
				y: options.fromY || null,
				x: options.fromX || null,
				scale: options.scale || null,
				transformOrigin: 'center center',
			}, {
				y: options.toY || null,
				x: options.toX || null,
				force3D: true,
				rotationZ: 0.01,
				ease: Linear.easeNone,
			});

		};

		return this.each(function () {

			var
				$this = $(this),
				$img = $this.find('img, .art-parallax__bg'),
				distanceToY = $this.data('art-parallax-y') || 0,
				distanceToX = $this.data('art-parallax-x') || 0,
				scene,
				sceneDuration = window.innerHeight + $this.outerHeight(),
				tl;

			if (!$img.length && !distanceToX && !distanceToY) {
				return;
			}

			tl = new TimelineMax();

			// use parent element to calculate the height of image
			if ($img.is('img')) {
				sceneDuration = window.innerHeight + $this.parent().outerHeight();
			}

			if ($img.is('img') || $img.is('.art-parallax__bg')) {

				var
					factor = parseFloat($this.data('art-parallax-factor')) || parseFloat(settings.factor),
					factorTo = Math.abs(factor) * 100,
					factorFrom = -1 * factor * 100,
					factorScale = 1 + Math.abs(factor);

				if (factorFrom > 0) {
					factorScale = factorScale * factorScale;
					factorTo = factor * 100;
				}

				// create timeline for the element
				tl = getParallaxTimeline({
					element: $img,
					fromX: '0%',
					fromY: factorFrom + '%',
					toY: factorTo + '%',
					toX: '0%',
					scale: factorScale
				});

			} else {

				tl = getParallaxTimeline({
					element: $this,
					toY: distanceToY,
					toX: distanceToX
				});

			}

			// add scene to ScrollMagic controller
			scene = addToScrollMagic({
				trigger: $this,
				duration: sceneDuration,
				timeline: tl,
				controller: settings.ScrollMagicController
			});

			// update scene when smooth scroll is enabled
			addToSmoothScroll({
				controller: settings.SmoothScrollController,
				scene: scene
			});

		});

	}

})(jQuery, ScrollMagic, TimelineMax, TweenMax);
