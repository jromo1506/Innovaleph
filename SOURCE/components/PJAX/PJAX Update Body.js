function PJAXUpdateBody(data) {

	return new Promise(function (resolve, reject) {

		var
			regexp = /\<body.*\sclass=["'](.+?)["'].*\>/gi,
			match = regexp.exec(data.next.html);

		if (!match || !match[1]) {
			resolve(true);
		}

		document.body.setAttribute('class', match[1]);

		resolve(true);

	});

}
