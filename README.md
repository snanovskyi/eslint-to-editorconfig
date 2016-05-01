# eslint-to-editorconfig
Module for transforming configuration from ESLint to EditorConfig format.

## Install
You need to install it against your configs(locally or globally).

```
$ npm install eslint-to-editorconfig
```

## Usage

- Run it in the same directory as your .eslintrc

  ```
  $ eslint-to-editorconfig
  ```

- You can also set custom path to your .eslintrc

  ```
  $ eslint-to-editorconfig ./folder/.eslintrc
  ```

## API
- **getEslintRules(filePath)**

  Returns ESLint rules. You can pass custom path to ESLint config.

- **convertRules(eslintRules)**

  Return EditorConfig rules.

## Example:

```javascript
// Require it
const transformer = require('eslint-to-editorconfig');
// Get ESLint rules
const eslintRules = transformer.getEslintRules();
// Transform them to EditorConfig rules
const rules = transformer.convertRules(eslintRules);
```

## Copyright
ISC © [Sergey Nanovsky](https://twitter.com/sun1x)
