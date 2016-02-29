try {
  function f() {
    try {
      console.log(arguments);
    } catch (e) {
      reportError(e, "examples/src/declaration.js", "f", 1, 3);
      throw e;
    }
  }

  f();

  function g() {}

  g();
} catch (e) {
  reportError(e, "examples/src/declaration.js", "top-level code", 1, 10);
}