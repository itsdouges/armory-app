// @flow

import React from 'react';
import styles from './styles.less';
import { markup } from 'lib/gw2/parse';
import Fact from '../Fact';
import Background from '../Background';
import SimpleTooltip from '../Simple';
import get from 'lodash/get';
import parse from './parser';

type Gw2Skill = {
  name: string,
  description: string,
  title: string,
  facts: Array<any>,
};

type SkillProps = {
  data: Gw2Skill,
};

const Skill = ({ data }: SkillProps) => {
  if (!data.name) {
    return <Background><SimpleTooltip data="Skill" /></Background>;
  }
  // XXX: Hidden more then 1 skill.
  const skills = get(data, 'skills', []).slice(0, 1);

  return (
    <div>
      {skills.map((skill) => <Skill key={skill.id} data={skill} />)}

      <Background className={styles.root}>
        <div className={styles.title}>{data.name}</div>

        <div className={styles.description}>{markup(parse(data.description))}</div>

        {get(data, 'facts', []).map((fact, index) =>
          // eslint-disable-next-line react/no-array-index-key
          <Fact key={index} data={fact} />)
        }
      </Background>
    </div>
  );
};

export default Skill;
