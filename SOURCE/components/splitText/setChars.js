function setChars($scope = window.$document, x = '50', y = 0, from) {

	return new Promise(function (resolve, reject) {

		var $target = $scope.find('[data-split-text-set="chars"]');

		if (!$target.length) {
			resolve(true);
			return;
		}

		TweenMax.set($target, {
			clearProps: 'all'
		});

		$target.each(function () {

			var
				$current = $(this),
				$lines = $current.find('.split-text__line'),
				textAlign = $current.css('text-align');

			if (!from) {

				switch (textAlign) {
					case 'left':
						setFromLeft($lines);
						break;
					case 'center':
						setFromCenter($lines);
						break;
					case 'right':
						setFromRight($lines);
						break;
				}

			}

		});

		function setFromLeft($lines) {

			if (!$lines || !$lines.length) {
				return;
			}

			var $chars = $lines.find('.split-text__char');

			TweenMax.set($chars, {
				x: x + 'px',
				y: y + 'px',
				autoAlpha: 0
			});

			resolve(true);

		}

		function setFromCenter($lines) {

			if (!$lines || !$lines.length) {
				return;
			}

			$lines.each(function () {

				var
					$currentLine = $(this),
					$wordsInCurrentLine = $currentLine.find('.split-text__word');

				// only 1 word in the current line
				if ($wordsInCurrentLine.length === 1) {

					var
						$charsInWord = $wordsInCurrentLine.find('.split-text__char'),
						halfWord = Math.ceil($charsInWord.length / 2),
						$fistHalfWord = $charsInWord.slice(0, halfWord),
						$secondHalfWord = $charsInWord.slice(halfWord, $charsInWord.length);

					TweenMax.set($fistHalfWord, {
						x: x * (-1) + 'px',
						y: y * (-1) + 'px',
						autoAlpha: 0
					});

					TweenMax.set($secondHalfWord, {
						x: x + 'px',
						y: y + 'px',
						autoAlpha: 0
					});

				}

				// odd number of words in line
				if ($wordsInCurrentLine.length !== 1 && $wordsInCurrentLine.length % 2 !== 0) {


					var
						halfLine = Math.ceil($wordsInCurrentLine.length / 2),
						$fistHalf = $wordsInCurrentLine.slice(0, halfLine),
						$secondHalf = $wordsInCurrentLine.slice(halfLine, $wordsInCurrentLine.length),
						$middleWord = $wordsInCurrentLine.eq(halfLine - 1),
						$charsInMiddleWord = $middleWord.find('.split-text__char'),
						halfLineMiddleWord = Math.ceil($charsInMiddleWord.length / 2),
						$fistHalfMiddleWord = $charsInMiddleWord.slice(0, halfLineMiddleWord),
						$secondHalfMiddleWord = $charsInMiddleWord.slice(halfLineMiddleWord, $charsInMiddleWord.length);

					// first half
					$fistHalf.each(function () {

						var $charsInWord = $(this).find('.split-text__char');

						TweenMax.set($charsInWord, {
							x: x * (-1) + 'px',
							y: y * (-1) + 'px',
							autoAlpha: 0
						});

					});

					// second half
					$secondHalf.each(function () {

						var $charsInWord = $(this).find('.split-text__char');

						TweenMax.set($charsInWord, {
							x: x + 'px',
							y: y + 'px',
							autoAlpha: 0
						});

					});

					// middle word first half
					$fistHalfMiddleWord.each(function () {

						var $charsInWord = $(this);
						TweenMax.set($charsInWord, {
							x: x * (-1) + 'px',
							y: y * (-1) + 'px',
							autoAlpha: 0
						});

					});

					// middle word second half
					$secondHalfMiddleWord.each(function () {

						var $charsInWord = $(this);
						TweenMax.set($charsInWord, {
							x: x + 'px',
							y: y + 'px',
							autoAlpha: 0
						});

					});

				}

				// even number of words in line
				if ($wordsInCurrentLine.length !== 1 && $wordsInCurrentLine.length % 2 === 0) {

					var
						halfLine = Math.ceil($wordsInCurrentLine.length / 2),
						$fistHalf = $wordsInCurrentLine.slice(0, halfLine),
						$secondHalf = $wordsInCurrentLine.slice(halfLine, $wordsInCurrentLine.length);

					// first half
					$fistHalf.each(function () {

						var $charsInWord = $(this).find('.split-text__char');

						TweenMax.set($charsInWord, {
							x: x * (-1) + 'px',
							y: y * (-1) + 'px',
							autoAlpha: 0
						});

					});

					// second half
					$secondHalf.each(function () {

						var $charsInWord = $(this).find('.split-text__char');

						TweenMax.set($charsInWord, {
							x: x + 'px',
							y: y + 'px',
							autoAlpha: 0
						});

					});

				}

			});

			resolve(true);

		}

		function setFromRight($lines) {

			if (!$lines || !$lines.length) {
				return;
			}

			var $chars = $lines.find('.split-text__char');

			TweenMax.set($chars, {
				x: x * (-1) + 'px',
				y: y * (-1) + 'px',
				autoAlpha: 0
			});

			resolve(true);

		}

	});

}
