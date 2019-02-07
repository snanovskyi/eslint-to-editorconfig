const fs = require('fs');
const path = require('path');
const importFrom = require('import-from');

const getConfigPath = (cwd, eslintConfigPath) => {
  if (typeof eslintConfigPath === 'string') {
    const configPath = path.resolve(cwd, eslintConfigPath);
    if (fs.existsSync(configPath)) {
      return configPath;
    }
    console.log(`Cannot find ESLint config in ${path.dirname(configPath)}`);
    return process.exit(1);
  }
  return undefined;
};

const createCliEngine = (cwd, eslintConfigPath) => {
  try {
    const { CLIEngine } = importFrom(cwd, 'eslint');
    if (typeof eslintConfigPath === 'string') {
      return new CLIEngine({ cwd, configFile: eslintConfigPath });
    }
    return new CLIEngine({ cwd });
  } catch (error) {
    console.log(`Cannot find ESLint in ${cwd}`);
    return process.exit(1);
  }
};

const getRules = cliEngine => {
  try {
    const { rules } = cliEngine.getConfigForFile();
    return rules;
  } catch (error) {
    console.log('ESLint configuration is invalid');
    return process.exit(1);
  }
};

module.exports = {
  getConfigPath,
  createCliEngine,
  getRules,
};
