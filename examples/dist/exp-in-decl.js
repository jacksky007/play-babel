(function () {
  var __error_has_stack__;

  try {
    throw new Error();
  } catch (e) {
    __error_has_stack__ = !!e.stack;
  }

  var __error_stack_filename__ = "examples/src/exp-in-decl.js";

  try {
    function f() {
      try {
        console.log(arguments);

        var g = function () {
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

            e.stack = e.stack + '\n\tat ' + "annoymous function" + ' (' + __error_stack_filename__ + ':' + 3 + '-' + 5 + ':0)';
            throw e;
          }
        };

        g();
      } catch (e) {
        if (__error_has_stack__) {
          throw e;
        }

        var err = {};

        if (!e.stack) {
          e.stack = e.name + ': ' + e.message;
        }

        e.stack = e.stack + '\n\tat ' + "f" + ' (' + __error_stack_filename__ + ':' + 1 + '-' + 7 + ':0)';
        throw e;
      }
    }

    f();
  } catch (e) {
    throw e;
  }
})();