var Counter = function ($target) {
	var $num = $target.find('.js-counter__number');

	if (!$target.length || !$num.length) {
		return;
	}

	var
		numberStart = $target.data('counter-start') || 0,
		numberTarget = $target.data('counter-target') || 100,
		animDuration = $target.data('counter-duration') || 4,
		counter = {
			val: numberStart
		};

	setCounterUp();
	animateCounterUp();

	function setCounterUp() {
		$num.text(numberStart.toFixed(0));
	}

	function animateCounterUp() {

		var tl = new TimelineMax();

		tl.to(counter, animDuration, {
			val: numberTarget.toFixed(0),
			ease: Power4.easeOut,
			onUpdate: function () {
				$num.text(counter.val.toFixed(0));
			}
		});

		createOSScene($target, tl);
	}
}
