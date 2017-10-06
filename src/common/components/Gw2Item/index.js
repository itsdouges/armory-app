// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import get from 'lodash/get';

import Item from 'common/components/Item';
import actions from 'features/Gw2/actions';

export const selector = createSelector(
  (state, props) => state.items[props.id],
  (state, props) => get(state.calculatedItemStats, [props.id, props.statsId]),
  (item, stats) => ({
    item,
    stats,
  })
);

export default connect(selector, {
  fetch: actions.fetchItems,
})(
class Gw2Item extends Component<*> {
  props: {
    id: number,
    statsId?: number,
    fetch: ([number]) => Promise<*>,
  };

  componentDidMount () {
    this.props.fetch([this.props.id])
      .then((data) => {
        // pass rarity, level, type, to action.
      });
  }

  render () {
    return <Item {...this.props} />;
  }
}
);
