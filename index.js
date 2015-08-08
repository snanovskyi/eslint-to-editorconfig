var fs = require('fs');
require('colors');

function indentStyle (rules, props) {
  if (rules.indent instanceof Array && rules.indent[0] > 0) {
    if (rules.indent[1] !== 'tab') {
      props.push('indent_style = space');
      indentSize(rules.indent[1], props);
    } else {
      props.push('indent_style = tab');
    }
  } else if (rules.indent > 0) {
    properties.push('indent_style = space');
    indentSize(4, props);
  }
}

function indentSize (value, props) {
  props.push('indent_size = ' + value);
}

function endOfLine(value, props) {
  props.push('end_of_line = ' + value);
}

function charset(value, props) {
  props.push('charset = ' + value);
}

function trimTrailingWhitespace (rules, props) {
  if (rules['no-trailing-spaces'] > 0) {
    props.push('trim_trailing_whitespace = true');
  }
}

function insertFinalNewline (rules, props) {
  if (rules['eol-last'] > 0) {
    props.push('insert_final_newline = true');
  }
}

function maxLineLength (rules, props) {
  if (rules['max-len'][0] > 0) {
    props.push('max_line_length = ' + rules['max-len'][1]);
  }
}

function getESlintRules (path) {
  if (fs.existsSync(path)) {
    var eslintrcFile = fs.readFileSync(path);
    try {
      var eslint = JSON.parse(eslintrcFile);
      if (eslint.rules !== undefined) {
        return eslint.rules;
      } else {
        console.log(path.bold + ' has no "rules"'.red);
      }
    } catch (e) {
      console.log(e.toString().red);
    }
  } else {
    console.log(path.bold + ' not found'.red);
  }
}

function rulesToProps (rules, props) {
  indentStyle(rules, props);
  endOfLine('lf', props);
  charset('utf-8', props);
  trimTrailingWhitespace(rules, props);
  insertFinalNewline(rules, props);
  maxLineLength(rules, props);
}

function propsToConfig (props) {
  var editorconfig = 'root = true\n\n[*]\n';
  props.forEach(function(prop) {
    editorconfig += prop + '\n';
  });
  return editorconfig;
}

function createEditorConfig (path, props) {
  fs.writeFile(path, propsToConfig (props), function (err) {
    if (err) {
      return console.log(err.toString().red);
    }
    console.log(path.bold + ' created'.green);
  });
}

module.exports = function (eslintrcPath, editorconfigPath) {
  var props = [];
  var rules = getESlintRules(eslintrcPath);
  if (rules !== undefined) {
    rulesToProps(rules, props);
    createEditorConfig(editorconfigPath, props);
  }
};
