const argv = require('yargs')
  .boolean('prod')
  .boolean('embeds')
  .argv;

let file;

if (argv.embeds) {
  file = argv.prod ? './config/webpack.config.embeds.prod.js' : './config/webpack.config.embeds.dev.js';
  module.exports = require(file);
} else {
  file = argv.prod ? './config/webpack.config.prod.js' : './config/webpack.config.dev.js';
  module.exports = require(file);
}

