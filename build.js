#!/usr/bin/env node
require('shelljs/global');
var async = require('async')
  , fs = require("fs")
  , path = require('path');

var ANGULAR_PATH = "./node_modules/AngularJS/",
    OUTPUT_PATH = path.join(__dirname, "lib");
mkdir(OUTPUT_PATH);
cd(ANGULAR_PATH);

exec("npm install");

//gross hack - we have to use the same grunt as Angular/lib/grunt/utils
var grunt = require('./node_modules/AngularJS/node_modules/grunt');

var gruntfile = require(ANGULAR_PATH+'./Gruntfile')
  , packageJson = require(ANGULAR_PATH+'./package');

var OUTPUT = packageJson.main;
gruntfile(grunt);


var util = require(ANGULAR_PATH+'./lib/grunt/utils');


var builds = grunt.config('build');

builds = Object.keys(builds).map(function(key){ return builds[key]; });
async.forEach(builds, util.build.bind(util), function(err) {
  
  async.forEach(builds, function(build, callback){
    var srcFileName =  build.dest;
    cp("-f", srcFileName, path.join(OUTPUT_PATH, path.basename(build.dest)));
    console.log("File "+build.dest+" copied");
    callback(null);
  }, function(err) {
      console.log("Done!");

  });
});


