// @flow

import type { Items } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'features/Gw2/actions';
import Item from 'features/Character/components/Item';

import styles from './styles.less';

function mapStateToProps (state) {
  return {
    items: state.items,
  };
}

type Props = {
  items?: Items,
  fetchItems?: (ids: Array<number>) => void,
  ids: Array<number>,
  className?: string,
  mode?: 'rune' | 'item',
};

@connect(mapStateToProps, {
  fetchItems: actions.fetchItems,
})
export default class ItemsEmbed extends Component {
  props: Props;

  componentWillMount () {
    const { ids, fetchItems } = this.props;

    fetchItems && fetchItems(ids);
  }

  render () {
    const { ids, items, className, mode } = this.props;

    return (
      <div className={className}>
        {ids.map((id) => (
          <Item
            key={id}
            item={items && items[id]}
            name={mode === 'rune' ? 'Rune' : undefined}
            tooltipType={mode === 'rune' ? 'amulets' : undefined}
            className={styles.item}
          />)
        )}
      </div>
    );
  }
}
