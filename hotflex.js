#!/usr/bin/env node
var exec = require("child_process").exec;
var fs = require("fs");

var watchedFiles = [];
var configuration = {}

function notify(icon, title, message) {
  exec("notify-send --icon \"" + icon + "\" \"" + title +"\" \"" + message + "\" ");
}

function watchFiles() {
  var findSourceFiles = exec("find " + configuration.sourceFolder + " -name \"*.*\"");
  findSourceFiles.stdout.on("data", function(files){
    files = files.split("\n");
    for( var i = 0; i < files.length; i++ ) {
      if( watchedFiles.indexOf(files[i]) == -1 ) {
        fs.watchFile(files[i], {interval: 100}, function(previous, current) {
          if(previous.mtime != current.mtime) {
            build();
            watchFiles();
          }
        });
      }
    }
  });
}

function build() {
  var command = "mxmlc " + configuration.source + " -output " + configuration.target;
  if( configuration.lib )  command += " -library-path+=" + configuration.lib
  var build = exec(command);
  build.stdout.on("data", function(data) {
    console.log(data);
    if( data.indexOf(".swf") != -1 ) {
      notify("reload", "Build Successful", data);
    }
  });
  build.stderr.on("data", function(data) {
    console.log(data);
    notify("error", "Error", data);
  });
}

function configure() {
  configuration = JSON.parse(fs.readFileSync("./hotflex.json", "utf-8"));
  if( configuration.source && configuration.sourceFolder && configuration.target ) {
    watchFiles();
    build();
  } else {
    console.log("Error: Invalid hotflex.json");
    notify("error", "Error", "Invalid hotflex.json");
  }
}

configure();

