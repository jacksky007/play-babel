try {
	function g(ga) {
		try {
			console.log(ga + gb);
		} catch (e) {
			e._t = e._t || new Date().getTime();
			reportError(e, "browser-test/src/g.js", 1, 3, "g");
			throw e;
		}
	}
} catch (e) {
	e._t = e._t || new Date().getTime();
	reportError(e, "browser-test/src/g.js", 0, 1, "top-level code");
}