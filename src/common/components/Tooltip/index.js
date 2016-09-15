import { PropTypes } from 'react';
import styles from './styles.less';
import MouseFollow from '../MouseFollow';
import { connect } from 'react-redux';
import { selector } from 'features/Gw2/tooltip.reducer';

import ItemTooltip from './Item';
import SkillTooltip from './Skill';
import SimpleTooltip from './Simple';
import Background from './Background';

const Tooltip = ({ tooltip }) => {
  if (!tooltip.show) return null;

  let content;

  switch (tooltip.type) {
    case 'items':
      content = <ItemTooltip data={tooltip.data} />;
      break;

    case 'trait':
    case 'skill':
      content = <SkillTooltip data={tooltip.data} />;
      break;

    case 'simple':
    default:
      content = <Background><SimpleTooltip data={tooltip.data} /></Background>;
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
