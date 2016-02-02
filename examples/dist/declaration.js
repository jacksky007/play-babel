(function () {
  var __error_has_stack__;

  try {
    throw new Error();
  } catch (e) {
    __error_has_stack__ = !!e.stack;
  }

  var __error_stack_filename__ = "examples/src/declaration.js";

  try {
    function f() {
      try {
        console.log(arguments);
      } catch (e) {
        if (__error_has_stack__) {
          throw e;
        }

        var err = {};

        if (!e.stack) {
          e.stack = e.name + ': ' + e.message;
        }

        e.stack = e.stack + '\n\tat ' + "f" + ' (' + __error_stack_filename__ + ':' + 1 + '-' + 3 + ':0)';
        throw e;
      }
    }

    f();

    function g() {}

    g();
  } catch (e) {
    throw e;
  }
})();