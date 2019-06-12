import { validateAgainstSchema } from '../utils';
import { isAGithubUrl, areOptionsOkay } from '../utils/validate';

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
    expect(isAGithubUrl({ url: 'https://github.com' })).toBe(true);
    expect(isAGithubUrl({ url: 'https://example.com' })).toBe(false);
    expect(isAGithubUrl({ url: 'df' })).toBe(false);
  });
});

describe('areOptionsOkay', () => {
  it('returns if options are okay', () => {
    const GOOD_TOKEN = 'foo';
    const BAD_TOKEN = false;
    const GOOD_MANIFEST_CONFIG = [{}, {}];
    const BAD_MANIFEST_CONFIG_1 = [1, 2];
    const BAD_MANIFEST_CONFIG_2 = null;
    const GOOD_MANIFEST_REFERENCE = 'FooJson';

    const GOOD_MANIFEST = () => [{}, {}];

    expect(areOptionsOkay(GOOD_TOKEN, GOOD_MANIFEST_CONFIG)).toBe(true);
    expect(areOptionsOkay(GOOD_TOKEN, GOOD_MANIFEST_REFERENCE)).toBe(true);
    expect(areOptionsOkay(BAD_TOKEN, GOOD_MANIFEST_REFERENCE)).toBe(false);
    expect(areOptionsOkay(BAD_TOKEN, GOOD_MANIFEST_CONFIG)).toBe(false);
    expect(areOptionsOkay(GOOD_TOKEN, BAD_MANIFEST_CONFIG_1)).toBe(false);
    expect(areOptionsOkay(GOOD_TOKEN, BAD_MANIFEST_CONFIG_2)).toBe(false);
    expect(areOptionsOkay(BAD_TOKEN, BAD_MANIFEST_CONFIG_1)).toBe(false);
    expect(areOptionsOkay(BAD_TOKEN, BAD_MANIFEST_CONFIG_2)).toBe(false);
    expect(areOptionsOkay(GOOD_TOKEN, GOOD_MANIFEST)).toBe(true);
  });
});
