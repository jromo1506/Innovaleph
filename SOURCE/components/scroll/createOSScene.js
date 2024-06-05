function createOSScene($el, tl, $customTrigger, noReveal = false, animDelay = 0) {
	var
		$trigger = $el,
		scene,
		scale,
		delayAttr = parseFloat($trigger.attr('data-os-animation-delay')) || 0,
		masterTL = new TimelineMax();

	if ($customTrigger && $customTrigger.length) {
		$trigger = $customTrigger;
	}

	if (!noReveal) {
		// reveal hidden element first
		masterTL.add(TweenMax.set($el, {
			autoAlpha: 1
		}), '0');
	}


	if (!animDelay && delayAttr) {
		masterTL.delay(delayAttr);
		// masterTL.shiftChildren(delayAttr, true);
	}

	if (animDelay && delayAttr) {
		masterTL.delay(animDelay);
		// masterTL.shiftChildren(animDelay, true);
	}

	masterTL
		.add(tl, '0')
		.add(function () {

			// update scrollbar geometry
			if (window.SB !== undefined) {
				window.SB.update();
			}

		}, '0');

	// set animation reveal master speed
	if (window.theme !== undefined) {

		scale = window.theme.animations.timeScale.onScrollReveal || 1;
		masterTL.timeScale(scale);

	}

	scene = new $.ScrollMagic.Scene({
			triggerElement: $trigger,
			triggerHook: window.SMSceneTriggerHook,
			reverse: window.SMSceneReverse
		})
		.setTween(masterTL)
		.addTo(window.SMController);


	// update scene when smooth scroll is enabled
	if (window.SB !== undefined) {

		window.SB.addListener(function () {
			scene.refresh();
		});

	}
}
