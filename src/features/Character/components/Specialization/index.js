// @flow

import type { Specializations, Traits } from 'flowTypes';

import cx from 'classnames';

import styles from './styles.less';
import Trait from '../Trait';
import BigTrait from '../BigTrait';

function getStyle (data, spec) {
  return {
    backgroundImage: `url(${spec.background})`,
  };
}

function getTrait (traits, id) {
  return (traits && traits[id]) || {};
}

function isActive (id, { traits }) {
  return traits.indexOf(id) >= 0;
}

type Props = {
  data: {
    id: number,
    traits: Array<number>,
  },
  traits: Traits,
  specializations: Specializations,
  size?: 'compact' | 'small' | 'large',
};

const Specialization = ({ data, traits, specializations, size = 'large' }: Props) => {
  const spec = specializations[data.id] || { major_traits: [], minor_traits: [] };
  const bgStyle = getStyle(data, spec);

  return (
    <div className={cx(styles.rootOverflow, styles[size])}>
      <div className={styles.root}>
        <div
          className={styles.background}
          style={bgStyle}
        />

        <BigTrait className={styles.bigIcon} name={spec.name} image={spec.background} />

        <Trait
          active
          className={styles.minorTraitColumn}
          data={getTrait(traits, spec.minor_traits[0])}
        />

        <div className={styles.majorTraitColumn}>
          {spec.major_traits.slice(0, 3).map((id) =>
            <Trait key={id} data={getTrait(traits, id)} active={isActive(id, data)} />)}
        </div>

        <Trait
          active
          className={styles.minorTraitColumn}
          data={getTrait(traits, spec.minor_traits[1])}
        />

        <div className={styles.majorTraitColumn}>
          {spec.major_traits.slice(3, 6).map((id) =>
            <Trait key={id} data={getTrait(traits, id)} active={isActive(id, data)} />)}
        </div>

        <Trait
          active
          className={styles.minorTraitColumn}
          data={getTrait(traits, spec.minor_traits[2])}
        />

        <div className={styles.majorTraitColumn}>
          {spec.major_traits.slice(6, 9).map((id) =>
            <Trait key={id} data={getTrait(traits, id)} active={isActive(id, data)} />)}
        </div>
      </div>
    </div>
  );
};

export default Specialization;
