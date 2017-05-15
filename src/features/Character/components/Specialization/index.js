// @flow

import type { Specializations, Traits } from 'flowTypes';

import colours from 'common/styles/colours';
import styles from './styles.less';
import Trait from '../Trait';
import SpecializationIcon from '../SpecializationIcon';
import { makeStubItems } from 'lib/paginator';

const getTrait = (id, traits, error) => (traits && traits[id]) || { error };
const isActive = (id, { traits }) => (traits || []).indexOf(id) >= 0;
const layoutTraits = (ids, traits, data, error) => ids.map((id, index) =>
  <Trait
    key={id || index}
    data={getTrait(id, traits, error)}
    active={isActive(id, data)}
  />
);

const getStyle = (data, spec) => ({
  backgroundImage: `url(${spec.background || ''})`,
  backgroundColor: spec.background && colours._black,
});

const emptyTraits = makeStubItems(9).rows;

type Props = {
  data: {
    id: number,
    traits?: Array<number>,
  },
  traits: Traits,
  specializations: Specializations,
};

const Specialization = ({ data, traits, specializations }: Props) => {
  const specialization = specializations[data.id] || {};
  const minorTraits = specialization.minor_traits || emptyTraits;
  const majorTraits = specialization.major_traits || emptyTraits;
  const error = specialization.error && specialization.error;

  return (
    <div className={styles.root}>
      <div
        className={styles.background}
        style={getStyle(data, specialization)}
      />

      <SpecializationIcon
        data={specialization}
        className={styles.bigIcon}
      />

      <div className={styles.traits}>
        <Trait
          active
          className={styles.minorTraitColumn}
          data={getTrait(minorTraits[0], traits, error)}
        />

        <div className={styles.majorTraitColumn}>
          {layoutTraits(majorTraits.slice(0, 3), traits, data, error)}
        </div>

        <Trait
          active
          className={styles.minorTraitColumn}
          data={getTrait(minorTraits[1], traits, error)}
        />

        <div className={styles.majorTraitColumn}>
          {layoutTraits(majorTraits.slice(3, 6), traits, data, error)}
        </div>

        <Trait
          active
          className={styles.minorTraitColumn}
          data={getTrait(minorTraits[2], traits, error)}
        />

        <div className={styles.majorTraitColumn}>
          {layoutTraits(majorTraits.slice(6, 9), traits, data, error)}
        </div>
      </div>
    </div>
  );
};

export default Specialization;
