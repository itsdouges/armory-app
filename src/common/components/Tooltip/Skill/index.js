import { PropTypes } from 'react';

import styles from './styles.less';
import { markup } from 'lib/gw2/parse';
import Fact from '../Fact';
import Background from '../Background';

const Skill = ({ data }) => (
  <div>
    {data.skills && data.skills.map((skill) => <Skill key={skill.id} data={skill} />)}

    <Background className={styles.root}>
      <div className={styles.title}>{data.name}</div>

      <div className={styles.description}>{markup(data.description)}</div>

      {data.facts && data.facts.map((fact, index) => <Fact key={index} data={fact} />)}
    </Background>
  </div>
);

Skill.propTypes = {
  data: PropTypes.object,
};

export default Skill;
