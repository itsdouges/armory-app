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
  tooltipTextOverride,
}: Props) => {
  if (hide) return null;

  const data = item && item.error
    ? item
    : {
      name,
      item,
      skin,
      infusions,
      upgrades,
      upgradeCounts,
      stats,
    };

  return (
    <TooltipTrigger
      type={tooltipType || 'items'}
      data={tooltipTextOverride || data}
    >
      <Icon
        name={type ? `${type}-slot-icon.png` : 'empty-skill-back.png'}
        className={cx(styles.root, className, {
          [styles.busy]: busy,
          [styles.small]: small,
          [styles.emptyBg]: !type,
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
