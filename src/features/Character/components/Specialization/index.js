// @flow

import type { Specializations, Traits } from 'flowTypes';

import cx from 'classnames';

import styles from './styles.less';
import Trait from '../Trait';
import SpecializationIcon from '../SpecializationIcon';

const getTrait = (id, traits, error) => (traits && traits[id]) || { error };
const isActive = (id, { traits }) => traits.indexOf(id) >= 0;
const layoutTraits = (ids, traits, error) => ids.map((id, index) =>
  <Trait
    key={id || index}
    data={getTrait(id, traits, error)}
    active={isActive(id, traits)}
  />
);

const getStyle = (data, spec) => ({
  backgroundImage: `url(${spec.background})`,
});

const emptyMajorTraits = Array(9).fill(undefined);

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
  const specialization = specializations[data.id] || {};
  const minorTraits = specialization.minor_traits || {};
  const majorTraits = specialization.major_traits || emptyMajorTraits;
  const error = specialization.error && specialization.error;

  return (
    <div className={cx(styles.rootOverflow, styles[size])}>
      <div className={styles.root}>
        <div
          className={styles.background}
          style={getStyle(data, specialization)}
        />

        <SpecializationIcon
          data={specialization}
          className={styles.bigIcon}
        />

        <Trait
          active
          className={styles.minorTraitColumn}
          data={getTrait(minorTraits[0], traits, error)}
        />

        <div className={styles.majorTraitColumn}>
          {layoutTraits(majorTraits.slice(0, 3), data, error)}
        </div>

        <Trait
          active
          className={styles.minorTraitColumn}
          data={getTrait(minorTraits[1], traits, error)}
        />

        <div className={styles.majorTraitColumn}>
          {layoutTraits(majorTraits.slice(3, 6), data, error)}
        </div>

        <Trait
          active
          className={styles.minorTraitColumn}
          data={getTrait(minorTraits[2], traits, error)}
        />

        <div className={styles.majorTraitColumn}>
          {layoutTraits(majorTraits.slice(6, 9), data, error)}
        </div>
      </div>
    </div>
  );
};

export default Specialization;
