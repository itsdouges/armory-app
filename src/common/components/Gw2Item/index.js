// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Item from 'features/Character/components/Item';
import actions from 'features/Gw2/actions';

export const selector = createSelector(
  (state, props) => state.items[props.id],
  (item) => ({
    item,
  })
);

export default connect(selector, {
  fetch: actions.fetchItems,
})(
class Gw2Item extends Component {
  props: {
    id: number,
    fetch: ([number]) => void,
  };

  componentWillMount () {
    this.props.fetch([this.props.id]);
  }

  render () {
    return <Item {...this.props} />;
  }
}
);
