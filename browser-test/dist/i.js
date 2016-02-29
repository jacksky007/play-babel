try {
  console.log('log from i');
} catch (e) {
  reportError(e, 'browser-test/src/i.js', 'top-level code', 1, 2);
}