import { PropTypes } from 'react';
import styles from './styles.less';

function getStyle (id = 0) {
  const image = require(`assets/images/maps/${id}.jpg`);

  return {
    backgroundImage: `url(${image})`,
  };
}

const Gw2Map = ({ data }) => (
  <div className={styles.root} style={getStyle(data.id)}>
    {data.name && <span title={data.name} className={styles.name}>{data.name}</span>}
  </div>
);

Gw2Map.propTypes = {
  data: PropTypes.object,
};

Gw2Map.defaultProps = {
  data: {
    name: '',
    id: 0,
  },
};

export default Gw2Map;
