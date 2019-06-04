import { getManifestInFileSystem } from '../utils';
import { NOMENCLATURE } from '../constants';
import {
  GRAPHQL_NODES_WITH_MANIFEST_JSON,
  GRAPHQL_NODES_WITHOUT_MANIFEST_JSON,
  MANIFEST_SOURCE_TYPE,
} from '../__fixtures__/manifest-nodes';

describe('Manifest Utilities', () => {
  test('getManifestInFileSystem returns the manifest', () => {
    const getNodes = jest.fn(() => GRAPHQL_NODES_WITH_MANIFEST_JSON);
    const manifest = getManifestInFileSystem(getNodes, MANIFEST_SOURCE_TYPE);
    expect(manifest).toMatchSnapshot();
  });

  test('getManifestInFileSystem throws if no manifest exists', () => {
    const getNodes = jest.fn(() => GRAPHQL_NODES_WITHOUT_MANIFEST_JSON);
    expect(() => getManifestInFileSystem(getNodes, MANIFEST_SOURCE_TYPE)).toThrow(
      `${NOMENCLATURE.manifest} not found`,
    );
  });
});
