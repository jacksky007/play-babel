(function () {
  var __error_has_stack__;

  try {
    throw new Error();
  } catch (e) {
    __error_has_stack__ = !!e.stack;
  }

  var __error_stack_filename__ = 'examples/src/plain-script.js';

  try {
    console.log('play babel');

    function print() {
      try {
        consol.log(arguments);
      } catch (e) {
        if (__error_has_stack__) {
          throw e;
        }

        var err = {};

        if (!e.stack) {
          e.stack = e.name + ': ' + e.message;
        }

        e.stack = e.stack + '\n\tat ' + 'print' + ' (' + __error_stack_filename__ + ':' + 4 + '-' + 6 + ':0)';
        throw e;
      }
    }

    print('play babel');
    prin('play babel');
  } catch (e) {
    throw e;
  }
})();