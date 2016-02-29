console.log('log from main.js')
try {
	f()
} catch(e) {
  if(false) {
    document.body.innerHTML += '<pre>--------------------------</pre>'
    document.body.innerHTML += '<pre>error from try catch</pre>'
    var keys = ['message', 'line', 'column', 'stack', '_stack']
    for (var i = 0; i < keys.length; i++) {
      document.body.innerHTML += '<pre>' + keys[i] + ':\t' + e[keys[i]] + '</pre>'
    }
    document.body.innerHTML += '<pre>--------------------------</pre>'
    //throw e
  }
}

function loadH() {
  var body = document.getElementsByTagName('body')[0]

  var script = document.createElement('script')
  script.src = 'h.js?' + Math.random()
  var head = document.getElementsByTagName('head')[0]
  //head.appendChild(script)
  //body.appendChild(script)

  setTimeout(function() {
    body.innerHTML = body.innerHTML
    //document.body.innerHTML = document.body.innerHTML
    //document.body.insertAdjacentHTML('beforeend', '<p>1234567890</p>')
  }, 1)
  //document.body.appendChild(script)
return
  setTimeout(function() {
    throw 'error before loading h.js'
  }, 1)
}
loadH()
//document.body.innerHTML += '<button onclick="loadH()">动态加载h.js</button>'
