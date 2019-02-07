const path = require('path');

describe('eslint-helpers', () => {
  const { exit } = process;

  beforeEach(() => {
    process.exit = jest.fn();
  });

  afterEach(() => {
    process.exit = exit;
  });

  describe('getConfigPath', () => {
    let fs;
    let eslintHelpers;

    beforeEach(() => {
      ({ fs } = jest.requireActual('memfs'));
      jest.doMock('fs', () => fs);
      eslintHelpers = jest.requireActual('../../bin/eslint-helpers');
    });

    afterEach(() => {
      jest.resetModules();
    });

    it("should return 'undefined' if 2nd argument is not defined", () => {
      const result = eslintHelpers.getConfigPath('/folder');
      expect(result).toBeUndefined();
    });

    it('should return absolute config path', () => {
      const cwd = '/folder';
      const config = '.eslintrc.json';
      const absolutePath = path.join(cwd, config);
      fs.mkdirSync(cwd);
      fs.writeFileSync(absolutePath);
      const result = eslintHelpers.getConfigPath(cwd, config);
      expect(result).toBe(absolutePath);
    });

    it('should exit with code 1 if config does not exist', () => {
      eslintHelpers.getConfigPath('/folder', '.eslintrc.json');
      expect(process.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('createCliEngine', () => {
    let importFrom;
    let eslintHelpers;

    beforeEach(() => {
      jest.doMock('import-from');
      importFrom = jest.requireMock('import-from');
      eslintHelpers = jest.requireActual('../../bin/eslint-helpers');
    });

    afterEach(() => {
      jest.resetModules();
    });

    it("should return an instance of 'CLIEngine'", () => {
      function CLIEngine() {}
      importFrom.mockImplementation(() => ({ CLIEngine }));
      const cwd = '/';
      const configPath = '.eslintrc.json';
      const result1 = eslintHelpers.createCliEngine(cwd);
      const result2 = eslintHelpers.createCliEngine(cwd, configPath);
      expect(result1).toBeInstanceOf(CLIEngine);
      expect(result2).toBeInstanceOf(CLIEngine);
    });

    it("should set 'cwd' and 'configFile' if 2nd parameter is defined", () => {
      const CLIEngine = jest.fn();
      importFrom.mockImplementation(() => ({ CLIEngine }));
      const cwd = '/';
      const configFile = '.eslintrc.json';
      eslintHelpers.createCliEngine(cwd, configFile);
      expect(CLIEngine).toHaveBeenCalledWith({ cwd, configFile });
    });

    it("should set 'cwd' if 2nd parameter is not defined", () => {
      const CLIEngine = jest.fn();
      importFrom.mockImplementation(() => ({ CLIEngine }));
      const cwd = '/';
      eslintHelpers.createCliEngine(cwd);
      expect(CLIEngine).toHaveBeenCalledWith({ cwd });
    });

    it('should exit with code 1 if ESLint was not found', () => {
      importFrom.mockImplementation(() => {
        throw new Error();
      });
      eslintHelpers.createCliEngine('/');
      expect(process.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('getRules', () => {
    let eslintHelpers;

    beforeEach(() => {
      eslintHelpers = jest.requireActual('../../bin/eslint-helpers');
    });

    afterEach(() => {
      jest.resetModules();
    });

    it('should return ESLint rules', () => {
      const eslintRules = {
        indent: 'error',
        'no-trailing-spaces': 'error',
        'eol-last': 'error',
        'max-len': 'error',
      };
      const cliEngine = {
        getConfigForFile: () => ({ rules: eslintRules }),
      };
      const result = eslintHelpers.getRules(cliEngine);
      expect(result).toEqual(eslintRules);
    });

    it('should exit with code 1 if ESLint configuration is invalid', () => {
      const cliEngine = {
        getConfigForFile: () => {
          throw new Error();
        },
      };
      eslintHelpers.getRules(cliEngine);
      expect(process.exit).toHaveBeenCalledWith(1);
    });
  });
});
