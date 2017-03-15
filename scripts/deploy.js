require('babel-core/register');
const argv = require('yargs').argv;
const s3 = require('s3');
const http = require('http');
const fs = require('fs');
const config = require('../src/config/default');

const ENVIRONMENT = argv.env;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

if (!ACCESS_KEY_ID) {
  throw new Error('ACCESS_KEY_ID is empty!');
}

if (!SECRET_ACCESS_KEY) {
  throw new Error('SECRET_ACCESS_KEY is empty!');
}

const log = (str) => console.log(str);

function getS3Client () {
  return s3.createClient({
    s3Options: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
      region: 'us-west-2',
    },
  });
}

function hasShortCache (file) {
  let result = false;

  config.cache.short.forEach((shortCacheFile) => {
    if (file.indexOf(shortCacheFile) >= 0) {
      result = true;
    }
  });

  return result;
}

function calculateDaysToSeconds (days) {
  return 3600 * 24 * days;
}

function sync (s3Client, bucket, folder) {
  log(`==> Syncing s3 bucket ${bucket}`);

  const DEFAULT_DAYS_TO_CACHE = 365;

  function getS3Params (localFile, stat, callback) {
    let secondsToCache;

    if (hasShortCache(localFile)) {
      secondsToCache = 60;
    } else {
      secondsToCache = calculateDaysToSeconds(DEFAULT_DAYS_TO_CACHE);
    }

    const s3Params = {
      CacheControl: `max-age=${secondsToCache}`,
    };

    callback(null, s3Params);
  }

  const params = {
    localDir: folder,
    deleteRemoved: true,
    s3Params: {
      Bucket: bucket,
      Prefix: '',
    },
    getS3Params,
  };

  const uploader = s3Client.uploadDir(params);
  uploader.on('error', () => {
    log('! Unable to sync, check your region maybe?');
    process.exit(1);
  });

  uploader.on('fileUploadStart', (localFilePath, s3Key) => {
    log(`Starting upload of ${localFilePath} to ${bucket} ${s3Key}`);
  });

  uploader.on('fileUploadEnd', (localFilePath, s3Key) => {
    log(`Finished upload of ${bucket} ${s3Key}`);
  });

  uploader.on('end', () => {
    log(`==> Finished sync of s3 bucket ${bucket}`);
  });
}

function deployPreview () {
  log('Deploying preview.gw2armory.com');

  const client = getS3Client();

  sync(client, 'preview.gw2armory.com', './dist/');
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

  const client = getS3Client();

  downloadSitemap(() => sync(client, 'gw2armory.com', './dist/'));
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
