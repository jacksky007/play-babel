'use strict'

const t = require('babel-types')
const template = require('babel-template')

const errorHasStack = '__error_has_stack__'
const errorStackFilename = '__error_stack_filename__'

/*
stack format:
${error.name}: ${error.message}
  at ${functionName} (${fileNameOrUrl}:line:column)
  at ${functionName} (${fileNameOrUrl}:line:column)
  .
  .
  .
*/

const wrapProgram = template(`
  (function() {
    // Error in ie<10 has no stack
    var ${errorHasStack}
    try {
      throw new Error
    } catch(e) {
      ${errorHasStack} = !!e.stack
    }
    var ${errorStackFilename} = FILENAME
    try {
      BODY
    } catch(e) {
      // report the error
      throw e
    }
  })()
`)

const wrapFunction = template(`{
  try {
    BODY
  } catch(e) {
    if (${errorHasStack}) {
      throw e
    }
    var err = {}
    if (!e.stack) {
      e.stack = e.name + ': ' + e.message
    }
    e.stack = e.stack + '\\n\\tat ' + FUNCTION_NAME + ' (' + ${errorStackFilename} + ':' + LINE_START + '-' + LINE_END + ':0)'
    throw e
  }
}`)

module.exports = {
  visitor: {
    Program: {
      exit(path, state) {
        if (state.end) {
          return
        }
        state.end = true

        const body = path.node.body
        if (body.length === 0) {
          return
        }

        const programBody = wrapProgram({
          BODY: body,
          FILENAME: t.StringLiteral(state.file.opts.filename),
        })
        path.replaceWith(t.Program([programBody]))
      }
    },
    Function:{
      exit(path, state) {
        if (state.end) {
          return
        }

        const body = path.node.body.body
        if (body.length === 0) {
          return
        }

        path.get('body').replaceWith(wrapFunction({
          BODY: body,
          //FILENAME: t.StringLiteral(state.file.opts.filename),
          FUNCTION_NAME: t.StringLiteral(path.node.id ? path.node.id.name : 'annoymous function'),
          LINE_START: t.NumericLiteral(path.node.loc.start.line),
          LINE_END: t.NumericLiteral(path.node.loc.end.line),
        }))
      }
    }
  }
}

