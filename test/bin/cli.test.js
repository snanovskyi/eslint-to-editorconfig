const fs = require('fs');
const path = require('path');
const execa = require('execa');

describe('cli', () => {
  const { cwd } = process;
  let cli;
  const eslintConfigPath = path.join(__dirname, '.eslintrc.json');
  const eslintConfig = {
    rules: {
      indent: ['error', 2],
      'no-trailing-spaces': 'warn',
      'eol-last': 'error',
      'max-len': ['warn', 80],
    },
  };
  const editorconfigPath = path.join(__dirname, '.editorconfig');

  beforeAll(() => {
    process.cwd = () => path.join(__dirname, '..', '..');
    cli = path.join(process.cwd(), 'bin', 'cli.js');
  });

  afterAll(() => {
    process.cwd = cwd;
  });

  beforeEach(() => {
    fs.writeFileSync(eslintConfigPath, JSON.stringify(eslintConfig));
  });

  afterEach(() => {
    fs.unlinkSync(eslintConfigPath);
    if (fs.existsSync(editorconfigPath)) {
      fs.unlinkSync(editorconfigPath);
    }
  });

  it("should create new '.editorconfig' file if does not exist", () => {
    execa.sync(cli, [eslintConfigPath, '--output', editorconfigPath]);
    const editorconfig = fs.readFileSync(editorconfigPath).toString();
    expect(editorconfig).toMatchSnapshot();
  });

  it("should append rules if '.editorconfig' already exists", () => {
    fs.writeFileSync(editorconfigPath, 'root = true');
    execa.sync(cli, [eslintConfigPath, '--output', editorconfigPath]);
    const editorconfig = fs.readFileSync(editorconfigPath).toString();
    expect(editorconfig).toMatchSnapshot();
  });

  it("should handle 'cwd' with absolute 'config' and 'output'", () => {
    execa.sync(cli, [eslintConfigPath, '--output', editorconfigPath, '--cwd', process.cwd()]);
    const editorconfig = fs.readFileSync(editorconfigPath).toString();
    expect(editorconfig).toMatchSnapshot();
  });

  it('should handle "stdout" option', () => {
    const { stdout } = execa.sync(cli, [
      eslintConfigPath,
      '--output',
      editorconfigPath,
      '--stdout',
    ]);
    const editorconfigExists = fs.existsSync(editorconfigPath);
    expect(editorconfigExists).toBeFalsy();
    expect(stdout).toMatchSnapshot();
  });
});
