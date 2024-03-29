> This project is moving to `@bcgov/gatsby-source-github-raw` [repo](https://github.com/bcgov/gatsby-source-github-raw);
# Gatsby Source Github Raw
[![Build Status](https://travis-ci.com/patricksimonian/gatsby-source-github-raw.png?branch=master)](https://travis-ci.com/patricksimonian/gatsby-source-github-raw)


A simplified way of leveraging the `Github Contents Api` as Gatsby graphql nodes. 

## Features

- __Implied Mime Types__ mime/media types are set based on file extensions when available
- __Bind Properties__ you can bind properties that are 'attached' to the raw file node if needed

## To Use

- Install `npm install --save gatsby-source-github-raw`
- Add to your gatsby config
```js
{
  resolve: 'gatsby-source-github-raw',
  options: {
    githubAccessToken: '...',
    files: [
      'https://github.com/foo/bar/blob/master/something.md'
    ]
  }
}
```

## Options

- githubAccessToken: this is the oauth access token, it will require read priviledges on a repo
- files: this is either a list of files [String], a list of objects, or a name of a resolved transformer json __node type__, or a function

## Files Option

There are a few ways to pass in files

1. as a simple array of strings `['https://github.com/foo/bar/blob/master/something.md', 'https://github.com/foo/bar/blob/master/something2.md']`
2. as an array of objects, this allows you to bind extra properties to each node
> if you are binding properties, you need to ensure that the properties that you bind between files match the same schema
> since this process depends on gatsby's graphql type inferrence routine

```js
[
  {
    url: 'https://github.com/foo/bar/blob/master/something.md'
    labels: [ // labels will become a bound property that is available at node._xxboundProperties.labels
      'cool',
      'featured',
    ]
  },
  {
    url: 'https://github.com/foo/bar/blob/master/something2.md',
    labels: [ // labels will become a bound property that is available at node._xxboundProperties.labels
      'featured',
    ]
  }
]
```
3. If there are many files you'd like to source, containing them all in the `gatsby-config.js` file is cumbersome.
You may store your 'files config' into a json file and have `gatsby-transformer-json` pick it up.
The implied `nodeType` that is created from the directory can be passed in as the `files` option

> foo.json
```json
  [
    {
    "url": "https://github.com/foo/bar/blob/master/something.md",
    "labels": [
      "cool",
      "featured"
    ]
  },
  {
    "url": "https://github.com/foo/bar/blob/master/something2.md",
    "labels": [
      "featured"
    ]
  }
  ]
```

> gatbsy-config
```js
{
  resolve: 'gatsby-source-github-raw',
  options: {
    githubAccessToken: '...',
    files: 'fooJson'
  }
}
```

4. Files as a function
```js
/**
 * fileCallback
 * @param {Function} getNodes gatsby getNodes function in case you need it
 * @returns {Array<String> | Array<Object>} a list of files in strings or objects
 **/
const fileCallback = getNodes => {
  // get nodes allows you to produce a set of urls based on your own conditions, for example if you
  // had multiple json files that held url information that you wanted to normalize and use
  return ['...list of files']
}
```

```js
{
  resolve: 'gatsby-source-github-raw',
  options: {
    githubAccessToken: '...',
    files: () => ['https://github.com/foo/bar/blob/master/blah.md']
  }
}
```

## Exceptions to applying bound properties

Because manifests can be passed in as plain js objects as well as loaded through the use of 
`gatsby-transformer-json`, to maintain consistency between these two possible sources, the following
properties are not usable within `json` files that are leveraged as a source for files.

- internal
- id
- parent
- children

This is because these properties are default properties applied to any graphql node within gatsby. 

## Accessing Bound Properties

Bound Properties are accessed at `node._xxboundProperties`
