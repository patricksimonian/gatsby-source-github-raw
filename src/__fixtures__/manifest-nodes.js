export const MANIFEST_SOURCE_TYPE = 'foo';
const NON_MANIFEST_SOURCE_TYPE = 'baz';

export const GRAPHQL_NODES_WITHOUT_MANIFEST_JSON = [
  {
    id: '56bcf513-818b-5188-99e9-e194b32eaf1a',
    internal: {
      type: NON_MANIFEST_SOURCE_TYPE,
    },
  },
  {
    id: '56bcf513-818b-5188-99e9-e194b32eaf1a',
    internal: {
      type: NON_MANIFEST_SOURCE_TYPE,
    },
  },
  {
    id: '56bcf513-818b-5188-99e9-e194b32eaf1a',
    internal: {
      type: NON_MANIFEST_SOURCE_TYPE,
    },
  },
];

export const GRAPHQL_NODES_WITH_MANIFEST_JSON = [
  {
    id: '56bcf513-818b-5188-99e9-e194b32eaf1a',
    internal: {
      type: MANIFEST_SOURCE_TYPE,
    },
  },

  {
    id: '62c295c4-7df2-556c-a8d0-0a49a3761ca1',
    internal: {
      type: MANIFEST_SOURCE_TYPE,
    },
  },
  {
    id: '0597ed6f-b09f-5d0a-b9b1-16ac7d3a3ca4',
    internal: {
      type: MANIFEST_SOURCE_TYPE,
    },
  },
].concat(GRAPHQL_NODES_WITHOUT_MANIFEST_JSON);
