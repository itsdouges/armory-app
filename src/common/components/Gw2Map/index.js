import { PropTypes } from 'react';
import cx from 'classnames';

import styles from './styles.less';

const cleanName = (name) => name && name.replace('Beta ', '');

function getStyle (id = 0) {
  const image = require(`assets/images/maps/${id}.jpg`);

  return {
    backgroundImage: `url(${image})`,
  };
}

const Gw2Map = ({ data, className }) => (
  <div className={cx(styles.root, className)} style={getStyle(data.id)}>
    <a href={`https://wiki.guildwars2.com/wiki/${cleanName(data.name)}`} target="_blank">
      {data.name && <span title={data.name} className={styles.name}>{data.name}</span>}
    </a>
  </div>
);

Gw2Map.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
};

Gw2Map.defaultProps = {
  data: {
    name: '',
    id: 0,
  },
};

export default Gw2Map;
