import devConfig from './dev';
import prodConfig from './prod';
import defaultConfig from './default';

const overrideConfig = __DEVELOPMENT__ ? devConfig : prodConfig;

export default {
  ...defaultConfig,
  ...overrideConfig,
};
