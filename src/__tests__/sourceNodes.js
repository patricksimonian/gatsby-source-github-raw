import { SourceNodes } from '../gatsby-node';
import { ERRORS } from '../constants';
import {
  GRAPHQL_NODES_WITH_MANIFEST_JSON,
  MANIFEST_SOURCE_TYPE,
} from '../__fixtures__/manifest-nodes';
import { MANIFEST } from '../__fixtures__/manifest';
import { getManifestInFileSystem } from '../utils';
import { validateAndFilterManifest } from '../utils/manifest';
import { fetchFile } from '../utils/api';
import { RAW_FILE } from '../__fixtures__/githubFile';

jest.mock('../utils/manifest');
jest.mock('../utils/api');

fetchFile.mockReturnValue(Promise.resolve(RAW_FILE));

describe('SourceNodes Integration Tests', () => {
  const gatsby = {
    getNodes: jest.fn(() => GRAPHQL_NODES_WITH_MANIFEST_JSON),
    actions: jest.fn(),
    createNodeId: jest.fn(),
  };
  const options = {
    githubAccessToken: 'foo',
    files: MANIFEST_SOURCE_TYPE,
  };

  getManifestInFileSystem.mockReturnValue(MANIFEST);
  validateAndFilterManifest.mockReturnValue(MANIFEST);

  afterEach(() => {
    getManifestInFileSystem.mockClear();
  });

  it('throws if options are invalid', async () => {
    expect(SourceNodes(gatsby, options)).rejects.toThrow(ERRORS.BAD_OPTIONS);
  });

  it('calls getManifestFromFileSystem is files is a string', async () => {
    await SourceNodes(gatsby, options);
    expect(getManifestInFileSystem).toHaveBeenCalledWith(gatsby.getNodes, MANIFEST_SOURCE_TYPE);
  });

  it('does not call getManifestFromFileSystem if files is an array', async () => {
    await SourceNodes(gatsby, { ...options, files: MANIFEST });
    expect(getManifestInFileSystem).not.toHaveBeenCalled();
  });
});
