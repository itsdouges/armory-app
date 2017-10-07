// @flow

import type { Item as ItemType } from 'flowTypes';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import get from 'lodash/get';

import Item from '../Item';
import actions from 'features/Gw2/actions';

export const selector = createSelector(
  (state, props) => {
    const item = state.items[props.id];
    const stat = get(state.calculatedItemStats, `${props.id}${props.statsId}`);

    if (item && item.details && !stat && props.statsId) {
      // We have an item.
      // We know we will have a stat, but just not yet.
      return {
        ...item,
        name: `Loading... ${item.name}`,
      };
    }

    if (item && stat && item.details) {
      return {
        ...item,
        name: `${stat.name} ${item.name}`,
        details: {
          ...item.details,
          infix_upgrade: stat,
        },
      };
    }

    return item;
  },
  (item) => ({
    item,
  })
);

export default connect(selector, {
  fetch: actions.fetchItems,
  fetchCalculatedItemStats: actions.fetchCalculatedItemStats,
})(
class Gw2Item extends Component<*> {
  props: {
    id: number,
    statsId?: number,
    fetch: ([number]) => Promise<*>,
    fetchCalculatedItemStats: (Array<Object>) => Promise<*>,
    item?: ItemType,
  };

  componentDidMount () {
    this.props.fetch([this.props.id])
      .then(() => {
        const { item, id, statsId, fetchCalculatedItemStats } = this.props;
        if (!item || !statsId) {
          return;
        }

        const type = (item.details && item.details.type) || item.type;

        const statsDef = {
          // TODO: This is pretty terrible. We need the system to properly support
          // calculated ids instead of relying on this. Why? Because it means
          // every consumer needs to do this. Leaky abstraction! Not good!
          calculatedId: `${id}${statsId}`,
          id: statsId,
          itemId: id,
          type,
          rarity: item.rarity,
          level: item.level,
        };

        fetchCalculatedItemStats([statsDef]);
      });
  }

  render () {
    return <Item {...this.props} />;
  }
}
);
