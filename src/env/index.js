import defaultConfig from './default';

const configName = __DEVELOPMENT__ ? 'local' : 'prod';
const overrideConfig = require(`./${configName}`).default;

export default {
  ...defaultConfig,
  ...overrideConfig,
};
