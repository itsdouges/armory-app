import get from 'lodash/get';
import lowerFirst from 'lodash/lowerFirst';
import merge from 'lodash/merge';
import { createSelector } from 'reselect';
import T from 'i18n-react';
import { defaultCharacter } from 'flowTypes';

import {
  FETCH_CHARACTER_RESULT,
  FETCHING_CHARACTER,
  SELECT_CHARACTER,
  SELECT_CHARACTER_MODE,
  UPDATE_CHARACTER,
} from './actions';

const eliteSpecMap = {
  5: T.translate('classes.druid'),
  7: T.translate('classes.daredevil'),
  18: T.translate('classes.berserker'),
  27: T.translate('classes.dragonhunter'),
  34: T.translate('classes.reaper'),
  40: T.translate('classes.chronomancer'),
  43: T.translate('classes.scrapper'),
  48: T.translate('classes.tempest'),
  52: T.translate('classes.herald'),
};

function parseWeaponSwap (character) {
  const char = {
    ...character,
  };

  switch (char.profession) {
    case 'Warrior':
    case 'Guardian':
      char.hasWeaponSwap = true;
      break;
    default:
      char.hasWeaponSwap = false;
      break;
  }

  return char;
}

function parseCharacterUpgrades (character) {
  const char = {
    ...character,
  };

  const characterUpgrades = {};

  if (!char.equipment) {
    return char;
  }

  char.equipment = char.equipment.map((equip) => {
    const equipWithUpgradeCount = {
      ...equip,
    };

    if (!equipWithUpgradeCount.upgrades) {
      return equipWithUpgradeCount;
    }

    let upgradeId;

    equipWithUpgradeCount.upgrades.forEach((upgrade) => {
      upgradeId = upgrade;

      if (!characterUpgrades[upgradeId]) {
        characterUpgrades[upgradeId] = {
          count: 1,
        };
      } else {
        characterUpgrades[upgradeId].count += 1;
      }

      equipWithUpgradeCount.upgradeCounts = {
        ...equipWithUpgradeCount.upgradeCounts,
        [upgradeId]: characterUpgrades[upgradeId],
      };
    });

    return equipWithUpgradeCount;
  });

  return char;
}

function parseEquipment (character) {
  return {
    ...character,
    equipment: (character.equipment || []).reduce((obj, equip) => ({
      ...obj,
      [lowerFirst(equip.slot)]: equip,
    }), {}),
    equipmentRaw: character.equipment || [],
  };
}

function parseCharacter (character) {
  let char = parseCharacterUpgrades(character);
  char = parseEquipment(char);
  char = parseWeaponSwap(char);

  return char;
}

function extractEliteSpecialization (character, mode) {
  return get(character, `specializations[${mode}]`, [])
    .reduce((acc, spec) => (spec && eliteSpecMap[spec.id]) || acc, character.profession);
}

const getCharacter = (state) => state.characters.data[state.characters.selected];

const mergeEliteSpec = (character, mode = 'pve') => (character && {
  ...defaultCharacter,
  ...character,
  // This is set because we still need to use profession for icons.
  eliteSpecialization: extractEliteSpecialization(character, mode),
});

export const topSelector = createSelector(
  getCharacter,
  (state) => state.characters.mode,
  (state) => state.titles[get(getCharacter(state), 'title', '')],
  (character, mode, title) => ({
    character: mergeEliteSpec(character, mode),
    mode,
    title,
  })
);

export const overviewSelector = createSelector(
  getCharacter,
  (state) => state.items,
  (state) => state.skins,
  (state) => state.specializations,
  (state) => state.traits,
  (state) => state.skills,
  (state) => state.amulets,
  (state) => state.pets,
  (character, items, skins, specializations, traits, skills, amulets, pets) => ({
    character: mergeEliteSpec(character),
    items,
    skins,
    specializations,
    traits,
    skills,
    amulets,
    pets,
  })
);

export const minimalSelector = createSelector(
  (state, props) => state.characters.data[props.name],
  (state) => state.items,
  (state) => state.skins,
  (character, items, skins) => ({
    character: mergeEliteSpec(character),
    items,
    skins,
  })
);

export const defaultState = {
  data: {},
  selected: '',
  fetching: false,
};

export default function reducer (state, action) {
  switch (action.type) {
    case FETCH_CHARACTER_RESULT: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.name]: parseCharacter(action.payload.data),
        },
      };
    }

    case FETCHING_CHARACTER:
      return {
        ...state,
        fetching: action.payload,
      };

    case SELECT_CHARACTER:
      return {
        ...state,
        mode: 'pve',
        selected: action.payload,
      };

    case SELECT_CHARACTER_MODE:
      return {
        ...state,
        mode: action.payload,
      };

    case UPDATE_CHARACTER: {
      const characterUpdate = {
        [action.payload.name]: {
          authorization: action.payload.authorization,
        },
      };

      return merge({}, state, { data: characterUpdate });
    }

    default:
      return undefined;
  }
}
