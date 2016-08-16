import { PropTypes } from 'react';
import styles from './styles.less';
import MouseFollow from '../MouseFollow';

const Tooltip = ({ show, mode, data }) => {
  if (!show) return null;

  let content;

  switch (mode) {
    case 'simple':
    default:
      content = <div className={styles.simple}>{data}</div>;
      break;
  }

  return (
    <MouseFollow>
      <div className={styles.root}>
        {content}
      </div>
    </MouseFollow>
  );
};

Tooltip.propTypes = {
  show: PropTypes.bool,
  mode: PropTypes.oneOf(['simple', 'item', 'trait']),
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Tooltip;
