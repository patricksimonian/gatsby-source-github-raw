# Gatsby Source Github Raw

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
- files: this is either a list of files [String], a list of objects, or a name of a resolved transformer json __node type__

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
3. If there are many files you'd like to source, containing them all in the `gatsby-config.js` file is cumbersome
you store your 'files' config into a set of json files in a directory and have `gatsby-transformer-json` pick them up.
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
{
  resolve: 'gatsby-source-github-raw',
  options: {
    githubAccessToken: '...',
    files: () => ['fooJson']
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