// @flow

import type { Skills } from 'flowTypes';
import type { EmbedProps } from 'embeds/bootstrap';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions } from 'armory-component-ui';
import Skill from 'features/Character/components/Skill';

import styles from './styles.less';

function mapStateToProps (state) {
  return {
    skills: state.skills,
  };
}

type Props = EmbedProps & {
  skills?: Skills,
  fetchSkills?: (ids: Array<number>) => void,
  ids: Array<number>,
};

export default connect(mapStateToProps, {
  fetchSkills: actions.fetchSkills,
})(
class SkillsEmbed extends Component<Props> {
  props: Props;

  static renderSkill (id, skills, blankText, size, props) {
    if (id >= 0) {
      return (
        <Skill
          key={id}
          className={styles.skill}
          data={skills && skills[id]}
          size={size}
          {...props}
        />
      );
    }

    return <Skill tooltipTextOverride={blankText} size={size} key={blankText} />;
  }

  componentWillMount () {
    const { ids, fetchSkills } = this.props;

    fetchSkills && fetchSkills(ids);
  }

  render () {
    const { ids, skills, className, blankText, size, ...props } = this.props;

    return (
      <div className={className}>
        {ids.map((id) => SkillsEmbed.renderSkill(id, skills, blankText, size, props))}
      </div>
    );
  }
}
);
