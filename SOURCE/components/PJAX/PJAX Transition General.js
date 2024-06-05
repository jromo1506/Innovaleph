var PJAXTransitionGeneral = {

	before: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXPrepareTransition(data).then(function () {
				resolve(true);
			});

		});

	},

	beforeLeave: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXAnimateCurtain('in').then(function () {
				resolve(true);
			});

		});

	},

	enter: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXInitNewPage(data).then(function () {
				resolve(true);
			});

		});
	},

	afterEnter: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXAnimateCurtain('out').then(function () {
				resolve(true);
			});

		});

	},


	after: (data) => {

		return new Promise(function (resolve, reject) {

			PJAXFinishLoading(data).then(function () {
				resolve(true);
			});

		});

	}

}
