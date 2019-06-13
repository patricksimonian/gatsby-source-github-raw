import { createNodeObject } from '../utils/createNode';
import { DECODED_FILE } from '../__fixtures__/githubFile';

describe('creating the node', () => {
  const createNodeId = jest.fn();
  createNodeId.mockReturnValue('id');

  it('sets ___boundProperties to {} if metadata is undefined', () => {
    const object = createNodeObject(createNodeId, DECODED_FILE);
    expect(object.___boundProperties).toBeDefined();
    expect(object.___boundProperties).toEqual({});
  });

  it('sets ___boundProperties to {} if metadata is empty', () => {
    const object = createNodeObject(createNodeId, DECODED_FILE, {});
    expect(object.___boundProperties).toBeDefined();
    expect(object.___boundProperties).toEqual({});
  });

  it('sets ___boundProperties', () => {
    const metadata = {
      foo: 'bar',
    };

    const object = createNodeObject(createNodeId, DECODED_FILE, metadata);
    expect(object).toMatchSnapshot();
  });
});
