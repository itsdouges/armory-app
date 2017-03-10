// @flow

import { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'features/Gw2/actions';
import Item from 'features/Character/components/Item';

function mapStateToProps (state) {
  return {
    items: state.items,
    bags: (state.characters.data[state.characters.selected] || {}).bags || [],
  };
}

@connect(mapStateToProps, {
  fetchItems: actions.fetchITems,
})
export default class Bags extends Component {
  componentWillMount () {

  }

  componentWillRecieveProps (nextProps) {
    if (this.props.bags !== nextProps.bags) {
      this.fetchItems(nextProps.bags);
    }
  }

  fetchItems (items) {

  }

  render () {
    const { bags, items } = this.props;

    return (
      <div>
        {bags.map((bag) => {
          if (!bag) return null;

          return (
            <div key={bag.id}>
              <Item item={items[bag.id]} />
            </div>
          );
        })}
      </div>
    );
  }
}
