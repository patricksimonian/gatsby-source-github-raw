# Gatsby Source Github Raw


## Exceptions to applying metadata

Because manifests can be passed in as plain js objects as well as loaded through the use of 
`gatsby-transformer-json`, to maintain consistency between these two possible sources, the following
properties are not usable within `json` files that are leveraged as a __manifest__.

- internal
- id
- parent
- children

This is because these properties are default properties applied to any graphql node within gatsby. 
