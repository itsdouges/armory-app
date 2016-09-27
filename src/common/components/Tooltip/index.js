import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import styles from './styles.less';

import { showTooltip } from 'features/Gw2/actions';

import MouseFollow from '../MouseFollow';

import AmuletTooltip from './Amulet';
import ItemTooltip from './Item';
import SkillTooltip from './Skill';
import SimpleTooltip from './Simple';
import Background from './Background';

const selector = createSelector(
  state => state.tooltip,
  (tooltip) => ({
    tooltip,
  })
);

class Tooltip extends Component {
  static propTypes = {
    tooltip: PropTypes.object,
    dispatch: PropTypes.func,
  };

  close = () => {
    this.props.dispatch(showTooltip(false));
  };

  render () {
    const { tooltip } = this.props;

    if (!tooltip.show) return null;

    let content;

    const type = typeof tooltip.data === 'string' ? 'simple' : tooltip.type;

    switch (type) {
      case 'items':
        content = <ItemTooltip data={tooltip.data} />;
        break;

      case 'amulets':
        content = <AmuletTooltip data={tooltip.data} />;
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
      <MouseFollow onTouchEnd={this.close}>
        <div className={styles.root}>
          {content}
        </div>
      </MouseFollow>
    );
  }
}

export default connect(selector)(Tooltip);
