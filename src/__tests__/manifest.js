import { getManifestInFileSystem } from '../utils';
import { validateAgainstSchema } from '../utils/validate';
import { NOMENCLATURE } from '../constants';
import {
  GRAPHQL_NODES_WITH_MANIFEST_JSON,
  GRAPHQL_NODES_WITHOUT_MANIFEST_JSON,
  MANIFEST_SOURCE_TYPE,
} from '../__fixtures__/manifest-nodes';
import { validateAndFilterManifest, seperateUrlFromMetadata } from '../utils/manifest';
import { MANIFEST } from '../__fixtures__/manifest';

jest.mock('../utils/validate.js');

describe('Manifest Utilities', () => {
  describe('getManifestInFileSystem', () => {
    it('returns the manifest', () => {
      const getNodes = jest.fn(() => GRAPHQL_NODES_WITH_MANIFEST_JSON);
      const manifest = getManifestInFileSystem(getNodes, MANIFEST_SOURCE_TYPE);
      expect(manifest).toMatchSnapshot();
    });

    it('throws if no manifest exists', () => {
      const getNodes = jest.fn(() => GRAPHQL_NODES_WITHOUT_MANIFEST_JSON);
      expect(() => getManifestInFileSystem(getNodes, MANIFEST_SOURCE_TYPE)).toThrow(
        `${NOMENCLATURE.manifest} not found`,
      );
    });
  });

  describe('validateAndFilterManifest', () => {
    it('filters out manifest items that are invalid', () => {
      validateAgainstSchema
        .mockReturnValueOnce({ isValid: false })
        .mockReturnValue({ isValid: true });

      const newManifest = validateAndFilterManifest(MANIFEST);
      expect(newManifest.length).toBeLessThan(MANIFEST.length);

      expect(newManifest).toMatchSnapshot();
    });
  });

  describe('seperateUrlFromMetadata', () => {
    it('seperates metadata', () => {
      const manifestItem = {
        url: 'foo',
        internal: 'bar',
        data1: true,
      };

      const expected = ['foo', { data1: true }];

      expect(seperateUrlFromMetadata(manifestItem)).toEqual(expected);
    });
  });
});
