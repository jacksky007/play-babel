try {
	var g = function g(ga) {
		try {
			console.log(ga + gb);
		} catch (e) {
			reportError(e, 'browser-test/src/g.js', 'anonymous function', 1, 3);
			throw e;
		}
	};

	console.log('g', typeof g);
} catch (e) {
	reportError(e, 'browser-test/src/g.js', 'top-level code', 1, 5);
}