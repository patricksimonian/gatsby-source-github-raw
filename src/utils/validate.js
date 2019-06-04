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
import validUrl from 'valid-url';
import Url from 'url';
import { isFunction, isString, isArray, isPlainObject } from 'lodash';
import { NOMENCLATURE } from '../constants';
export const getLodashValidateFnByMapping = mapping => {
  switch (mapping) {
    case 'String':
      return isString;
    case 'Function':
      return isFunction;
    default:
      return () => false;
  }
};
/**
 * validates an object against a schema
 * schema is in format
 * {
 *  [object key name] : {
 *    type: [object constructor String | Array | Object etc],
 *    required: [Boolean]
 *  }
 * }
 * @param {Object} obj the object that is being tested
 * @param {Object} schema the schema object that is being tested against
 * @returns {Object} an object containing error messages and isValid property
 * {
 *   messages: {Array},
 *   isValid: {Boolean}
 * }
 */
export const validateAgainstSchema = (obj, schema) => {
  const error = {
    messages: [],
  };

  Object.keys(schema).every(key => {
    const schemaItem = schema[key];
    let isValid = true;
    // is there a validator function
    if (isFunction(schemaItem.validate)) {
      isValid = schemaItem.validate(obj);
    } else if (schemaItem.required) {
      isValid =
        Object.prototype.hasOwnProperty.call(obj, key) &&
        getLodashValidateFnByMapping(schemaItem.type)(obj[key]);
      // does this source property have it anyways?
    } else if (Object.prototype.hasOwnProperty.call(obj, key)) {
      isValid = getLodashValidateFnByMapping(schemaItem.type)(obj[key]);
    }

    if (!isValid) {
      error.messages.push(
        `Error Validating ${NOMENCLATURE.manifest}: failed on property ${key}, received value ${
          obj[key]
        }`,
      );
    }
    return isValid;
  });

  error.isValid = error.messages.length === 0;

  return error;
};

export const isAGithubUrl = url => {
  if (validUrl.isWebUri(url)) {
    const parsed = new Url.URL(url);
    return parsed.host === 'github.com';
  }
  return false;
};

/**
 * validates source plugin options
 * @param {String} token the github access token
 * @param {String | Array} manifest the manifest config or the node internal.type that points to all the manifest files
 */
export const areOptionsOkay = (token, manifest) =>
  isString(token) && (isString(manifest) || (isArray(manifest) && manifest.every(isPlainObject)));
