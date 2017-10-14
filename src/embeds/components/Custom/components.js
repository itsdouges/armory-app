// @flow
/* eslint-disable react/prop-types */

import React from 'react';
import get from 'lodash/get';
import includes from 'lodash/includes';

import styles from './styles.less';
import ContentCard from 'common/components/ContentCard';
import Portrait from 'features/Character/components/Portrait';
import PvpEquipment from 'features/Character/components/PvpEquipment';
import CharacterSkills from 'features/Character/components/Skills';
import { leftItems, rightItems } from 'lib/gw2/equipment';
import { Item, Specialization } from 'armory-component-ui';

import type { Character, User, Items, Skins, Amulets, Skills, Professions } from 'flowTypes';

type Props = {
  options?: { [key: string]: any },
  character?: Character,
  user: User,
  props: {
    items: Items,
    skins: Skins,
    amulets: Amulets,
    skills: Skills,
    professions: Professions,
    mode: string,
  },
};

function getItems (ids: [] = [], props: { items: {} }) {
  return ids.map((id) => props.items[id]);
}

export default {
  contentCardU ({ user }: Props) {
    return <ContentCard key="user-badge" type="users" content={user} />;
  },

  contentCardC ({ character }: Props) {
    return <ContentCard key="character-badge" type="characters" content={character} />;
  },

  portrait ({ character }: Props) {
    return <Portrait className={styles.portrait} key="portrait" character={character} compact />;
  },

  equipment ({ character, props }: Props) {
    const equipment = get(character, 'equipment', {});
    const profession = get(character, 'profession');

    return (
      <div key="equipment" className={styles.equipment}>
        {leftItems.map((item) => {
          const equip = equipment[item.key] || {};

          return (
            <Item
              {...item}
              small
              hide={includes(item.hideForClasses, profession)}
              key={item.key}
              upgradeCounts={equip.upgradeCounts}
              upgrades={getItems(equip.upgrades, props)}
              infusions={getItems(equip.infusions, props)}
              item={props.items[equip.id]}
              skin={props.skins[equip.skin]}
              stats={equip.stats}
            />
          );
        })}

        {rightItems.map((item) => {
          const equip = equipment[item.key] || {};

          return (
            <Item
              {...item}
              small
              hide={includes(item.hideForClasses, profession)}
              key={item.key}
              upgradeCounts={equip.upgradeCounts}
              upgrades={getItems(equip.upgrades, props)}
              infusions={getItems(equip.infusions, props)}
              item={props.items[equip.id]}
              skin={props.skins[equip.skin]}
              stats={equip.stats}
            />
          );
        })}
      </div>
    );
  },

  pvpEquipment ({ character, props }: Props) {
    const profession = get(character, 'profession');
    const equipment = get(character, 'equipment', {});
    const pvpEquipment = get(character, 'equipment_pvp', { sigils: [] });

    return (
      <PvpEquipment
        key="pvpEquipment"
        display="inline"
        equipment={equipment}
        pvpEquipment={pvpEquipment}
        items={props.items}
        skins={props.skins}
        amulets={props.amulets}
        profession={profession}
      />
    );
  },

  specializations ({ character, props }: Props) {
    const characterSpecializations = get(character, `specializations[${props.mode}]`, [{}, {}, {}]);
    const specializations = get(props, 'specializations', {});
    const traits = get(props, 'traits', {});

    return characterSpecializations.map((data, index) =>
      data && <Specialization
        key={(data.id) || index}
        size="small"
        data={data}
        specializations={specializations}
        traits={traits}
      />);
  },

  skills ({ character, props }: Props, options: { showWeaponSkills?: boolean } = {}) {
    const profession = get(character, 'profession', '');
    const characterSkills = get(character, `skills[${props.mode}]`, {});
    const professionData = get(props, `professions[${profession}]`);

    return (
      <CharacterSkills
        showWeaponSkills={options.showWeaponSkills}
        character={character}
        items={props.items}
        key="skills"
        skills={props.skills}
        characterSkills={characterSkills}
        professionData={professionData}
      />
    );
  },

  allSkills (data: Props) {
    return this.skills(data, { showWeaponSkills: true });
  },
};
