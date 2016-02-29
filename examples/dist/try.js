try {
  try {
    undefined();
  } catch (e) {
    e._r = true;
    console.log(e);
    delete e._r;
    throw e;
  }

  try {
    undefined();
  } catch (e) {
    e._r = true;
    console.log(e);

    if (Math.random() < .5) {
      delete e._r;
      throw e;
    }

    ;

    (function () {
      try {
        try {
          undefined();
        } catch (e) {
          e._r = true;
          console.log(e);
        }
      } catch (e) {
        reportError(e, "examples/src/try.js", "anonymous function", 15, 21);
        throw e;
      }
    })();
  }

  function f() {
    try {
      try {
        undefined();
      } catch (e) {
        e._r = true;
        console.log(e);
        delete e._r;
        throw e;
      }
    } catch (e) {
      reportError(e, "examples/src/try.js", "f", 24, 31);
      throw e;
    }
  }

  function g() {
    try {
      try {
        undefined();
      } catch (e) {
        e._r = true;
        console.log(e);

        (function () {
          try {
            try {
              undefined();
            } catch (e) {
              e._r = true;
              console.log(e);
              delete e._r;
              throw e;
            }
          } catch (e) {
            reportError(e, "examples/src/try.js", "anonymous function", 38, 45);
            throw e;
          }
        })();

        delete e._r;
        throw e;
      }
    } catch (e) {
      reportError(e, "examples/src/try.js", "g", 33, 48);
      throw e;
    }
  }
} catch (e) {
  reportError(e, "examples/src/try.js", "top-level code", 1, 49);
}