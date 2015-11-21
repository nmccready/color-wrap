"use strict"

require('should')
const colorWrap = require('../index.js'),
  styles = require('colors/lib/styles'),
  util = require('util')

const each = (obj, cb) => {
  var key
  for (key in obj) {
    cb(obj[key], key)
  }
}

var consoleOutStr = '',
  logDeep = false

const logFns = ['info', 'warn', 'error', 'log']

logFns.forEach((fnName) => {
  var origFn = console[fnName]
  console[fnName] = function() {
    origFn.apply(null, arguments)
    logDeep = arguments[1] || false
    consoleOutStr += arguments[0]
  }
})

describe("color-wrap", () => {
  var logObjs = {
    console: console
  }

  each(logObjs, (logObj, logObjName) => {
    describe(logObjName, () => {
      beforeEach(() => {
        consoleOutStr = ''
        logDeep = false
        colorWrap(logObj)
      })
      logFns.forEach((logFnName) => {
        describe(logFnName, () => {
          each(styles, (color, colorName) => {
            describe(colorName, () => {
              it(colorName, () => {
                logObj[logFnName][colorName]("test!")
                consoleOutStr.should.be.eql(styles[colorName].open + "test!" + styles[colorName].close)
              })
              it(colorName + ' deep', () => {
                var thing = {id:1, haha: 'lol'}
                logObj[logFnName][colorName](thing, true)
                consoleOutStr.should.be.eql(styles[colorName].open + util.format(thing, true) + styles[colorName].close)
              })
            })
          })
        })
      })
    })
  })


})
