const transform = require('../../lib/transform');

describe('transform', () => {
  it('should return EditorConfig rules', () => {
    const eslintRules = {
      indent: 'error',
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      'max-len': 'error',
    };
    const result = transform(eslintRules);
    expect(result).toMatchSnapshot();
  });

  it('should return rules that are defined', () => {
    const eslintRules = {
      indent: 'error',
      'max-len': 'error',
    };
    const result = transform(eslintRules);
    expect(result).toMatchSnapshot();
  });

  it("should throw 'TypeError' if ESLint rules is not an object", () => {
    const error1 = () => transform(undefined);
    const error2 = () => transform(123);
    const error3 = () => transform('123');
    const error4 = () => transform(() => {});
    const error5 = () => transform(Symbol('123'));
    expect(error1).toThrow(TypeError);
    expect(error2).toThrow(TypeError);
    expect(error3).toThrow(TypeError);
    expect(error4).toThrow(TypeError);
    expect(error5).toThrow(TypeError);
  });
});
