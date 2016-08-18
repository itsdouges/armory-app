import { PropTypes } from 'react';
import styles from './styles.less';

function getStyle (id) {
  const image = require(`assets/images/maps/${id}.jpg`);

  return {
    backgroundImage: `url(${image})`,
  };
}

const Gw2Map = ({ id, map }) => (
  <div className={styles.root} style={getStyle(id)}>
    <span title={map.name} className={styles.name}>{map.name}</span>
  </div>
);

Gw2Map.propTypes = {
  id: PropTypes.number,
  map: PropTypes.object,
};

Gw2Map.defaultProps = {
  map: {
    name: ' ',
  },
  id: 0,
};

export default Gw2Map;
