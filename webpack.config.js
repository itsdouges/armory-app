const argv = require('yargs').boolean('prod').argv;

const file = argv.prod ? './config/webpack.config.prod.js' : './config/webpack.config.dev.js';

module.exports = require(file);
