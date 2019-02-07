#!/usr/bin/env node

const path = require('path');
const yargs = require('yargs');

const transform = require('../lib');
const configYargs = require('./config-yargs');
const editorconfigHelpers = require('./editorconfig-helpers');
const eslintHelpers = require('./eslint-helpers');

configYargs(yargs);

const { argv } = yargs;
const cwd = path.resolve(argv.cwd);

const eslintConfigPath = eslintHelpers.getConfigPath(cwd, argv.config);
const cliEngine = eslintHelpers.createCliEngine(cwd, eslintConfigPath);
const eslintRules = eslintHelpers.getRules(cliEngine, eslintConfigPath);

const editorConfigRules = transform(eslintRules);
if (argv.stdout) {
  editorconfigHelpers.printRules(editorConfigRules);
} else {
  editorconfigHelpers.saveRules(editorConfigRules, cwd, argv.output);
}
