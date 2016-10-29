import { PropTypes } from 'react';
import cx from 'classnames';

import styles from './styles.less';

function calcBarStyles (current, max, barColor) {
  const percent = max ? Math.ceil((current / max || 0) * 100) : 0;

  return {
    width: `${percent}%`,
    backgroundColor: barColor,
  };
}

const ProgressBar = ({ current, max, barColor, backgroundColor, icon, simple, label }) => (
  <div className={cx(styles.root, simple && styles.simple)} style={{ backgroundColor }}>
    {icon}
    <span className={styles.bar} style={calcBarStyles(current, max, barColor)} />
    <span className={styles.progress}>
      {label || `${current}/${max}`}
    </span>
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
  simple: PropTypes.bool,
  label: PropTypes.string,
};

export default ProgressBar;
