// Copyright © 2019 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Patrick Simonian on 2019-06-04.
//
import isString from 'lodash/isString';
import { areOptionsOkay, getManifestInFileSystem, decodeFileContent } from './utils';
import { ERRORS } from './constants';
import { validateAndFilterManifest } from './utils/manifest';
import { extractInformationFromGithubUrl, createFetchFileRoute } from './utils/url';
import { fetchFile } from './utils/api';
import { createNodeObject } from './utils/createNode';
import { isFunction } from '@babel/types';

export const sourceNodes = async (
  { getNodes, actions, createNodeId },
  { githubAccessToken, files },
) => {
  const { createNode } = actions;
  if (!areOptionsOkay(githubAccessToken, files)) {
    throw new Error(ERRORS.BAD_OPTIONS);
  }

  let manifest = [];
  if (isString(files)) {
    const manifestSourceType = files;
    manifest = getManifestInFileSystem(getNodes, manifestSourceType);
  } else if (isFunction(files)) {
    manifest = files();
  } else {
    manifest = files.map(f => {
      if (isString(f)) return { url: f };
      return f;
    });
  }
  // validate files and filter
  const filteredManifest = validateAndFilterManifest(manifest);
  // grab seperate urls from the rest of the metadata
  const urlMap = filteredManifest.reduce((map, currentUrlObj) => {
    const { url, ...rest } = currentUrlObj;
    map.set(url, rest || null);
    return map;
  }, new Map());

  // convert into a github object
  const fetchFileList = Array.from(urlMap.keys())
    .map(url => extractInformationFromGithubUrl(url))
    .map(({ repo, owner, filepath, ref }) => createFetchFileRoute(repo, owner, filepath, ref));

  const rawFiles = await Promise.all(fetchFileList.map(path => fetchFile(path, githubAccessToken)));
  // filter out files that didn't fetch and then decode b64 content
  const decodedFiles = rawFiles.filter(f => f).map(decodeFileContent);

  return decodedFiles.map(file => {
    const { html_url } = file;

    // get meta data from urlMap based on this url
    const metadata = urlMap.get(html_url);
    return createNode(createNodeObject(createNodeId, file, metadata));
  });
};
