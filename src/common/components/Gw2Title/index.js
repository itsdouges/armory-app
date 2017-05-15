// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import TooltipTrigger from 'common/components/TooltipTrigger';
import Icon from 'common/components/Icon';
import actions from 'features/Gw2/actions';
import T from 'i18n-react';

const selector = createSelector(
  (state, props) => state.titles[props.id] || { name: '...' },
  (title) => ({
    title,
  })
);

export default connect(selector, {
  fetch: actions.fetchTitles,
})(
class Gw2Title extends Component {
  props: {
    id: number,
    title: { name: string },
    fetch: ([number]) => void,
  };

  componentWillMount () {
    this.props.fetch([this.props.id]);
  }

  render () {
    return (
      <TooltipTrigger data={`${T.translate('words.title')}: ${this.props.title.name}`}>
        <Icon name="title-crown.png" sizePx={32} />
      </TooltipTrigger>
    );
  }
}
);
