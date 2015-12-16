'use strict'

module.exports = function(babel) {
  var t = babel.types
  var wrapInTryCatch = function(functionBody, printError) {
    if (!functionBody.body.length) {
      return functionBody
    }

    var tryBlock = t.TryStatement(functionBody)
    var catchBlock = t.CatchClause(t.Identifier('e'))
    var loc = functionBody.body[0].loc
    catchBlock.body = t.BlockStatement([
      printError ?
        t.CallExpression(t.Identifier('console.log'), [t.Identifier('e')]) :
        t.ThrowStatement(t.Identifier('e.message ? [{location: "lines ' + loc.start.line + ' - ' + loc.end.line + '", message: e.message}] : e.concat({location: "lines ' + loc.start.line + ' - ' + loc.end.line + '"})'))
    ])

    tryBlock.handler = catchBlock

    return t.BlockStatement([tryBlock])
  }

  return new babel.Transformer('ie-catch', {
    Program: function(node, parent) {
      if (!node.body.length) {
        return
      }
      var program = t.Program()
      program.body = wrapInTryCatch(t.BlockStatement(node.body), true).body
      return program

      var fe = t.FunctionExpression(
        t.Identifier(''),
        [],
        t.BlockStatement(node.body)
      )
      var iife = t.CallExpression(fe, [])
      node.body = [iife]
      return node
    },
    /*BlockStatement: function(node) {
      if (!/^Function/.test(this.parentPath.type)) {
        return
      }
      if (!node.body.length) {
        return
      }
      return wrapInTryCatch(node)
    }*/
    FunctionDeclaration: function(node) {
      node.body = wrapInTryCatch(node.body)
      return node
    },
    FunctionExpression: function(node) {
      node.body = wrapInTryCatch(node.body)
      return node
    }
  })
}
