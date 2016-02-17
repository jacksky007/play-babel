window.reportError = (function() {
  var cache = {}
  return function(e, filename, lineStart, lineEnd, functionName) {
    if (!e._t) {
      e._t = new Date().getTime()
      cache[e._t] = e
      e._stack = (e.name + ': ' + e.message)

      setTimeout(function() {
        // report error
        console.log(e._t, e._stack)
        delete cache[e._t]
      }, 10)
    }
    if (filename) {
      e._stack += '\n\tat ' + functionName + ' (' + filename + ':' + lineStart + '-' + lineEnd + ')'
    }
  }
})()

;(function() {
  var btns = ['a', 'c', 'f', 'g']
  var html = ''
  for(var i = 0; i < btns.length; i++) {
    html += '<button onclick="' + btns[i] + '()">调用' + btns[i] +'()</button> '
  }
  document.body.innerHTML += html
})()

var e = {message: 'error'}
function a() {
  try {
    b()
  } catch(e) {
    reportError(e, 'index.html', 27, 34, 'a')
    throw e
  }
}
function b() {
  try {
    var e = new Error
    e.message = 'error in b'
    e._t = (new Date).getTime()
    throw e
  } catch(e) {
    reportError(e, 'index.html', 35, 43, 'b')
    throw e
  }
}
try{
  a()
  //setTimeout(a, 400)
}catch(e){reportError(e)}
function c() {
  try {
    d()
  } catch(e) {
    reportError(e, 'index.html', 54, 61, 'c')
    throw e
  }
}
function d() {
  try {
    var e = new Error
    e.message = 'error in d'
    e._t = (new Date).getTime()
    throw e
  } catch(e) {
    reportError(e, 'index.html', 62, 72, 'd')
    throw e
  }
}
try{c()}catch(e){reportError(e)}
window.onerror = function(message, url, line, column, error) {
	document.body.innerHTML += '<pre>-----------------------</pre>'
	document.body.innerHTML += '<pre>window.orror:</pre>'
	document.body.innerHTML += '<pre>message: ' + message + '</pre>'
	document.body.innerHTML += '<pre>url: ' + url + '</pre>'
	document.body.innerHTML += '<pre>line: ' + line + '</pre>'
	document.body.innerHTML += '<pre>column: ' + column + '</pre>'
	document.body.innerHTML += '<pre>error: ' + error + '</pre>'
	document.body.innerHTML += '<pre>-----------------------</pre>'
}

