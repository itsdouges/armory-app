import localConfig from './local';
import prodConfig from './prod';
import defaultConfig from './default';

const overrideConfig = __DEVELOPMENT__ ? localConfig : prodConfig;

export default {
  ...defaultConfig,
  ...overrideConfig,
};
