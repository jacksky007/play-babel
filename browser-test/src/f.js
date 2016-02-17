
function f() {


	var fa = 1, fb =2
	
		
		
	g(fa)
}
console.log(window.f, f)
setTimeout(function() {
	throw 'error from f'
}, 100)
