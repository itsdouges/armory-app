// @flow

import type { Items, ItemStats, Skins } from 'flowTypes';
import type { EmbedProps } from 'embeds/bootstrap';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'features/Gw2/actions';
import Item from 'common/components/Item';
import applyAttributes from 'lib/gw2/itemStats';

import styles from './styles.less';

function mapStateToProps (state) {
  return {
    items: state.items,
    skins: state.skins,
    itemStats: state.itemStats,
  };
}

type Props = {
  items: Items,
  skins: Skins,
  itemStats: ItemStats,
  fetchItems: (ids: Array<number>) => void,
  fetchSkins: (ids: Array<number>) => void,
  fetchItemStats: (ids: Array<number>) => void,
  ids: Array<number>,
  mode?: 'rune' | 'item',
  statIds: { [key: number]: number },
  skinIds: { [key: number]: number },
} & EmbedProps;

export default connect(mapStateToProps, {
  fetchItems: actions.fetchItems,
  fetchSkins: actions.fetchSkins,
  fetchItemStats: actions.fetchItemStats,
})(
class ItemsEmbed extends Component<Props> {
  props: Props;

  static renderItem (
    id,
    mode,
    statId,
    items,
    itemStats,
    blankText,
    index,
    size,
    skins,
    skinId,
    props,
  ) {
    if (id < 0) {
      return <Item key={`${index}-${id}`} tooltipTextOverride={blankText} size={size} />;
    }

    const selectedStat = statId && itemStats && itemStats[statId];
    const item = items && items[id];

    // TODO: Move this into a custom reducer.
    // See: https://github.com/madou/armory-react/issues/243
    if (item && selectedStat && item.details && !item.details.infix_upgrade_applied) {
      const attributes = applyAttributes(item, selectedStat);

      item.name = `${selectedStat.name} ${item.name}`;
      item.details.infix_upgrade = {
        id: selectedStat.id,
        attributes,
      };
      item.details.infix_upgrade_applied = true;
    }

    return (
      <Item
        key={`${index}-${id}`}
        item={item}
        skin={skins[skinId]}
        name={mode === 'rune' ? 'Rune' : undefined}
        tooltipType={mode === 'rune' ? 'amulets' : undefined}
        className={styles.item}
        size={size}
        {...props}
      />
    );
  }

  componentWillMount () {
    const { ids, skinIds, statIds, fetchItems, fetchItemStats, fetchSkins } = this.props;

    fetchItems(ids);
    fetchItemStats(Object.values(statIds).map((id) => +id));
    fetchSkins(Object.values(skinIds).map((id) => +id));
  }

  render () {
    const { ids, statIds, items, itemStats, className, mode, blankText, size, skins, skinIds, ...props } = this.props;

    return (
      <div className={className}>
        {ids.map((id, index) => ItemsEmbed.renderItem(
          id,
          mode,
          statIds[id],
          items,
          itemStats,
          blankText,
          index,
          size,
          skins,
          skinIds[id],
          props,
        ))}
      </div>
    );
  }
}
);
