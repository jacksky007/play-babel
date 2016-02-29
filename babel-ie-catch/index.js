'use strict'

const namedFunction = require('babel-helper-function-name')
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
    REPORT_ERROR(e, FILENAME, FUNCTION_NAME, LINE_START, LINE_END)
  }
`)

const wrapFunction = template(`{
  try {
    BODY
  } catch(e) {
    REPORT_ERROR(e, FILENAME, FUNCTION_NAME, LINE_START, LINE_END)
    throw e
  }
}`)

const markErrorResolved = template(`
  ERROR._r = true
`)

const markErrorUnresolved = template(`
  delete ERROR._r
`)

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

        const programBody = wrapProgram({
          BODY: body,
          FILENAME: t.StringLiteral(state.file.opts.filename),
          FUNCTION_NAME: t.StringLiteral('top-level code'),
          LINE_START: t.NumericLiteral(path.node.loc.start.line),
          LINE_END: t.NumericLiteral(path.node.loc.end.line),
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

        var functionName = 'anonymous function'
        if (path.node.type === 'FunctionDeclaration') {
          functionName = path.node.id.name
        } else {
          var newFunction = namedFunction(path)
          if (newFunction) {
            functionName = newFunction.id.name
          }
        }

        path.get('body').replaceWith(wrapFunction({
          BODY: body,
          FILENAME: t.StringLiteral(state.file.opts.filename),
          FUNCTION_NAME: t.StringLiteral(functionName),
          LINE_START: t.NumericLiteral(path.node.loc.start.line),
          LINE_END: t.NumericLiteral(path.node.loc.end.line),
          REPORT_ERROR: t.identifier(state.opts.reportError),
        }))
      }
    },
    CatchClause: {
      enter(path, state) {
        if (state.end) {
          return
        }

        // variable name of error caught
        var errorVariableName = path.node.param.name

        path.node.body.body.unshift(
          markErrorResolved({
            ERROR: t.Identifier(errorVariableName)
          })
        )
      }
    },
    ThrowStatement: {
      enter(path, state) {
        if (state.end) {
          return
        }

        var error = path.node.argument
        if (error.type === 'Identifier') {
          path.insertBefore(
            markErrorUnresolved({
              ERROR: t.Identifier(error.name)
            })
          )
        }
      }
    },
  }
}

