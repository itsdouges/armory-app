import { PropTypes } from 'react';
import cx from 'classnames';

import styles from './styles.less';

function calcBarStyles (current, max, barColor) {
  const percent = max ? Math.ceil((current / max || 0) * 100) : 100;

  return {
    width: '100%',
    transform: `translateX(-${percent}%)`,
    backgroundColor: barColor,
  };
}

const ProgressBar = ({ current, max, barColor, backgroundColor, icon, small, label }) => (
  <div className={cx(styles.root, small && styles.small)} style={{ backgroundColor }}>
    {icon}
    <span className={styles.bar} style={calcBarStyles(current, max, barColor)} />
    {small || <span className={styles.progress}>
      {label || `${current}/${max}`}
    </span>}
  </div>
);

ProgressBar.defaultProps = {
  current: 0,
  max: 0,
};

ProgressBar.propTypes = {
  backgroundColor: PropTypes.string,
  barColor: PropTypes.string,
  current: PropTypes.number,
  max: PropTypes.number,
  icon: PropTypes.node,
  small: PropTypes.bool,
  label: PropTypes.string,
};

export default ProgressBar;
