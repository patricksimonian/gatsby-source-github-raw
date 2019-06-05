import { SourceNodes } from '../gatsby-node';
import { ERRORS } from '../constants';

describe('SourceNodes Integration Tests', () => {
  const gatsby = { getNodes: jest.fn(), actions: jest.fn(), createNodeId: jest.fn() };
  const options = {
    githubAccessToken: 'foo',
    files: 'FilesJson',
  };

  it('throws if options are invalid', async () => {
    expect(SourceNodes(gatsby, options)).rejects.toThrow(ERRORS.BAD_OPTIONS);
  });
});
