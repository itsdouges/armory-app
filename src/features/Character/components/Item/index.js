// @flow

import cx from 'classnames';

import TooltipTrigger from 'common/components/TooltipTrigger';
import Icon from 'common/components/Icon';
import styles from './styles.less';

type Props = {
  type?: string,
  busy?: boolean,
  name?: string,
  item?: {
    icon?: string,
  },
  skin?: {
    icon?: string,
  },
  upgrades?: [],
  infusions?: [],
  stats?: {},
  upgradeCounts?: {},
  hide?: boolean,
  small?: boolean,
  size?: 'micro' | 'small',
  tooltipType?: string,
  className?: string,
  tooltipTextOverride?: string,
  equipped?: boolean,
  inline?: boolean,
};

const Item = ({
  type = '',
  busy,
  name,
  item = {},
  skin = {},
  upgrades = [],
  infusions = [],
  stats = {},
  upgradeCounts = {},
  hide,
  small,
  tooltipType,
  className,
  inline,
  tooltipTextOverride,
  equipped,
}: Props) => {
  if (hide) return null;

  // $FlowFixMe
  const error = item && item.error;
  const itemLoaded = !!Object.keys(item).length;

  let tooltipData;

  if (error) {
    tooltipData = error;
  } else if (itemLoaded) {
    tooltipData = {
      name,
      item,
      skin,
      infusions,
      upgrades,
      upgradeCounts,
      stats,
      equipped,
    };
  }

  return (
    <TooltipTrigger
      type={tooltipType || 'items'}
      data={tooltipTextOverride || tooltipData}
    >
      <Icon
        name={type ? `${type}-slot-icon.png` : 'empty-skill-back.png'}
        className={cx(styles.root, className, {
          [styles.busy]: busy,
          [styles.small]: small,
          [styles.emptyBg]: !type && !itemLoaded,
          [styles.inline]: inline,
        })}
      >
        <Icon
          className={styles.item}
          src={skin.icon || item.icon || ''}
        />
      </Icon>
    </TooltipTrigger>
  );
};

export default Item;
