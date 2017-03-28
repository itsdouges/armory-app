// @flow

import type { Skills } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'features/Gw2/actions';
import Skill from 'features/Character/components/Skill';

import styles from './styles.less';

function mapStateToProps (state) {
  return {
    skills: state.skills,
  };
}

type Props = {
  skills?: Skills,
  fetchSkills?: (ids: Array<number>) => void,
  ids: Array<number>,
  className?: string,
  blankText: string,
};

@connect(mapStateToProps, {
  fetchSkills: actions.fetchSkills,
})
export default class SkillsEmbed extends Component {
  props: Props;

  static renderSkill (id, skills, blankText) {
    if (id >= 0) {
      return (
        <Skill
          className={styles.skill}
          key={id}
          data={skills && skills[id]}
        />
      );
    }

    return <Skill tooltipTextOverride={blankText} />;
  }

  componentWillMount () {
    const { ids, fetchSkills } = this.props;

    fetchSkills && fetchSkills(ids);
  }

  render () {
    const { ids, skills, className, blankText } = this.props;

    return (
      <div className={className}>
        {ids.map((id) => SkillsEmbed.renderSkill(id, skills, blankText))}
      </div>
    );
  }
}
