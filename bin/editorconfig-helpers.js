const fs = require('fs');
const path = require('path');

const formatRules = editorConfigRules =>
  Object.keys(editorConfigRules)
    .map(key => `${key} = ${editorConfigRules[key]}`)
    .join('\n');

const printRules = editorConfigRules => {
  console.log(formatRules(editorConfigRules));
};

const saveRules = (editorConfigRules, cwd, editorConfigPath) => {
  const configPath = path.resolve(cwd, editorConfigPath);
  const output = ['[*.js]', formatRules(editorConfigRules)].join('\n');
  if (fs.existsSync(configPath)) {
    fs.appendFileSync(configPath, `\n${output}`);
    console.log(`EditorConfig rules added to ${configPath}`);
  } else {
    fs.writeFileSync(configPath, output);
    console.log(`${configPath} created`);
  }
};

module.exports = {
  printRules,
  saveRules,
};
