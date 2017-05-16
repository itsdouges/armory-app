// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import TooltipTrigger from 'common/components/TooltipTrigger';
import actions from 'features/Gw2/actions';
import Icon from 'common/components/Icon';

const defaultSkin = {};

export const selector = createSelector(
  (state, props) => state.skins[props.id] || defaultSkin,
  (skin) => ({
    skin,
  })
);

export default connect(selector, {
  fetch: actions.fetchSkins,
})(
class Gw2Skin extends Component {
  props: {
    id: number,
    skin: Object,
    fetch: ([number]) => void,
  };

  componentWillMount () {
    this.props.fetch([this.props.id]);
  }

  render () {
    return (
      <TooltipTrigger data={this.props.skin} type="skins">
        <Icon src={this.props.skin.icon} size="xsmall" />
      </TooltipTrigger>
    );
  }
}
);
