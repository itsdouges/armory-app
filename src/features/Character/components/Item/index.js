// @flow

import styles from './styles.less';
import TooltipTrigger from 'common/components/TooltipTrigger';
import cx from 'classnames';

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
}: Props) => {
  if (hide) return null;

  return (
    <TooltipTrigger
      type={tooltipType || 'items'}
      data={{
        name,
        item,
        skin,
        infusions,
        upgrades,
        upgradeCounts,
        stats,
      }}
    >
      <div className={cx(styles.root, styles[`${type}Icon`], { busy, small, [styles.inline]: inline }, className)}>
        <div
          className={styles.item}
          style={{ backgroundImage: `url(${skin.icon || item.icon || ''})` }}
        />
      </div>
    </TooltipTrigger>
  );
};

export default Item;
