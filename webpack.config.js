const argv = require('yargs')
  .boolean('embeds')
  .boolean('production')
  .argv;

const production = argv.production;
const embeds = argv.embeds;
const configPath = embeds ? './config/webpack.config.embeds.js' : './config/webpack.config.app.js';

module.exports = require(configPath)[production ? 'production' : 'development'];
