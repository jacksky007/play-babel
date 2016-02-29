try {
  console.log('log from h');
} catch (e) {
  reportError(e, 'browser-test/src/h.js', 'top-level code', 1, 2);
}