import { PropTypes } from 'react';
import cx from 'classnames';

import styles from './styles.less';

function getStyle (id = 0) {
  const image = require(`assets/images/maps/${id}.jpg`);

  return {
    backgroundImage: `url(${image})`,
  };
}

const Gw2Map = ({ data, className }) => (
  <div className={cx(styles.root, className)} style={getStyle(data.id)}>
    {data.name && <span title={data.name} className={styles.name}>{data.name}</span>}
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
