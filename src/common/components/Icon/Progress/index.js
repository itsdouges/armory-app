import { PropTypes } from 'react';
import styles from './styles.less';
import sizes from '../styles.less';

const ProgressIcon = ({ size }) => (
  <svg
    className={`${styles.spinner} ${sizes[size]}`}
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className={styles.path}
      fill="none"
      strokeWidth="6"
      strokeLinecap="round"
      cx="33"
      cy="33"
      r="30"
    />
  </svg>
);

ProgressIcon.defaultProps = {
  size: 'mini',
};

ProgressIcon.propTypes = {
  size: PropTypes.string,
};

export default ProgressIcon;
