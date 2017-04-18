// @flow

import type { Traits } from 'flowTypes';
import type { EmbedProps } from 'embeds/bootstrap';

import { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'features/Gw2/actions';
import Trait from 'features/Character/components/Trait';

function mapStateToProps (state) {
  return {
    traits: state.traits,
  };
}

type Props = EmbedProps & {
  traits?: Traits,
  fetchTraits?: (ids: Array<number>) => void,
  ids: Array<number>,
  className?: string,
};

@connect(mapStateToProps, {
  fetchTraits: actions.fetchTraits,
})
export default class TraitsEmbed extends Component {
  props: Props;

  static renderTrait (id, traits, blankText) {
    if (id >= 0) {
      return (
        <Trait
          active
          key={id}
          data={traits && traits[id]}
        />
      );
    }

    return <Trait active tooltipTextOverride={blankText} />;
  }

  componentWillMount () {
    const { ids, fetchTraits } = this.props;

    fetchTraits && fetchTraits(ids);
  }

  render () {
    const { ids, traits, className, blankText } = this.props;

    return (
      <div className={className}>
        {ids.map((id) => TraitsEmbed.renderTrait(id, traits, blankText))}
      </div>
    );
  }
}
