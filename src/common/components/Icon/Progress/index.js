// @flow

import styles from './styles.less';
import sizes from '../styles.less';
import cx from 'classnames';

type ProgressIconProps = {
  size?: string,
  className?: string,
};

const ProgressIcon = ({ size, className, ...props }: ProgressIconProps) => (
  <svg
    className={cx(styles.spinner, sizes[size], className)}
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
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

export default ProgressIcon;
