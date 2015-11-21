var colors = require('colors'),
  ansiStyles = require('colors/lib/styles'),
  util = require('util'),
  defaultLevels = ['debug', 'info', 'warn', 'error', 'log']


module.exports = function(logger, levels) {
  levels = levels || defaultLevels

  function extLogFn(level) {
    var logFn = logger[level]
    //skip something if it does not exist
    if(!logFn || typeof logFn !== 'function')
      return
    Object.keys(ansiStyles).forEach(function(style) {
      logFn[style] = function() {
        var formatted = util.format.apply(util, arguments) //straight from node.js/console.js
        return logFn(colors[style](formatted))
      }
    })
  }

  var keyOrIndexLevel, lvl

  for (keyOrIndexLevel in levels) {
    lvl = levels instanceof Array ? levels[keyOrIndexLevel] : keyOrIndexLevel
    extLogFn(lvl)
  }

}
