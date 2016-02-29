try {
  console.log('log from main.js');

  try {
    f();
  } catch (e) {
    e._r = true;

    if (false) {
      document.body.innerHTML += '<pre>--------------------------</pre>';
      document.body.innerHTML += '<pre>error from try catch</pre>';
      var keys = ['message', 'line', 'column', 'stack', '_stack'];

      for (var i = 0; i < keys.length; i++) {
        document.body.innerHTML += '<pre>' + keys[i] + ':\t' + e[keys[i]] + '</pre>';
      }

      document.body.innerHTML += '<pre>--------------------------</pre>';
    }
  }

  function loadH() {
    try {
      var body = document.getElementsByTagName('body')[0];
      var script = document.createElement('script');
      script.src = 'h.js?' + Math.random();
      var head = document.getElementsByTagName('head')[0];
      setTimeout(function () {
        try {
          body.innerHTML = body.innerHTML;
        } catch (e) {
          reportError(e, 'browser-test/src/main.js', 'anonymous function', 26, 30);
          throw e;
        }
      }, 1);
      return;
      setTimeout(function () {
        try {
          throw 'error before loading h.js';
        } catch (e) {
          reportError(e, 'browser-test/src/main.js', 'anonymous function', 33, 35);
          throw e;
        }
      }, 1);
    } catch (e) {
      reportError(e, 'browser-test/src/main.js', 'loadH', 17, 36);
      throw e;
    }
  }

  loadH();
} catch (e) {
  reportError(e, 'browser-test/src/main.js', 'top-level code', 1, 39);
}