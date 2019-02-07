# eslint-to-editorconfig

[![npm](https://img.shields.io/npm/v/eslint-to-editorconfig.svg)](https://www.npmjs.com/package/eslint-to-editorconfig)
[![Build Status](https://img.shields.io/travis/sun1x/eslint-to-editorconfig.svg)](https://travis-ci.org/sun1x/eslint-to-editorconfig)
[![License](https://img.shields.io/npm/l/eslint-to-editorconfig.svg)](LICENSE)

Module for transforming configuration from ESLint to EditorConfig format.
> Note that minimum supported version of `eslint` is `2.0.0`.

## Usage
You need to install `eslint-to-editorconfig` globally if you use npm 5.1 or earlier:
```sh
npm install -g eslint-to-editorconfig
cd project
eslint-to-editorconfig
```
Otherwise you can use [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b):
```sh
cd project
npx eslint-to-editorconfig
```
> For a complete list of available options run:
> ```sh
> eslint-to-editorconfig --help
>  ```

## API
```js
const transform = require('eslint-to-editorconfig');

// Take ESLint rules
const eslintRules = {
  indent: 'error',
  'no-trailing-spaces': 'error',
  'eol-last': 'error',
  'max-len': 'error',
};

// Transform them into EditorConfig rules
const editorConfigRules = transform(eslintRules);
console.log(editorConfigRules);
```

## License
This library is released under the [ISC license](LICENSE).
