const rules = require('./rules');

const isDefined = value => typeof value !== 'undefined';

const transform = eslintRules => {
  if (typeof eslintRules !== 'object') {
    throw new TypeError('ESLint rules is not an object');
  }
  const indentStyle = rules.indentStyle(eslintRules.indent);
  const indentSize = rules.indentSize(eslintRules.indent);
  const trimTrailingWhitespace = rules.trimTrailingWhitespace(eslintRules['no-trailing-spaces']);
  const insertFinalNewline = rules.insertFinalNewline(eslintRules['eol-last']);
  const maxLineLength = rules.maxLineLength(eslintRules['max-len']);
  return Object.assign(
    {},
    isDefined(indentStyle) && { indent_style: indentStyle },
    isDefined(indentSize) && { indent_size: indentSize },
    isDefined(trimTrailingWhitespace) && { trim_trailing_whitespace: trimTrailingWhitespace },
    isDefined(insertFinalNewline) && { insert_final_newline: insertFinalNewline },
    isDefined(maxLineLength) && { max_line_length: maxLineLength }
  );
};

module.exports = transform;
