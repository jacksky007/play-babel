console.log('log from main.js')
try {
	f()
} catch(e) {
	document.body.innerHTML += '<pre>--------------------------</pre>'
	document.body.innerHTML += '<pre>error from try catch</pre>'
	var keys = ['message', 'line', 'column', 'stack', '_stack']
	for (var i = 0; i < keys.length; i++) {
		document.body.innerHTML += '<pre>' + keys[i] + ':\t' + e[keys[i]] + '</pre>'
	}
	document.body.innerHTML += '<pre>--------------------------</pre>'
	//throw e
}
