try {
	function f() {
		try {
			var fa = 1,
			    fb = 2;
			g(fa);
		} catch (e) {
			e._t = e._t || new Date().getTime();
			reportError(e, "browser-test/src/f.js", 2, 10, "f");
			throw e;
		}
	}
} catch (e) {
	e._t = e._t || new Date().getTime();
	reportError(e, "browser-test/src/f.js", 0, 1, "top-level code");
}
