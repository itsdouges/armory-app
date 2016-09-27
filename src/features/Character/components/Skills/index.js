import { PropTypes } from 'react';
import get from 'lodash/get';
import cx from 'classnames';

import TooltipTrigger from 'common/components/TooltipTrigger';
import Icon from 'common/components/Icon';
import styles from './styles.less';

const Skill = ({ data, className }) => (
  <TooltipTrigger type="skill" data={data || 'No Skill Selected'}>
    <Icon src={get(data, 'icon')} size="medium" className={cx(styles.skill, className)} />
  </TooltipTrigger>
);

Skill.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
};

const Skills = ({ skills, characterSkills }) => {
  const utilities = get(characterSkills, 'utilities', [undefined, undefined, undefined]);

  return (
    <div className={styles.root}>
      <Skill data={skills[characterSkills.heal]} className={styles.heal} />

      {utilities.map((id, index) => <Skill key={id || index} data={skills[id]} />)}

      <Skill data={skills[characterSkills.elite]} className={styles.elite} />
    </div>
  );
};

Skills.propTypes = {
  skills: PropTypes.object,
  characterSkills: PropTypes.object,
};

export default Skills;
