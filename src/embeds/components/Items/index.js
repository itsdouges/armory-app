// @flow

import type { Items, ItemStats } from 'flowTypes';
import type { EmbedProps } from 'embeds/bootstrap';

import { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'features/Gw2/actions';
import Item from 'features/Character/components/Item';
import applyAttributes from 'lib/gw2/itemStats';

import styles from './styles.less';

function mapStateToProps (state) {
  return {
    items: state.items,
    itemStats: state.itemStats,
  };
}

type Props = EmbedProps & {
  items?: Items,
  itemStats?: ItemStats,
  fetchItems?: (ids: Array<number>) => void,
  fetchItemStats?: (ids: Array<number>) => void,
  ids: Array<number>,
  mode?: 'rune' | 'item',
  statIds: { [key: number]: number },
};

@connect(mapStateToProps, {
  fetchItems: actions.fetchItems,
  fetchItemStats: actions.fetchItemStats,
})
export default class ItemsEmbed extends Component {
  props: Props;

  static renderItem (
    id: number,
    mode?: 'rune' | 'item',
    statId?: number,
    items?: Items,
    itemStats?: ItemStats,
    blankText: string,
    index: number,
    size,
  ) {
    if (id < 0) {
      return <Item key={`${index}-${id}`} tooltipTextOverride={blankText} size={size} />;
    }

    const selectedStat = statId && itemStats && itemStats[statId];
    const item = items && items[id];
    if (!item) {
      return null;
    }

    // TODO: Move this into a custom reducer.
    // See: https://github.com/madou/armory-react/issues/243
    if (selectedStat && item.details && !item.details.infix_upgrade_applied) {
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
        name={mode === 'rune' ? 'Rune' : undefined}
        tooltipType={mode === 'rune' ? 'amulets' : undefined}
        className={styles.item}
        size={size}
      />
    );
  }

  componentWillMount () {
    const { ids, statIds, fetchItems, fetchItemStats } = this.props;

    fetchItems && fetchItems(ids);
    fetchItemStats && fetchItemStats(Object.values(statIds).map((id) => +id));
  }

  render () {
    const { ids, statIds, items, itemStats, className, mode, blankText, size } = this.props;

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
        ))}
      </div>
    );
  }
}
