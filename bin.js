#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const transformer = require('./lib/transformer');

function rulesToString(editorConfigRules) {
  let config = '';
  const rules = Object.keys(editorConfigRules);
  rules.forEach((rule) => {
    config += `${rule} = ${editorConfigRules[rule]}\n`;
  });
  return config;
}

function getEslintRules(filePath) {
  let eslintRules;
  if (filePath !== undefined) {
    eslintRules = transformer.getEslintRules(path.resolve(filePath));
  } else {
    eslintRules = transformer.getEslintRules();
  }
  return eslintRules;
}

const eslintRules = getEslintRules(process.argv[2]);

if (eslintRules !== undefined) {
  const editorConfigRules = transformer.convertRules(eslintRules);
  let rules = rulesToString(editorConfigRules);

  fs.exists('.editorconfig', (exists) => {
    if (exists) {
      rules = `\n[*.js]\n${rules}`;
      fs.appendFile('.editorconfig', rules, (err) => {
        if (err) {
          return console.log(err.toString());
        }
        console.log('Properties were added to .editorconfig');
      });
    } else {
      rules = `root = true\n\n[*.js]\n${rules}`;
      fs.writeFile('.editorconfig', rules, (err) => {
        if (err) {
          return console.log(err.toString());
        }
        console.log('.editorconfig created');
      });
    }
  });
} else {
  console.log('No rules in .eslintrc');
}
