



var test = require('tape');
var angularBrowserify = require('../');
var angularReq = function(moduleName) {
  return function(){ angularBrowserify.module(moduleName); };
};
test('Angular browserify packaging', function (t) {
  
  t.ok(angularBrowserify, "Angular must be defined");
  t.ok(angular, "Angular global variable must be defined");
  t.equal(angular, angularBrowserify, "Angular export must be equal global variable");
  t.ok(window.angular, "window.angular global variable must be defined");
  t.end();
});



test('ngResource packaging', function (t) {
  t.throws(angularReq('ngResource'), "", "Should not find ngResource before require");
  require('../resource');
  t.doesNotThrow(angularReq('ngResource'), "", "Should find ngResource after require");
  t.end();
});

test('ngCookies packaging', function (t) {
  t.throws(angularReq('ngCookies'), "", "Should not find ngCookies before require");
  require('../cookies');
  t.doesNotThrow(angularReq('ngCookies'), "", "Should find ngCookies after require");
  t.end();
});


test('ngMobile packaging', function (t) {
  t.throws(angularReq('ngMobile'), "", "Should not find ngMobile before require");
  require('../mobile');
  t.doesNotThrow(angularReq('ngMobile'), "", "Should find ngMobile after require");
  t.end();
});




test('ngSanitize packaging', function (t) {
  t.throws(angularReq('ngSanitize'), "", "Should not find ngSanitize before require");
  require('../sanitize');
  t.doesNotThrow(angularReq('ngSanitize'), "", "Should find ngSanitize after require");
  t.end();
});




test('ngMock packaging', function (t) {
  t.throws(angularReq('ngMock'), "", "Should not find ngMock before require");
  require('../mocks');
  t.doesNotThrow(angularReq('ngMock'), "", "Should find ngMock after require");
  t.ok(angular.mock);

  t.end();
});

