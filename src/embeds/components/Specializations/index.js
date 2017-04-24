// @flow

import type { Specializations, Traits } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'features/Gw2/actions';
import Specialization from 'features/Character/components/Specialization';

function mapStateToProps (state) {
  return {
    specializations: state.specializations,
    traits: state.traits,
  };
}

type Props = {
  specializations?: Specializations,
  traits?: Traits,
  fetchSpecializations?: (ids: Array<number>) => void,
  specs: Array<{
    id: number,
    traits?: Array<number>,
  }>,
  className?: string,
};

@connect(mapStateToProps, {
  fetchSpecializations: actions.fetchSpecializations,
})
export default class SkillsEmbed extends Component {
  props: Props;

  componentWillMount () {
    const { specs, fetchSpecializations } = this.props;

    fetchSpecializations && fetchSpecializations(specs.map((spec) => spec.id));
  }

  render () {
    const { specs, specializations = {}, traits = {}, className } = this.props;

    return (
      <div className={className}>
        {specs.map((spec) => (
          <Specialization
            data={spec}
            key={spec.id}
            specializations={specializations}
            traits={traits}
          />
        ))}
      </div>
    );
  }
}
