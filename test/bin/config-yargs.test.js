const configYargs = require('../../bin/config-yargs');

describe('yargs', () => {
  let yargs;

  beforeEach(() => {
    yargs = jest.requireActual('yargs');
    configYargs(yargs);
  });

  afterEach(() => {
    jest.resetModules();
  });

  test("'config' positional argument", () => {
    const argv = ['./.eslintrc.json'];
    const result = yargs.parse(argv);
    expect(result.config).toBe(argv[0]);
  });

  test('default value for each option', () => {
    const defaults = {
      output: '.editorconfig',
      cwd: process.cwd(),
      stdout: false,
    };
    const argv = [];
    const result = yargs.parse(argv);
    expect(result.output).toBe(defaults.output);
    expect(result.o).toBe(defaults.output);
    expect(result.cwd).toBe(defaults.cwd);
    expect(result.stdout).toBe(defaults.stdout);
  });

  test("'output' option", () => {
    const argv1 = ['--output', './.editorconfig'];
    const result1 = yargs.parse(argv1);
    const argv2 = ['-o', './.editorconfig'];
    const result2 = yargs.parse(argv2);
    expect(result1.output).toBe(argv1[1]);
    expect(result1.o).toBe(argv1[1]);
    expect(result2.output).toBe(argv2[1]);
    expect(result2.o).toBe(argv2[1]);
  });

  test("'cwd' option", () => {
    const argv = ['--cwd', '/project'];
    const result = yargs.parse(argv);
    expect(result.cwd).toBe(argv[1]);
  });

  test("'stdout' option", () => {
    const argv = ['--stdout'];
    const result = yargs.parse(argv);
    expect(result.stdout).toBeTruthy();
  });
});
