const argv = require('yargs').boolean('prod').argv;
const file = argv.prod ? './config/webpack.config.prod.js' : './config/webpack.config.dev.js';

console.log(`RUNNING IN ${argv.prod ? 'PROD' : 'DEV'} MODE`);

module.exports = require(file);
