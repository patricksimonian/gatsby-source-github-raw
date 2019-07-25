import chalk from 'chalk';

console.log(chalk`
  {yellow gatsby-source-github-raw is moving!}
  {bold.white @bcgov organization is taking this project}, please uninstall this package and run
  {cyan npm install --save @bcgov/gatsby-source-github-raw@latest`);
