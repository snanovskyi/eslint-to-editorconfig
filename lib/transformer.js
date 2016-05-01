'use strict';

const CLIEngine = require('eslint').CLIEngine;
const cli = new CLIEngine();

function indentStyle(rules) {
  let result = undefined;
  if (rules['indent'] instanceof Array && rules.indent[0] > 0) {
    if (rules['indent'][1] === 'tab') {
      result = 'tab';
    } else {
      result = 'space';
    }
  } else if (rules['indent'] !== undefined && rules['indent'] > 0) {
    result = 'space';
  }
  return result;
}

function indentSize(rules) {
  let result = undefined;
  if (rules['indent'] instanceof Array && rules['indent'][0] > 0 && rules['indent'][1] !== 'tab') {
    result = rules['indent'][1];
  } else if (rules['indent'] !== undefined && rules['indent'] > 0) {
    result = 4;
  }
  return result;
}

function trimTrailingWhitespace(rules) {
  return rules['no-trailing-spaces'] !== undefined ? rules['no-trailing-spaces'] > 0 : undefined;
}

function insertFinalNewline(rules) {
  return rules['eol-last'] !== undefined ? rules['eol-last'] > 0 : undefined;
}

function maxLineLength(rules) {
  return rules['max-len'] !== undefined ? rules['max-len'][1] : undefined;
}

function appendRuleValue(rules, ruleName, ruleValue) {
  if (ruleValue !== undefined) {
    rules[ruleName] = ruleValue;
  }
}

module.exports = {
  getEslintRules: (filePath) => {
    let rules = cli.getConfigForFile(filePath).rules;
    if (Object.keys(rules).length === 0) {
      rules = undefined;
    }
    return rules;
  },
  convertRules: (eslintRules) => {
    let rules = {};
    if (eslintRules !== undefined) {
      appendRuleValue(rules, 'indent_style', indentStyle(eslintRules));
      appendRuleValue(rules, 'indent_size', indentSize(eslintRules));
      appendRuleValue(rules, 'trim_trailing_whitespace', trimTrailingWhitespace(eslintRules));
      appendRuleValue(rules, 'insert_final_newline', insertFinalNewline(eslintRules));
      appendRuleValue(rules, 'max_line_length', maxLineLength(eslintRules));
    }
    return rules;
  }
};
