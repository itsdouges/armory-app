// @flow

import type { EmbedProps } from 'embeds/bootstrap';

import React from 'react';
import Item from 'common/components/Item';
import Gw2Item from 'common/components/Gw2Item';
import styles from './styles.less';

type Props = {
  ids: Array<number>,
  mode?: 'rune' | 'item',
  statIds: { [key: number]: number },
  skinIds: { [key: number]: number },
} & EmbedProps;

const ItemsEmbed = ({
  ids,
  statIds,
  items,
  itemStats,
  className,
  mode,
  blankText,
  size,
  skins,
  skinIds,
  ...props
}: Props) => (
  <div className={className}>
    {ids.map((id, index) => {
      if (id < 0) {
        // eslint-disable-next-line react/no-array-index-key
        return <Item key={`${index}-${id}`} tooltipTextOverride={blankText} size={size} />;
      }

      return (
        <Gw2Item
          // eslint-disable-next-line react/no-array-index-key
          key={`${index}-${id}`}
          id={id}
          statsId={statIds[id]}
          skinId={skinIds[id]}
          name={mode === 'rune' ? 'Rune' : undefined}
          tooltipType={mode === 'rune' ? 'amulets' : undefined}
          size={size}
          className={styles.item}
          {...props}
        />
      );
    })}
  </div>
);

export default ItemsEmbed;
