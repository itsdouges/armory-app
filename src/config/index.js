const baseConfig = require('./default');

const configName = __DEVELOPMENT__ ? 'local' : 'prod';

let environmentConfig;

try {
  environmentConfig = require(`./${configName}`).default;
} catch (e) {
  console.log('>>>>>>>>>>>>>>>>>>>>>');
  console.log('You\'re missing a local config. Add one to src/config/local.js. Copy local.sample.js if you\'re stuck!');
  console.log('>>>>>>>>>>>>>>>>>>>>>');
  throw e;
}

export default {
  ...baseConfig,
  ...environmentConfig,
};
