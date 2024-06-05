function PJAXGetFlyingDirection($clone, $target) {

	if (!$clone.length || !$target.length) {
		return 'start';
	}

	var coordinatesTarget = $target.get(0).getBoundingClientRect();

	if (
		$clone.attr('data-origin-left') > coordinatesTarget['left'] &&
		$clone.attr('data-origin-right') < coordinatesTarget['right'] &&
		$clone.css('text-align') == 'center' &&
		$target.css('text-align') == 'center'
	) {
		return 'center';
	}

	if ($clone.attr('data-origin-left') >= coordinatesTarget['left']) {
		return 'start';
	} else {
		return 'end';
	}

}
