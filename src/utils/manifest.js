/*
Copyright 2019 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
import { NOMENCLATURE, JSON_SCHEMA } from '../constants';
import { validateAgainstSchema } from './validate';
/**
 * Filter out all nodes to get the ones specify for registry yaml file
 * @param {Function} getNodes gatsby builtin function to return all nodes
 * @param {String} manifestSourceType the internal type refering to registry yaml source
 * @returns {Array} the list of manifest items
 */
export const getManifestInFileSystem = (getNodes, manifestSourceType) => {
  const manifest = getNodes().filter(node => node.internal.type === manifestSourceType);
  if (manifest.length > 0) {
    // filter out internal so that this manifest is exactly the same in structure as a json object
    // being passed in as config
    // eslint-disable-next-line no-unused-vars
    return manifest.map(({ internal, id, parent, children, ...rest }) => rest);
  }

  throw new Error(`${NOMENCLATURE.manifest} not found`);
};

/**
 * @param {Object} manifestItem the registry item found within the registry file sources[index]
 * @returns {Object} {isValid: {Boolean}, messages: []{String} }
 */
export const validateManifestItem = manifestItem =>
  validateAgainstSchema(manifestItem, JSON_SCHEMA);

/**
 * filters out unvalidated manifest items
 * @param {Array} manifest
 * @returns {Array} a new array of filtered manifests
 */
export const validateAndFilterManifest = manifest =>
  manifest.filter(item => {
    const validated = validateManifestItem(item);
    return validated.isValid;
  });
