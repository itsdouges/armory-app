import { PropTypes } from 'react';

import styles from './styles.less';

const Divider = ({ rotationOffset }) => (
  <div className={styles.divider} style={{ transform: `rotate(${rotationOffset}deg)` }} />
);

Divider.propTypes = {
  rotationOffset: PropTypes.number,
};

export default Divider;
