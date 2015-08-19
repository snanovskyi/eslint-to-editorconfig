#!/usr/bin/env node
'use strict';

var eslitToEditorConfig = require('./index.js');
var fs = require('fs');
require('colors');

var config = {
  'indent_style': undefined,
  'indent_size': undefined,
  'end_of_line': undefined,
  'charset': undefined,
  'trim_trailing_whitespace': undefined,
  'insert_final_newline': undefined,
  'max_line_length': undefined,
  'root': 'true',
  'format': 'js'
};

process.argv.forEach(function(argument) {
  var keys = Object.keys(config);
  for (var i in keys) {
    if (argument.indexOf(keys[i]) > -1) {
      config[keys[i]] = argument.split('=')[1];
      break;
    }
  }
});

function propsToConfig(props, config) {
  var editorconfig = '';
  if (config['root'] === 'true') {
    editorconfig += 'root = true\n\n';
  }
  if (config['format'] === '*') {
    editorconfig += '[*]\n';
  } else {
    editorconfig += '[*.' + config['format'] + ']\n';
  }
  var keys = Object.keys(props);
  keys.forEach(function(key) {
    editorconfig += key + ' = ' + props[key] + '\n';
  });
  return editorconfig;
}

function createEditorConfig(editorconfig) {
  fs.writeFile('.editorconfig', editorconfig, function (err) {
    if (err) {
      return console.log(err.toString().red);
    }
    console.log('.editorconfig'.bold + ' created'.green);
  });
}

var props = eslitToEditorConfig(config);

if (props !== undefined) {
  var editorconfig = propsToConfig(props, config);
  console.log('\n' + editorconfig);
  createEditorConfig(editorconfig);
}
