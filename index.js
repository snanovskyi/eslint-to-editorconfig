'use strict';

var CLIEngine = require('eslint').CLIEngine;
require('colors');

function indentStyle(value, rules, props) {
  var possible = ['tab', 'space'];
  if (possible.indexOf(value) > -1) {
    props['indent_style'] = value;
  } else if (rules.indent instanceof Array && rules.indent[0] > 0) {
    if (rules.indent[1] !== 'tab') {
      props['indent_style'] = 'space';
    } else {
      props['indent_style'] = 'tab';
    }
  } else if (rules.indent !== undefined && rules.indent > 0) {
    props['indent_style'] = 'space';
  }
}

function indentSize(value, rules, props) {
  value = parseInt(value, 10);
  if (!isNaN(value) && value > 0) {
    props['indent_size'] = value;
  } else if (rules.indent instanceof Array && rules.indent[0] > 0 &&
    rules.indent[1] !== 'tab') {
    props['indent_size'] = rules.indent[1];
  } else if (rules.indent !== undefined && rules.indent > 0) {
    props['indent_size'] = 4;
  }
}

function endOfLine(value, props) {
  var possible = ['lf', 'crlf', 'cr'];
  if (possible.indexOf(value) > -1) {
    props['end_of_line'] = value;
  }
}

function charset(value, props) {
  var possible = ['latin1', 'utf-8', 'utf-16be', 'utf-16le'];
  if (possible.indexOf(value) > -1) {
    props['charset'] = value;
  }
}

function trimTrailingWhitespace(value, rules, props) {
  var possible = ['true', 'false'];
  if (possible.indexOf(value) > -1) {
    props['trim_trailing_whitespace'] = value === 'true';
  } else if (rules['no-trailing-spaces'] !== undefined) {
    if (rules['no-trailing-spaces'] > 0) {
      props['trim_trailing_whitespace'] = true;
    } else {
      props['trim_trailing_whitespace'] = false;
    }
  }
}

function insertFinalNewline(value, rules, props) {
  var possible = ['true', 'false'];
  if (possible.indexOf(value) > -1) {
    props['insert_final_newline'] = value === 'true';
  } else if (rules['eol-last'] !== undefined) {
    if (rules['eol-last'] > 0) {
      props['insert_final_newline'] = true;
    } else {
      props['insert_final_newline'] = false;
    }
  }
}

function maxLineLength(value, rules, props) {
  value = parseInt(value, 10);
  if (!isNaN(value) && value > 0) {
    props['max_line_length'] = value;
  } else if (rules['max-len'] !== undefined && rules['max-len'][0] > 0) {
    props['max_line_length'] = rules['max-len'][1];
  }
}

function getESlintRules() {
  var cli = new CLIEngine();
  return cli.getConfigForFile().rules;
}

function rulesToProps(config, rules, props) {
  indentStyle(config['indent_style'], rules, props);
  indentSize(config['indent_size'], rules, props);
  endOfLine(config['end_of_line'], props);
  charset(config['charset'], props);
  trimTrailingWhitespace(config['trim_trailing_whitespace'], rules, props);
  insertFinalNewline(config['insert_final_newline'], rules, props);
  maxLineLength(config['max_line_length'], rules, props);
}

module.exports = function(config) {
  var props = {};
  var rules = getESlintRules();
  if (Object.keys(rules).length !== 0) {
    rulesToProps(config, rules, props);
    return props;
  } else {
    console.log('.eslintrc'.bold + ' not found or it has no "rules"'.red);
    return undefined;
  }
};
