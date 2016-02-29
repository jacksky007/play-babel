try {
  undefined()
} catch(e) {
  console.log(e)
  throw e
}

try {
  undefined()
} catch(e) {
  console.log(e)
  if (Math.random() < .5) {
    throw e
  }
  ;(function() {
    try {
      undefined()
    } catch(e) {
      console.log(e)
    }
  })()
}

function f() {
  try {
    undefined()
  } catch(e) {
    console.log(e)
    throw e
  }
}

function g() {
  try {
    undefined()
  } catch(e) {
    console.log(e)
    ;(function() {
      try {
        undefined()
      } catch(e) {
        console.log(e)
        throw e
      }
    })()
    throw e
  }
}
