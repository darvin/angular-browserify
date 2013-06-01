#!/usr/bin/env node
require('shelljs/global');
var path = require('path')
  , fs = require('fs');
var BROWSERIFIED_TEST = path.join(__dirname, "test_browserified.js");
exec("./node_modules/.bin/browserify ./test/test.js", function(code, output){
  if (code!=0) {
    process.exit(code);
  }
  fs.writeFileSync(BROWSERIFIED_TEST, output);
  var phantomExec = exec("./node_modules/.bin/phantomjs "+BROWSERIFIED_TEST);


  if (phantomExec.code!=0) {
    process.exit(phantomExec.code);
  }


});

