const argv = require('yargs').boolean('prod').argv;
const file = argv.prod ? './config/webpack.config.prod.js' : './config/webpack.config.dev.js';

console.log(`\n=== RUNNING ${argv.prod ? 'PROD' : 'DEV'} ===\n`);

module.exports = require(file);
