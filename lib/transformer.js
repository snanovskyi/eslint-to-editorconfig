'use strict';

const CLIEngine = require('eslint').CLIEngine;
const cli = new CLIEngine();

function indentStyle(rules) {
  if (rules['indent'] instanceof Array && rules.indent[0] > 0) {
    if (rules['indent'][1] === 'tab') {
      return 'tab';
    } else {
      return 'space';
    }
  } else if (rules['indent'] !== undefined && rules['indent'] > 0) {
    return 'space';
  }
  return undefined;
}

function indentSize(rules) {
  if (rules['indent'] instanceof Array && rules['indent'][0] > 0 && rules['indent'][1] !== 'tab') {
    return rules['indent'][1];
  } else if (rules['indent'] !== undefined && rules['indent'] > 0) {
    return 4;
  }
  return undefined;
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

function checkRuleValue(rules, ruleName, ruleValue) {
  if (ruleValue !== undefined) {
    rules[ruleName] = ruleValue;
  }
}

module.exports = {
  getEslintRules: (filePath) => {
    let rules = cli.getConfigForFile(filePath).rules;
    if (Object.keys(rules).length !== 0) {
      return rules;
    }
    return undefined;
  },
  convertRules: (eslintRules) => {
    let rules = {};
    if (eslintRules !== undefined) {
      checkRuleValue(rules, 'indent_style', indentStyle(eslintRules));
      checkRuleValue(rules, 'indent_size', indentSize(eslintRules));
      checkRuleValue(rules, 'trim_trailing_whitespace', trimTrailingWhitespace(eslintRules));
      checkRuleValue(rules, 'insert_final_newline', insertFinalNewline(eslintRules));
      checkRuleValue(rules, 'max_line_length', maxLineLength(eslintRules));
    }
    return rules;
  }
};
