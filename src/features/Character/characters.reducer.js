import get from 'lodash/get';
import { createSelector } from 'reselect';

import {
  FETCH_CHARACTER_RESULT,
  FETCHING_CHARACTER,
  SELECT_CHARACTER,
  SELECT_CHARACTER_MODE,
} from './actions';

const eliteSpecMap = {
  5: 'Druid',
  7: 'Daredevil',
  18: 'Berserker',
  27: 'Dragonhunter',
  34: 'Reaper',
  40: 'Chronomancer',
  43: 'Scrapper',
  48: 'Tempest',
  52: 'Herald',
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
  };

  char.equipment = {
    helmAquatic: char.equipment.filter((x) => x.slot === 'HelmAquatic')[0],
    backpack: char.equipment.filter((x) => x.slot === 'Backpack')[0],
    coat: char.equipment.filter((x) => x.slot === 'Coat')[0],
    boots: char.equipment.filter((x) => x.slot === 'Boots')[0],
    gloves: char.equipment.filter((x) => x.slot === 'Gloves')[0],
    helm: char.equipment.filter((x) => x.slot === 'Helm')[0],
    leggings: char.equipment.filter((x) => x.slot === 'Leggings')[0],
    shoulders: char.equipment.filter((x) => x.slot === 'Shoulders')[0],
    accessory1: char.equipment.filter((x) => x.slot === 'Accessory1')[0],
    accessory2: char.equipment.filter((x) => x.slot === 'Accessory2')[0],
    ring1: char.equipment.filter((x) => x.slot === 'Ring1')[0],
    ring2: char.equipment.filter((x) => x.slot === 'Ring2')[0],
    amulet: char.equipment.filter((x) => x.slot === 'Amulet')[0],
    weaponAquaticA: char.equipment.filter((x) => x.slot === 'WeaponAquaticA')[0],
    weaponAquaticB: char.equipment.filter((x) => x.slot === 'WeaponAquaticB')[0],
    weaponA1: char.equipment.filter((x) => x.slot === 'WeaponA1')[0],
    weaponA2: char.equipment.filter((x) => x.slot === 'WeaponA2')[0],
    weaponB1: char.equipment.filter((x) => x.slot === 'WeaponB1')[0],
    weaponB2: char.equipment.filter((x) => x.slot === 'WeaponB2')[0],
    sickle: char.equipment.filter((x) => x.slot === 'Sickle')[0],
    pick: char.equipment.filter((x) => x.slot === 'Pick')[0],
    axe: char.equipment.filter((x) => x.slot === 'Axe')[0],
  };

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
  store => store.characters.data[store.characters.selected],
  store => {
    const user = store.users.data[store.users.selected];
    return user && user.characters;
  },
  store => store.items,
  store => store.skins,
  store => store.specializations,
  store => store.traits,
  store => store.items.fetching ||
    store.skins.fetching ||
    store.traits.fetching ||
    store.specializations.fetching,
  store => store.characters.mode,
  store => store.skills,
  // eslint-disable-next-line
  (character, characters, items, skins, specializations, traits, fetchingGw2Data, mode, skills) => ({
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

    default:
      return undefined;
  }
}
