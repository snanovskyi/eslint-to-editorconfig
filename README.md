# eslint-to-editorconfig

Module for transforming configuration from ESLint to EditorConfig format.

## Install

```
$ npm install --global eslint-to-editorconfig
```

## Usage

Run it in the same directory as your .eslintrc

```
$ eslint-to-editorconfig
```

## API

Basic workflow example:

```javascript
//Require it
const transformer = require('eslint-to-editorconfig');

//Get ESLint rules
const eslintRules = transformer.getEslintRules();

//Transform them to EditorConfig rules
const rules = transformer.convertRules(eslintRules);
```

#### getEslintRules(filePath)

Returns ESLint rules. You can pass custom path to ESLint config.

#### convertRules(eslintRules)

Return EditorConfig rules.

## Credits

[@sun1x](https://twitter.com/sun1x)

## License

ISC
