// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import cx from 'classnames';

import { showTooltip } from 'features/Gw2/actions';
import ArmoryBadge from 'common/components/ArmoryBadge';
import MouseFollow from '../MouseFollow';
import AmuletTooltip from './Amulet';
import ItemTooltip from './Item';
import SkillTooltip from './Skill';
import SimpleTooltip from './Simple';
import Background from './Background';
import styles from './styles.less';

const selector = createSelector(
  (state) => state.tooltip,
  (tooltip) => ({
    tooltip,
  })
);

type Props = {
  tooltip?: {
    show: boolean,
    type: string,
    data: Object,
  },
  showTooltip?: () => void,
  showBadge?: boolean,
  className?: string,
};

@connect(selector, {
  showTooltip,
})
export default class Tooltip extends Component {
  props: Props;

  close = () => {
    this.props.showTooltip && this.props.showTooltip(false);
  };

  render () {
    const { tooltip, showBadge, className } = this.props;

    if (!tooltip || !tooltip.show) return null;

    let content;

    if (typeof tooltip.data === 'string') {
      content = <Background><SimpleTooltip data={tooltip.data} /></Background>;
    } else {
      switch (tooltip.type) {
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
      }
    }

    return (
      <MouseFollow onTouchEnd={this.close}>
        <div className={cx(styles.root, className)}>
          {content}
          {showBadge && <ArmoryBadge />}
        </div>
      </MouseFollow>
    );
  }
}
