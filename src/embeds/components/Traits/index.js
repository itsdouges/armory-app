// @flow

import type { Traits } from 'flowTypes';
import type { EmbedProps } from 'embeds/bootstrap';

import React, { Component } from 'react';
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

export default connect(mapStateToProps, {
  fetchTraits: actions.fetchTraits,
})(
class TraitsEmbed extends Component<Props> {
  props: Props;

  static renderTrait (id, traits, blankText, size, props) {
    if (id >= 0) {
      return (
        <Trait
          active
          key={id}
          data={traits && traits[id]}
          size={size}
          {...props}
        />
      );
    }

    return <Trait active tooltipTextOverride={blankText} size={size} key={blankText} />;
  }

  componentWillMount () {
    const { ids, fetchTraits } = this.props;

    fetchTraits && fetchTraits(ids);
  }

  render () {
    const { ids, traits, className, blankText, size, ...props } = this.props;

    return (
      <div className={className}>
        {ids.map((id) => TraitsEmbed.renderTrait(id, traits, blankText, size, props))}
      </div>
    );
  }
}
);
