function doSplitText($target = window.$document) {

	return new Promise(function (resolve, reject) {

		var
			$texts = $target.find('.js-split-text'),
			$content,
			type;

		if (!$texts.length) {
			resolve(true);
			return;
		}

		$texts.each(function () {

			var $current = $(this);

			type = $current.data('split-text-type');
			$content = $current;

			if ($current.children(':not(br)').length > 0) {
				$content = $current.find('> *');
			}

			new SplitText($content, {
				type: type,
				linesClass: 'split-text__line',
				wordsClass: 'split-text__word',
				charsClass: 'split-text__char'
			});

			$current.removeClass('js-split-text');

		});

		resolve(true);

	});

}
