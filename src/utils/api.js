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
import fetch from 'node-fetch';
/**
 * Fetches contents from file
 * note the media type header, it converts what would have been a
 * b64 encoded string of the file contents into either raw string data or json
 * @param {String} path
 * @param {String} token
 * @param {Object} boundProperties and object properties you want to bind to returned json
 */
export const fetchFile = async (path, token) => {
  try {
    const result = await fetch(path, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-GitHub-Media-Type': 'Accept: application/vnd.github.v3.raw+json',
      },
    });
    const data = await result.json();
    if (result.ok) return data;
  } catch (e) {
    return undefined;
  }
  return undefined;
};

/**
 * returns array of fetch file promises
 * @param {Array} files array of github api contents api uri strings
 * @param {*} token github token
 */
export const fetchFiles = (files, token) => {
  return files.map(f => fetchFile(f.path, token));
};
