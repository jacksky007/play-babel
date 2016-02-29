try {
  var obj = {
    f: function f() {
      try {
        console.log(arguments);
      } catch (e) {
        reportError(e, 'examples/src/method.js', 'f', 4, 6);
        throw e;
      }
    },
    g: function () {}
  };
} catch (e) {
  reportError(e, 'examples/src/method.js', 'top-level code', 1, 11);
}