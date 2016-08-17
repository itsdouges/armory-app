import { PropTypes } from 'react';
import styles from './styles.less';
import MouseFollow from '../MouseFollow';
import { connect } from 'react-redux';
import { selector } from 'features/Gw2/tooltip.reducer';

const Tooltip = ({ tooltip }) => {
  if (!tooltip.show) return null;

  let content;

  switch (tooltip.mode) {
    case 'simple':
    default:
      content = <div className={styles.simple}>{tooltip.data || 'Loading...'}</div>;
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
  tooltip: PropTypes.object,
};

export default connect(selector)(Tooltip);
