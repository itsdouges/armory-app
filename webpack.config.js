const argv = require('yargs')
  .boolean('embeds')
  .argv;

const production = process.env.NODE_ENV === 'production';
const embeds = argv.embeds;
const configPath = embeds ? './config/webpack.config.embeds.js' : './config/webpack.config.app.js';

module.exports = require(configPath)[production ? 'production' : 'development'];
