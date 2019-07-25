const chalk = require('chalk');

console.log(
  chalk.bold.yellow(` gatsby-source-github-raw is moving!\n`),
  chalk.bold.white(
    `@bcgov organization is taking this project, please uninstall this package and run\n`,
  ),
  chalk.bold.cyan(`npm install --save @bcgov/gatsby-source-github-raw@latest\n`),
);
