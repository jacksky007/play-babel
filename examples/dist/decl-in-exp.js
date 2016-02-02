(function () {
  var __error_has_stack__;

  try {
    throw new Error();
  } catch (e) {
    __error_has_stack__ = !!e.stack;
  }

  var __error_stack_filename__ = "examples/src/decl-in-exp.js";

  try {
    var f = function () {
      try {
        console.log(arguments);

        function g() {
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

            e.stack = e.stack + '\n\tat ' + "g" + ' (' + __error_stack_filename__ + ':' + 3 + '-' + 5 + ':0)';
            throw e;
          }
        }

        g();
      } catch (e) {
        if (__error_has_stack__) {
          throw e;
        }

        var err = {};

        if (!e.stack) {
          e.stack = e.name + ': ' + e.message;
        }

        e.stack = e.stack + '\n\tat ' + "annoymous function" + ' (' + __error_stack_filename__ + ':' + 1 + '-' + 7 + ':0)';
        throw e;
      }
    };

    f();
  } catch (e) {
    throw e;
  }
})();