import { validateAgainstSchema } from '../utils';
import { isAGithubUrl } from '../utils/validate';

describe('validateAgainstSchema', () => {
  let schema;
  beforeEach(() => {
    schema = {
      foo: {
        type: 'String',
        required: true,
      },
      bar: {
        type: 'String',
        required: false,
      },
    };
  });

  it('returns an object with a messages property that is an array', () => {
    const result = validateAgainstSchema({}, schema);
    expect(typeof result).toBe('object');
    expect(result.messages instanceof Array).toBe(true);
  });

  it('returns an object with an isValid property that is boolean', () => {
    const result = validateAgainstSchema({}, schema);
    expect(typeof result).toBe('object');
    expect(typeof result.isValid).toBe('boolean');
  });

  it('validates schema and returns true when valid', () => {
    const object = {
      foo: 'foo',
      bar: 'bar',
    };
    const result = validateAgainstSchema(object, schema);
    expect(result.isValid).toBe(true);
  });

  it('validates not required properties if passed in', () => {
    const object = {
      foo: 'foo',
      bar: 1, // bar is not required but sould be a string
    };
    const result = validateAgainstSchema(object, schema);
    expect(result.isValid).toBe(false);
    expect(result.messages.length).toBe(1);
  });

  it('validates required properties', () => {
    const object = {
      bar: 'foo',
    };
    const result = validateAgainstSchema(object, schema);
    expect(result.isValid).toBe(false);
    expect(result.messages.length).toBe(1);
  });
});

describe('Custom Validators', () => {
  it('detects if something is a valid github URL', () => {
    expect(isAGithubUrl('https://github.com')).toBe(true);
    expect(isAGithubUrl('https://example.com')).toBe(false);
    expect(isAGithubUrl('df')).toBe(false);
  });
});
