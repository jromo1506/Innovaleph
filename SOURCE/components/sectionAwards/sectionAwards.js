var SectionAwards = function ($scope) {

	var
		$target = $scope.find('.section-awards'),
		$figureAward = $target.find('.figure-award[data-os-animation]');

	$figureAward.each(function () {
		new FigureAward($(this));
	});

}
