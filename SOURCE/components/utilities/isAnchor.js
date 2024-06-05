function checkIsAnchor($el) {

	var link = $el.attr('href');

	if ($el.length && link.length && link !== '#') {

		return true;

	}

	return false;

}
