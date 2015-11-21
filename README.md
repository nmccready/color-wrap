# color-wrap

To extend a logger to have a simple dsl to access the wonderful world of [colors](https://www.npmjs.com/package/colors)

## Install
`var colorWrap = require("color-wrap")`

## Use

```
colorWrap(console);
console.log.cyan('Test!')
console.error.cyan('Test!')

//Winston
var logger = require('../yourLoggerSomewhere')
var myCustomLevels = {
  levels:
    route: 0,
    sql: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5
}
colorWrap(logger, myCustomLevels.levels)
```

## API
**colorWrap(loggerObject, \[levels (Object || Array)])**
