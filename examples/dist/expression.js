try {
  var f = function f() {
    try {
      console.log(arguments);
    } catch (e) {
      reportError(e, "examples/src/expression.js", "anonymous function", 1, 3);
      throw e;
    }
  };

  var g = function () {};
} catch (e) {
  reportError(e, "examples/src/expression.js", "top-level code", 1, 6);
}