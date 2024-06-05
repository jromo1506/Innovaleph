function PJAXUpdateHead(data) {

	return new Promise(function (resolve, reject) {

		var
			head = document.head,
			newPageRawHead = data.next.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0],
			newPageHead = document.createElement('head');

		newPageHead.innerHTML = newPageRawHead;

		var headTags = [
			'meta[name="keywords"]',
			'meta[name="description"]',
			'meta[property^="og"]',
			'meta[name^="twitter"]',
			'meta[itemprop]',
			'link[itemprop]',
			'link[rel="prev"]',
			'link[rel="next"]',
			'link[rel="canonical"]',
			'link[rel="alternate"]',
			'link[id*="elementor"]',
			'style[id*="elementor"]'
		].join(',');

		var
			oldHeadTags = head.querySelectorAll(headTags),
			newHeadTags = newPageHead.querySelectorAll(headTags);

		for (var i = 0; i < oldHeadTags.length; i++) {
			head.removeChild(oldHeadTags[i]);
		}

		for (var i = 0; i < newHeadTags.length; i++) {
			head.insertBefore(newHeadTags[i], head.querySelector('link[rel="stylesheet"]'));
		}

		resolve(true);

	});

}
