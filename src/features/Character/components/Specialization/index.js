import styles from './styles.less';
import { PropTypes } from 'react';
import Trait from '../Trait';

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

const Specialization = ({ data, traits, specializations }) => {
  const spec = specializations[data.id] || { major_traits: [], minor_traits: [] };
  const bgStyle = getStyle(data, spec);

  return (
    <div className={styles.root}>
      <div
        className={styles.background}
        style={bgStyle}
      />

      <div
        className={styles.bigIcon}
        style={bgStyle}
      >
        <div className={styles.bigIconTop} />
        <div className={styles.bigIconBottom} />
      </div>

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
  );
};

Specialization.propTypes = {
  data: PropTypes.object,
  traits: PropTypes.object,
  specializations: PropTypes.object,
};

export default Specialization;
