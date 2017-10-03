/* eslint no-console:0 */

require('babel-core/register');
const argv = require('yargs').argv;
const http = require('http');
const fs = require('fs');
const sync = require('./syncS3');

const ENVIRONMENT = argv.env;
const log = (str) => console.log(str);
function deployPreview () {
  log('Deploying preview.gw2armory.com');

  sync('preview.gw2armory.com', './dist/');
}

function downloadSitemap (done) {
  log('Downloading prod sitemap.xml');

  const file = fs.createWriteStream('./dist/sitemap.xml');
  http.get('http://api.gw2armory.com/sitemap.xml', (response) => {
    if (response.statusCode >= 500) {
      log('Error downloading sitemap!');
      log(`${response.statusCode} - ${response.statusMessage}`);
      process.exit(1);
      return;
    }

    response.pipe(file);
    log('Downloaded!');
    done();
  });
}

function deployProd () {
  log('Deploying gw2armory.com');

  downloadSitemap(() => sync('gw2armory.com', './dist/'));
}

switch (ENVIRONMENT) {
  case 'PROD':
    deployProd();
    break;

  case 'PREVIEW':
    deployPreview();
    break;

  default:
    throw new Error('Env not supported');
}
