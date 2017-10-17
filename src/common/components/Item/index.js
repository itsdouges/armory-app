// @flow

import React from 'react';
import cx from 'classnames';
import pure from 'recompose/pure';

import TooltipTrigger from 'common/components/TooltipTrigger';
import Gw2Icon from 'common/components/Gw2Icon';
import Icon from 'common/components/Icon';
import ResourceLink, { buildLink as buildDefaultLink } from 'common/components/ResourceLink';

import styles from './styles.less';

const buildLink = (inlineText, { name, id }) => {
  switch (inlineText) {
    case 'gw2spidy':
      return `https://www.gw2spidy.com/item/${id || ''}`;

    default:
      return buildDefaultLink(inlineText, name);
  }
};

type Props = {
  type?: string,
  busy?: boolean,
  name?: string,
  item?: {
    icon?: string,
    name?: string,
    id?: number,
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
  count?: number,
  onClick?: (SyntheticEvent<*>) => void,
  size?: number,
  inlineText?: string,
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
  count,
  onClick,
  size,
  inlineText,
  ...props
}: Props) => {
console.log('=========================================');

  if (hide) return null;

  // $FlowFixMe
  const error = item && item.error;
  const itemLoaded = !error && !!Object.keys(item).length;
  let tooltipData;

  if (error) {
    tooltipData = error;
  } else if (tooltipType === 'skins') {
    tooltipData = {
      skin,
    };
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
      count,
    };
  } else {
    tooltipData = name;
  }

console.log('-----------------------------');
  return (
    <TooltipTrigger
      type={tooltipType || 'items'}
      data={tooltipTextOverride || tooltipData}
      {...props}
    >
      <ResourceLink text={item.name} href={buildLink(inlineText, item)}>
        <Icon
          name={type && `${type}-slot-icon.png`}
          className={cx(styles.root, className, {
            [styles.busy]: busy,
            [styles.small]: small,
            [styles.emptyBg]: !type && !itemLoaded,
            [styles.inline]: inline,
          })}
          onClick={onClick}
          sizePx={size}
        >
          <Gw2Icon
            count={count}
            className={styles.item}
            src={skin.icon || item.icon || ''}
          />
        </Icon>
      </ResourceLink>
    </TooltipTrigger>
  );
};

export default pure(Item);
