import get from 'lodash/get';
import lowerFirst from 'lodash/lowerFirst';
import merge from 'lodash/merge';
import { createSelector } from 'reselect';
import T from 'i18n-react';

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
  const char = {
    ...character,
    equipment: character.equipment || [],
    equipmentRaw: character.equipment || [],
  };

  char.equipment = character.equipment.reduce((obj, equip) => {
    // eslint-disable-next-line
    obj[lowerFirst(equip.slot)] = equip;
    return obj;
  }, {});

  return char;
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

export const selector = createSelector(
  (store) => store.characters.data[store.characters.selected],
  (store) => {
    const user = store.users.data[store.users.selected];
    return user && user.characters;
  },
  (store) => store.items,
  (store) => store.skins,
  (store) => store.specializations,
  (store) => store.traits,
  (store) => store.items.fetching ||
    store.skins.fetching ||
    store.traits.fetching ||
    store.specializations.fetching,
  (store) => store.characters.mode,
  (store) => store.skills,
  (store) => store.amulets,
  (store) => store.pets,
  (store) => store.titles[get(store.characters.data, `[${store.characters.selected}].title`, '')],
  // eslint-disable-next-line
  (character, characters, items, skins, specializations, traits, fetchingGw2Data, mode, skills, amulets, pets, title) => ({
    character: character && {
      ...character,
      eliteSpecialization: extractEliteSpecialization(character, mode),
    },
    characters,
    items,
    skins,
    specializations,
    traits,
    fetchingGw2Data,
    mode,
    skills,
    amulets,
    pets,
    title,
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
