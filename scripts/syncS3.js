/* eslint no-console:0 */

const s3 = require('s3');
const config = require('../src/config/default');

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

module.exports = function sync (bucket, folder, paramOverride) {
  log(`==> Syncing s3 bucket ${bucket}`);

  const s3Client = getS3Client();

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

  const params = Object.assign({
    localDir: folder,
    deleteRemoved: true,
    s3Params: {
      Bucket: bucket,
      Prefix: '',
    },
    getS3Params,
  }, paramOverride);

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
};
