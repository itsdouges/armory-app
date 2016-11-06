import { PropTypes } from 'react';

import styles from './styles.less';
import { prefix } from 'lib/css';

const Divider = ({ rotationOffset }) => (
  <div className={styles.divider} style={prefix('transform', `rotate(${rotationOffset}deg)`)} />
);

Divider.propTypes = {
  rotationOffset: PropTypes.number,
};

export default Divider;
