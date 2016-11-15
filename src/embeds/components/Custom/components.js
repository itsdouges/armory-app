// @flow

import get from 'lodash/get';

import ContentCard from 'common/components/ContentCard';
import Portrait from 'features/Character/components/Portrait';
import PvpEquipment from 'features/Character/components/PvpEquipment';
import Specialization from 'features/Character/components/Specialization';
import Skills from 'features/Character/components/Skills';

export default {
  contentCard: ({ character }) => <ContentCard key="badge" type="characters" content={character} />,

  portrait: ({ character }) => <Portrait key="portrait" character={character} />,

  pvpEquipment: ({ character, props }) => {
    const profession = get(character, 'profession');
    const equipment = get(character, 'equipment', {});
    const pvpEquipment = get(character, 'equipment_pvp', { sigils: [] });

    return (
      <PvpEquipment
        key="pvpEquipment"
        equipment={equipment}
        pvpEquipment={pvpEquipment}
        items={props.items} // eslint-disable-line react/prop-types
        skins={props.skins} // eslint-disable-line react/prop-types
        amulets={props.amulets} // eslint-disable-line react/prop-types
        profession={profession}
      />
    );
  },

  specializations: ({ character, props }) => {
    // eslint-disable-next-line react/prop-types
    const characterSpecializations = get(character, `specializations[${props.mode}]`, [{}, {}, {}]);
    const specializations = get(props, 'specializations', {});
    const traits = get(props, 'traits', {});

    return (
      <div key="specs">
        {characterSpecializations.map((data, index) =>
          data && <Specialization
            key={(data.id) || index}
            size="small"
            data={data}
            specializations={specializations} // eslint-disable-line react/prop-types
            traits={traits} // eslint-disable-line react/prop-types
          />)}
      </div>
    );
  },

  skills: ({ character, props }) => {
    // eslint-disable-next-line react/prop-types
    const characterSkills = get(character, `skills[${props.mode}]`, {});

    // eslint-disable-next-line react/prop-types
    return <Skills key="skills" skills={props.skills} characterSkills={characterSkills} />;
  },
};
