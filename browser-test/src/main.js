try {
	f()
} catch(e) {
	alert(e)
	document.body.innerHTML += '<pre>' + e.stack + '</pre>'
	throw e
}
