// @flow

import type { Items } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'features/Gw2/actions';
import Item from 'features/Character/components/Item';
import applyAttributes from 'lib/gw2/itemStats';

import styles from './styles.less';

function mapStateToProps (state) {
  return {
    items: state.items,
    itemstats: state.itemstats,
  };
}

type Props = {
  items?: Items,
  itemstats?: Items,
  fetchItems?: (ids: Array<number>) => void,
  fetchItemstats?: (ids: Array<number>) => void,
  ids: Array<number>,
  className?: string,
  mode?: 'rune' | 'item',
  statIds: { [key: number]: number },
};

@connect(mapStateToProps, {
  fetchItems: actions.fetchItems,
  fetchItemstats: actions.fetchItemstats,
})
export default class ItemsEmbed extends Component {
  props: Props;

  static renderItem (items: Items, itemstats: Items, id: number, statId?: number, mode?: 'rune' | 'item') {
    const item = Object.assign({}, items && items[id]);
    const selectedStat = statId && itemstats && itemstats[statId];

    // Apply stat on item.
    if (item && selectedStat) {
      const attributes = applyAttributes(item, selectedStat);

      item.name = `${selectedStat.name} ${item.name}`;
      item.details.infix_upgrade = {
        id: selectedStat.id,
        attributes,
      };
    }

    return (<Item
      key={id}
      item={items && items[id]}
      name={mode === 'rune' ? 'Rune' : undefined}
      tooltipType={mode === 'rune' ? 'amulets' : undefined}
      className={styles.item}
    />);
  }

  componentWillMount () {
    const { ids, statIds, fetchItems, fetchItemstats } = this.props;

    fetchItems && fetchItems(ids);
    fetchItemstats && fetchItemstats(Object.values(statIds));
  }

  render () {
    const { ids, statIds, items, itemstats, className, mode } = this.props;

    return (
      <div className={className}>
        {ids.map((id) => ItemsEmbed.renderItem(items, itemstats, id, statIds[id], mode))}
      </div>
    );
  }
}
