try {
  var f = function f() {
    try {
      console.log(arguments);

      function g() {
        try {
          console.log(arguments);
        } catch (e) {
          reportError(e, "examples/src/decl-in-exp.js", "g", 3, 5);
          throw e;
        }
      }

      g();
    } catch (e) {
      reportError(e, "examples/src/decl-in-exp.js", "anonymous function", 1, 7);
      throw e;
    }
  };

  f();
} catch (e) {
  reportError(e, "examples/src/decl-in-exp.js", "top-level code", 1, 10);
}