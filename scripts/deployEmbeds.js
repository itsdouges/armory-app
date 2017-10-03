/* eslint no-console:0 */

const zip = require('zip-folder');
const version = require('../package.json').version;
const sync = require('./syncS3');

zip('./dist', `./dist-embeds/gw2a-embeds-v${version}.zip`, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('==> Finished zipping embeds.');

  sync('gw2a-embeds', 'dist-embeds', {
    deleteRemoved: false,
  });
});
