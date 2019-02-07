const validSeverity = severity => {
  const validNumber = typeof severity === 'number' && severity >= 0 && severity <= 2;
  const validString =
    typeof severity === 'string' &&
    (severity === 'off' || severity === 'warn' || severity === 'error');
  return validNumber || validString;
};

const validRule = rule =>
  typeof rule === 'undefined' ||
  (Array.isArray(rule) && validSeverity(rule[0])) ||
  validSeverity(rule);

const ruleEnabled = severity => {
  if (severity > 0 && severity < 3) {
    return true;
  }
  if (severity === 'warn' || severity === 'error') {
    return true;
  }
  return false;
};

const throwUnlessValidRule = rule => {
  if (!validRule(rule)) {
    throw new TypeError(`Invalid rule ${JSON.stringify(rule)}`);
  }
};

const DEFAULT_INDENT_STYLE = 'space';

const indentStyle = rule => {
  throwUnlessValidRule(rule);
  if (Array.isArray(rule) && ruleEnabled(rule[0])) {
    if (rule[1] === 'tab') {
      return 'tab';
    }
    if (typeof rule[1] === 'number') {
      return 'space';
    }
    return DEFAULT_INDENT_STYLE;
  }
  if (ruleEnabled(rule)) {
    return DEFAULT_INDENT_STYLE;
  }
  return undefined;
};

const DEFAULT_INDENT_SIZE = 4;

function indentSize(rule) {
  throwUnlessValidRule(rule);
  if (Array.isArray(rule) && ruleEnabled(rule[0])) {
    if (rule[1] === 'tab') {
      return undefined;
    }
    if (typeof rule[1] === 'number') {
      return rule[1];
    }
    return DEFAULT_INDENT_SIZE;
  }
  if (ruleEnabled(rule)) {
    return DEFAULT_INDENT_SIZE;
  }
  return undefined;
}

const trimTrailingWhitespace = rule => {
  throwUnlessValidRule(rule);
  if (Array.isArray(rule)) {
    return ruleEnabled(rule[0]);
  }
  if (typeof rule !== 'undefined') {
    return ruleEnabled(rule);
  }
  return undefined;
};

const insertFinalNewline = rule => {
  throwUnlessValidRule(rule);
  if (Array.isArray(rule) && ruleEnabled(rule[0])) {
    if (rule[1] === 'never') {
      return false;
    }
    return true;
  }
  if (ruleEnabled(rule)) {
    return true;
  }
  return undefined;
};

const DEFAULT_MAX_LINE_LENGTH = 80;

const maxLineLength = rule => {
  throwUnlessValidRule(rule);
  if (Array.isArray(rule) && ruleEnabled(rule[0])) {
    if (typeof rule[1] === 'number') {
      return rule[1];
    }
    if (typeof rule[1] === 'object' && typeof rule[1].code === 'number') {
      return rule[1].code;
    }
    return DEFAULT_MAX_LINE_LENGTH;
  }
  if (ruleEnabled(rule)) {
    return DEFAULT_MAX_LINE_LENGTH;
  }
  return undefined;
};

module.exports = {
  DEFAULT_INDENT_STYLE,
  indentStyle,
  DEFAULT_INDENT_SIZE,
  indentSize,
  trimTrailingWhitespace,
  insertFinalNewline,
  DEFAULT_MAX_LINE_LENGTH,
  maxLineLength,
};
