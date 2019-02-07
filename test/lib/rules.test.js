const rules = require('../../lib/rules');

describe('rules', () => {
  const testInvalidInput = ruleFunc => {
    const types = [123, '123', true, {}, () => {}, Symbol('123')];
    types.forEach(type => {
      const error1 = () => ruleFunc(type);
      const error2 = () => ruleFunc([type]);
      expect(error1).toThrow(TypeError);
      expect(error2).toThrow(TypeError);
    });
  };

  describe('indentStyle', () => {
    it("should throw 'TypeError' if rule is invalid", () => {
      testInvalidInput(rules.indentStyle);
    });

    it("should return 'undefined' if rule is missing", () => {
      expect(rules.indentStyle()).toBeUndefined();
    });

    it("should return 'undefined' if rule is disabled", () => {
      expect(rules.indentStyle(0)).toBeUndefined();
      expect(rules.indentStyle('off')).toBeUndefined();
      expect(rules.indentStyle([0])).toBeUndefined();
      expect(rules.indentStyle(['off'])).toBeUndefined();
    });

    it("should return 'DEFAULT_INDENT_STYLE' if rule is enabled and not set", () => {
      expect(rules.indentStyle(1)).toBe(rules.DEFAULT_INDENT_STYLE);
      expect(rules.indentStyle('warn')).toBe(rules.DEFAULT_INDENT_STYLE);
      expect(rules.indentStyle(2)).toBe(rules.DEFAULT_INDENT_STYLE);
      expect(rules.indentStyle('error')).toBe(rules.DEFAULT_INDENT_STYLE);
      expect(rules.indentStyle([1])).toBe(rules.DEFAULT_INDENT_STYLE);
      expect(rules.indentStyle(['warn'])).toBe(rules.DEFAULT_INDENT_STYLE);
      expect(rules.indentStyle([2])).toBe(rules.DEFAULT_INDENT_STYLE);
      expect(rules.indentStyle(['error'])).toBe(rules.DEFAULT_INDENT_STYLE);
    });

    it("should return 'tab' if rule is enabled and set to 'tab'", () => {
      expect(rules.indentStyle([1, 'tab'])).toBe('tab');
      expect(rules.indentStyle([2, 'tab'])).toBe('tab');
      expect(rules.indentStyle(['warn', 'tab'])).toBe('tab');
      expect(rules.indentStyle(['error', 'tab'])).toBe('tab');
    });

    it("should return 'space' if rule is enabled and indentation is set", () => {
      expect(rules.indentStyle([1, 2])).toBe('space');
      expect(rules.indentStyle([2, 2])).toBe('space');
      expect(rules.indentStyle(['warn', 2])).toBe('space');
      expect(rules.indentStyle(['error', 2])).toBe('space');
    });
  });

  describe('indentSize', () => {
    it("should throw 'TypeError' if rule is invalid", () => {
      testInvalidInput(rules.indentSize);
    });

    it("should return 'undefined' if rule is missing", () => {
      expect(rules.indentSize()).toBeUndefined();
    });

    it("should return 'undefined' if rule is disabled", () => {
      expect(rules.indentSize(0)).toBeUndefined();
      expect(rules.indentSize('off')).toBeUndefined();
      expect(rules.indentSize([0])).toBeUndefined();
      expect(rules.indentSize(['off'])).toBeUndefined();
    });

    it("should return 'undefined' is rule enabled and set to 'tab'", () => {
      expect(rules.indentSize([1, 'tab'])).toBeUndefined();
      expect(rules.indentSize(['warn', 'tab'])).toBeUndefined();
      expect(rules.indentSize([2, 'tab'])).toBeUndefined();
      expect(rules.indentSize(['error', 'tab'])).toBeUndefined();
    });

    it("should return 'DEFAULT_INDENT_SIZE' if rule is enabled and not set", () => {
      expect(rules.indentSize(1)).toBe(rules.DEFAULT_INDENT_SIZE);
      expect(rules.indentSize('warn')).toBe(rules.DEFAULT_INDENT_SIZE);
      expect(rules.indentSize(2)).toBe(rules.DEFAULT_INDENT_SIZE);
      expect(rules.indentSize('error')).toBe(rules.DEFAULT_INDENT_SIZE);
      expect(rules.indentSize([1])).toBe(rules.DEFAULT_INDENT_SIZE);
      expect(rules.indentSize(['warn'])).toBe(rules.DEFAULT_INDENT_SIZE);
      expect(rules.indentSize([2])).toBe(rules.DEFAULT_INDENT_SIZE);
      expect(rules.indentSize(['error'])).toBe(rules.DEFAULT_INDENT_SIZE);
    });

    it('should return indentation size if rule is enabled and indentation is set', () => {
      const rule1 = [1, 2];
      const rule2 = ['warn', 2];
      const rule3 = [2, 2];
      const rule4 = ['error', 2];
      expect(rules.indentSize(rule1)).toBe(rule1[1]);
      expect(rules.indentSize(rule2)).toBe(rule2[1]);
      expect(rules.indentSize(rule3)).toBe(rule3[1]);
      expect(rules.indentSize(rule4)).toBe(rule4[1]);
    });
  });

  describe('trimTrailingWhitespace', () => {
    it("should throw 'TypeError' if rule is invalid", () => {
      testInvalidInput(rules.trimTrailingWhitespace);
    });

    it("should return 'undefined' if rule is missing", () => {
      expect(rules.trimTrailingWhitespace()).toBeUndefined();
    });

    it("should return 'false' if rule is disabled", () => {
      expect(rules.trimTrailingWhitespace(0)).toBeFalsy();
      expect(rules.trimTrailingWhitespace('off')).toBeFalsy();
      expect(rules.trimTrailingWhitespace([0])).toBeFalsy();
      expect(rules.trimTrailingWhitespace(['off'])).toBeFalsy();
    });

    it("should return 'true' if rule is enabled", () => {
      expect(rules.trimTrailingWhitespace(1)).toBeTruthy();
      expect(rules.trimTrailingWhitespace('warn')).toBeTruthy();
      expect(rules.trimTrailingWhitespace(2)).toBeTruthy();
      expect(rules.trimTrailingWhitespace('error')).toBeTruthy();
      expect(rules.trimTrailingWhitespace([1])).toBeTruthy();
      expect(rules.trimTrailingWhitespace(['warn'])).toBeTruthy();
      expect(rules.trimTrailingWhitespace(2)).toBeTruthy();
      expect(rules.trimTrailingWhitespace(['error'])).toBeTruthy();
    });
  });

  describe('insertFinalNewline', () => {
    it("should throw 'TypeError' if rule is invalid", () => {
      testInvalidInput(rules.insertFinalNewline);
    });

    it("should return 'undefined' if rule is missing", () => {
      expect(rules.insertFinalNewline()).toBeUndefined();
    });

    it("should return 'false' if rule is disabled", () => {
      expect(rules.insertFinalNewline(0)).toBeFalsy();
      expect(rules.insertFinalNewline('off')).toBeFalsy();
      expect(rules.insertFinalNewline([0])).toBeFalsy();
      expect(rules.insertFinalNewline(['off'])).toBeFalsy();
    });

    it("should return 'true' if rule is enabled", () => {
      expect(rules.insertFinalNewline(1)).toBeTruthy();
      expect(rules.insertFinalNewline('warn')).toBeTruthy();
      expect(rules.insertFinalNewline(2)).toBeTruthy();
      expect(rules.insertFinalNewline('error')).toBeTruthy();
      expect(rules.insertFinalNewline([1])).toBeTruthy();
      expect(rules.insertFinalNewline(['warn'])).toBeTruthy();
      expect(rules.insertFinalNewline(2)).toBeTruthy();
      expect(rules.insertFinalNewline(['error'])).toBeTruthy();
    });

    it("should return 'false' if rule is enabled and set to 'never'", () => {
      expect(rules.insertFinalNewline([1, 'never'])).toBeFalsy();
      expect(rules.insertFinalNewline(['warn', 'never'])).toBeFalsy();
      expect(rules.insertFinalNewline([2, 'never'])).toBeFalsy();
      expect(rules.insertFinalNewline(['error', 'never'])).toBeFalsy();
    });

    it("should return 'true' if rule is enabled and set to 'always'", () => {
      expect(rules.insertFinalNewline([1, 'always'])).toBeTruthy();
      expect(rules.insertFinalNewline(['warn', 'always'])).toBeTruthy();
      expect(rules.insertFinalNewline([2, 'always'])).toBeTruthy();
      expect(rules.insertFinalNewline(['error', 'always'])).toBeTruthy();
    });
  });

  describe('maxLineLength', () => {
    it("should throw 'TypeError' if rule is invalid", () => {
      testInvalidInput(rules.maxLineLength);
    });

    it("should return 'undefined' if rule is missing", () => {
      expect(rules.maxLineLength()).toBeUndefined();
    });

    it("should return 'undefined' if rule is disabled", () => {
      expect(rules.maxLineLength(0)).toBeUndefined();
      expect(rules.maxLineLength('off')).toBeUndefined();
      expect(rules.maxLineLength([0])).toBeUndefined();
      expect(rules.maxLineLength(['off'])).toBeUndefined();
    });

    it("should return 'DEFAULT_MAX_LINE_LENGTH' if rule is enabled", () => {
      expect(rules.maxLineLength(1)).toBe(rules.DEFAULT_MAX_LINE_LENGTH);
      expect(rules.maxLineLength('warn')).toBe(rules.DEFAULT_MAX_LINE_LENGTH);
      expect(rules.maxLineLength(2)).toBe(rules.DEFAULT_MAX_LINE_LENGTH);
      expect(rules.maxLineLength('error')).toBe(rules.DEFAULT_MAX_LINE_LENGTH);
      expect(rules.maxLineLength([1])).toBe(rules.DEFAULT_MAX_LINE_LENGTH);
      expect(rules.maxLineLength(['warn'])).toBe(rules.DEFAULT_MAX_LINE_LENGTH);
      expect(rules.maxLineLength([2])).toBe(rules.DEFAULT_MAX_LINE_LENGTH);
      expect(rules.maxLineLength(['error'])).toBe(rules.DEFAULT_MAX_LINE_LENGTH);
    });

    it("should return 'DEFAULT_MAX_LINE_LENGTH' if rule is enabled and 'code' not set", () => {
      expect(rules.maxLineLength([1, {}])).toBe(rules.DEFAULT_MAX_LINE_LENGTH);
      expect(rules.maxLineLength(['warn', {}])).toBe(rules.DEFAULT_MAX_LINE_LENGTH);
      expect(rules.maxLineLength([2, {}])).toBe(rules.DEFAULT_MAX_LINE_LENGTH);
      expect(rules.maxLineLength(['error', {}])).toBe(rules.DEFAULT_MAX_LINE_LENGTH);
    });

    it('should return 2nd element if rule is enabled and 2nd element is number', () => {
      const rule1 = [1, 100];
      const rule2 = ['warn', 100];
      const rule3 = [2, 100];
      const rule4 = ['error', 100];
      expect(rules.maxLineLength(rule1)).toBe(rule1[1]);
      expect(rules.maxLineLength(rule2)).toBe(rule2[1]);
      expect(rules.maxLineLength(rule3)).toBe(rule3[1]);
      expect(rules.maxLineLength(rule4)).toBe(rule4[1]);
    });

    it("should return 'code' if rule is enabled and 'code' is set", () => {
      const rule1 = [1, { code: 100 }];
      const rule2 = ['warn', { code: 100 }];
      const rule3 = [2, { code: 100 }];
      const rule4 = ['error', { code: 100 }];
      expect(rules.maxLineLength(rule1)).toBe(rule1[1].code);
      expect(rules.maxLineLength(rule2)).toBe(rule2[1].code);
      expect(rules.maxLineLength(rule3)).toBe(rule3[1].code);
      expect(rules.maxLineLength(rule4)).toBe(rule4[1].code);
    });
  });
});
