try {
  console.log('play babel');

  function print() {
    try {
      consol.log(arguments);
    } catch (e) {
      reportError(e, 'examples/src/plain-script.js', 'print', 4, 6);
      throw e;
    }
  }

  print('play babel');
  prin('play babel');
} catch (e) {
  reportError(e, 'examples/src/plain-script.js', 'top-level code', 1, 10);
}