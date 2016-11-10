// @flow

import cx from 'classnames';
import includes from 'lodash/includes';

import * as i18n from 'lib/i18n';
import styles from './styles.less';

const UNSUPPORTED = ['zh', 'ru'];
function getWikiSupportedLanguage (language) {
  if (includes(UNSUPPORTED, language)) {
    return 'en';
  }

  return language;
}

const LANGUAGE = getWikiSupportedLanguage(i18n.get());

const cleanName = (name) => name && name.replace('Beta ', '');

function getStyle (id = 0) {
  const image = require(`assets/images/maps/${id}.jpg`);

  return {
    backgroundImage: `url(${image})`,
  };
}

type Gw2MapProps = {
  data: Object,
  className: string,
};

const Gw2Map = ({ data, className }: Gw2MapProps) => (
  <div className={cx(styles.root, className)} style={getStyle(data.id)}>
    <a href={`https://wiki-${LANGUAGE}.guildwars2.com/wiki/${cleanName(data.name)}`} target="_blank">
      {data.name && <span title={data.name} className={styles.name}>{data.name}</span>}
    </a>
  </div>
);

Gw2Map.defaultProps = {
  data: {
    name: '',
    id: 0,
  },
};

export default Gw2Map;
