(function () {
	var __error_has_stack__;

	try {
		throw new Error();
	} catch (e) {
		__error_has_stack__ = !!e.stack;
	}

	var __error_stack_filename__ = 'browser-test/src/main.js';

	try {
		try {
			f();
		} catch (e) {
			alert(e);
			document.body.innerHTML += '<pre>' + e.stack + '</pre>';
			throw e;
		}
	} catch (e) {
		throw e;
	}
})();