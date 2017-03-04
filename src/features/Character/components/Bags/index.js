// @flow

import { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'features/Gw2/actions';

function mapStateToProps (state) {
  return {
    items: state.items,
    bags: state.characters.data[state.characters.selected].bags,
  };
}

@connect(mapStateToProps, {
  fetchItems: actions.fetchITems,
})
export default class Bags extends Component {
  componentWillMount () {

  }

  render () {
    return (
      <div>
        woo
      </div>
    );
  }
}
