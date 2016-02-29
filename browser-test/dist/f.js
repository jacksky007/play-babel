try {
	function f() {
		try {
			var fa = 1,
			    fb = 2;
			g(fa);
		} catch (e) {
			reportError(e, 'browser-test/src/f.js', 'f', 2, 10);
			throw e;
		}
	}

	var obj = {
		method: function method() {
			try {
				console.log('obj.method');
			} catch (e) {
				reportError(e, 'browser-test/src/f.js', 'method', 12, 14);
				throw e;
			}
		}
	};

	obj.method2 = function () {
		try {
			console.log('obj.method 2');
		} catch (e) {
			reportError(e, 'browser-test/src/f.js', 'anonymous function', 16, 18);
			throw e;
		}
	};

	console.log(window.f, f);
	setTimeout(function () {
		try {
			nonDefinedFunction();
		} catch (e) {
			reportError(e, 'browser-test/src/f.js', 'anonymous function', 20, 22);
			throw e;
		}
	}, 1);

	try {
		undefined();
	} catch (e) {
		e._r = true;
		console.log(e);
		throw new Error('error has ben resolved and rethrown');
	}
} catch (e) {
	reportError(e, 'browser-test/src/f.js', 'top-level code', 1, 30);
}