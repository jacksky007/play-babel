'use strict'

const t = require('babel-types')
const template = require('babel-template')

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
  try {
    BODY
  } catch(e) {
    REPORT_ERROR(e, FILENAME, LINE_START, LINE_END, FUNCTION_NAME)
  }
`)

const wrapFunction = template(`{
  try {
    BODY
  } catch(e) {
    REPORT_ERROR(e, FILENAME, LINE_START, LINE_END, FUNCTION_NAME)
    throw e
  }
}`)

module.exports = {
  pre() {
    if (!this.opts.reportError) {
      throw new Error('babel-ie-catch: You must pass in the function name reporting error')
    }
  },
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
console.log(path.node)
        const programBody = wrapProgram({
          BODY: body,
          FILENAME: t.StringLiteral(state.file.opts.filename),
          FUNCTION_NAME: t.StringLiteral('top-level code'),
          LINE_START: t.NumericLiteral(0),
          LINE_END: t.NumericLiteral(1),
          REPORT_ERROR: t.identifier(state.opts.reportError),
        })
        path.replaceWith(t.Program([programBody]))
      }
    },
    Function: {
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
          FILENAME: t.StringLiteral(state.file.opts.filename),
          FUNCTION_NAME: t.StringLiteral(path.node.id ? path.node.id.name : 'annoymous function'),
          LINE_START: t.NumericLiteral(path.node.loc.start.line),
          LINE_END: t.NumericLiteral(path.node.loc.end.line),
          REPORT_ERROR: t.identifier(state.opts.reportError),
        }))
      }
    }
  }
}

