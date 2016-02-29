
function f() {


	var fa = 1, fb =2
	
		
		
	g(fa)
}
var obj = {
	method: function() {
		console.log('obj.method')
	}
}
obj.method2 = function() {
	console.log('obj.method 2')
}
console.log(window.f, f)
setTimeout(function() {
  nonDefinedFunction()
}, 1)

try {
  undefined()
} catch (e) {
  console.log(e)
  throw new Error('error has ben resolved and rethrown')
}
