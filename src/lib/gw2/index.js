import { get } from 'axios';
import config from 'env';
import {
  mapItemsToObject,
  mapSkinsToObject,

} from './parse';

export const readPvpSeason = (id) =>
  get(`${config.gw2.endpoint}v2/pvp/seasons/${id}`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => data);

export const readAllItemIds = () =>
  get(`${config.gw2.endpoint}v2/items`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => data);

export const readItems = (ids) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/items?ids=${delimitedIds}`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => {
    const items = mapItemsToObject(data);
    return Promise.resolve(items);
  });
};

export const readSkins = (ids) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/skins?ids=${delimitedIds}`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => {
    const skins = mapSkinsToObject(data);
    return skins;
  });
};

export const readSpecializations = (ids) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/specializations?ids=${delimitedIds}`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => {
    const specs = mapSkinsToObject(data);
    return specs;
  });
};

export const readTraits = (ids) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/traits?ids=${delimitedIds}`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => {
    const mappedTraits = mapSkinsToObject(data);
    return mappedTraits;
  });
};

export const readGuild = (guid) =>
  get(`${config.gw2.endpoint}v1/guild_details.json?guild_id=${guid}`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => data);

const BEGINNING_STAT = 37;
export const calculateBaseAttribute = (level) => {
  let stat = BEGINNING_STAT;

  for (let i = 2; i <= level; i += 1) {
    if (i <= 10) {
      stat += 7;
    } else if (i % 2 !== 0) {
      continue;
    } else if (i <= 20) {
      stat += 10;
    } else if (i <= 24) {
      stat += 14;
    } else if (i <= 26) {
      stat += 15;
    } else if (i <= 30) {
      stat += 16;
    } else if (i <= 40) {
      stat += 20;
    } else if (i <= 44) {
      stat += 24;
    } else if (i <= 46) {
      stat += 25;
    } else if (i <= 50) {
      stat += 26;
    } else if (i <= 60) {
      stat += 30;
    } else if (i <= 64) {
      stat += 34;
    } else if (i <= 66) {
      stat += 35;
    } else if (i <= 70) {
      stat += 36;
    } else if (i <= 74) {
      stat += 44;
    } else if (i <= 76) {
      stat += 45;
    } else {
      stat += 46;
    }
  }

  return stat;
};

export const parseUpgradeBuffs = (buffs) => {
  const bonus = {};
  const regex = /(\d+)\D?\s(\D+)/;

  buffs.forEach((buff) => {
    const result = regex.exec(buff);
    if (!result) {
      return;
    }

    const amount = result[1];
    const attribute = result[2].replace(' ', '');

    bonus[attribute] = +amount;
  });

  return bonus;
};

export const parseRuneBonuses = (bonuses, activeCount) => {
  const bonusesCopy = [
    ...bonuses,
  ];

  const activeBonuses = bonusesCopy.splice(0, activeCount);
  const bonus = parseUpgradeBuffs(activeBonuses);
  return bonus;
};

function calculateHealthBracket (profession) {
  switch (profession) {
    case 'Warrior':
    case 'Necromancer':
      return 'high';

    case 'Engineer':
    case 'Ranger':
    case 'Mesmer':
    case 'Revenant':
      return 'medium';

    case 'Guardian':
    case 'Thief':
    case 'Elementalist':
      return 'low';
  }

  console.log('Profession not handled');
  return '';
}

export const calculateBonusHealth = (level, profession) => {
  let bonusHealth = 0;
  const bracket = calculateHealthBracket(profession);

  for (let i = 1; i <= level; i++) {
    if (i <= 19) {
      switch (bracket) {
        case 'high':
          bonusHealth += 28;
          break;
        case 'medium':
          bonusHealth += 18;
          break;
        case 'low':
          bonusHealth += 5;
          break;
      }
    } else if (i <= 39) {
      switch (bracket) {
        case 'high':
          bonusHealth += 70;
          break;
        case 'medium':
          bonusHealth += 45;
          break;
        case 'low':
          bonusHealth += 12.5;
          break;
      }
    } else if (i <= 59) {
      switch (bracket) {
        case 'high':
          bonusHealth += 140;
          break;
        case 'medium':
          bonusHealth += 90;
          break;
        case 'low':
          bonusHealth += 25;
          break;
      }
    } else if (i <= 79) {
      switch (bracket) {
        case 'high':
          bonusHealth += 210;
          break;
        case 'medium':
          bonusHealth += 135;
          break;
        case 'low':
          bonusHealth += 37.5;
          break;
      }
    } else {
      switch (bracket) {
        case 'high':
          bonusHealth += 280;
          break;
        case 'medium':
          bonusHealth += 180;
          break;
        case 'low':
          bonusHealth += 50;
          break;
      }
    }
  }

  return bonusHealth;
};
