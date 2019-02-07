const path = require('path');

describe('editorconfig-helpers', () => {
  let fs;
  let editorconfigHelpers;

  const rules = {
    indent_size: 2,
    indent_style: 'space',
    insert_final_newline: true,
    max_line_length: 100,
    trim_trailing_whitespace: true,
  };

  beforeEach(() => {
    ({ fs } = jest.requireActual('memfs'));
    jest.doMock('fs', () => fs);
    editorconfigHelpers = jest.requireActual('../../bin/editorconfig-helpers');
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('printRules', () => {
    it('should print rules to stdout', () => {
      const spy = jest.spyOn(console, 'log');
      editorconfigHelpers.printRules(rules);
      expect(spy.mock.calls).toMatchSnapshot();
      spy.mockRestore();
    });
  });

  describe('saveRules', () => {
    it('should append rules if config file exists', () => {
      const configPath = '/.editorconfig';
      fs.writeFileSync(configPath, 'root = true');
      editorconfigHelpers.saveRules(rules, path.dirname(configPath), path.basename(configPath));
      const result = fs.readFileSync(configPath).toString();
      expect(result).toMatchSnapshot();
    });

    it('should create new file if config file does not exist', () => {
      const configPath = '/.editorconfig';
      editorconfigHelpers.saveRules(rules, path.dirname(configPath), path.basename(configPath));
      const result = fs.readFileSync(configPath).toString();
      expect(result).toMatchSnapshot();
    });

    it('should correctly handle cwd', () => {
      const cwd = '/folder';
      const configPath = '.editorconfig';
      fs.mkdirSync(cwd);
      editorconfigHelpers.saveRules(rules, cwd, configPath);
      const result = fs.readFileSync(path.join(cwd, configPath)).toString();
      expect(result).toMatchSnapshot();
    });
  });
});
