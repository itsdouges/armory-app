import { PropTypes } from 'react';
import styles from './styles.less';

const SimpleTooltip = ({ data }) => (
  <div className={styles.simple}>{data}</div>
);


SimpleTooltip.propTypes = {
  data: PropTypes.string,
};

export default SimpleTooltip;
