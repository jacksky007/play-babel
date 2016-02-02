(function () {
  var __error_has_stack__;

  try {
    throw new Error();
  } catch (e) {
    __error_has_stack__ = !!e.stack;
  }

  var __error_stack_filename__ = "examples/src/expression.js";

  try {
    var f = function () {
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

        e.stack = e.stack + '\n\tat ' + "annoymous function" + ' (' + __error_stack_filename__ + ':' + 1 + '-' + 3 + ':0)';
        throw e;
      }
    };

    var g = function () {};
  } catch (e) {
    throw e;
  }
})();