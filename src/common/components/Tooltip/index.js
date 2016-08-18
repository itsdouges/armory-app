import { PropTypes } from 'react';
import styles from './styles.less';
import MouseFollow from '../MouseFollow';
import { connect } from 'react-redux';
import { selector } from 'features/Gw2/tooltip.reducer';

import ItemsTooltip from './Items';
import SimpleTooltip from './Simple';

const Tooltip = ({ tooltip }) => {
  if (!tooltip.show) return null;

  let content;

  switch (tooltip.type) {
    case 'items':
      content = <ItemsTooltip data={tooltip.data} />;
      break;

    case 'simple':
    default:
      content = <SimpleTooltip data={tooltip.data} />;
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
