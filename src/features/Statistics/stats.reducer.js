/* eslint no-param-reassign:0 */

import {
  FETCH_STATISTICS,
} from './actions';

export const defaultState = {
  users: {
    count: 1,
  },
  guilds: {
    count: 1,
  },
  characters: {
    race: {
      Sylvari: 1,
    },
    gender: {
      Male: 1,
    },
    profession: {
      Engineer: 1,
    },
    level: {
      80: 1,
    },
    guild: {
      yes: 1,
    },
    count: 1,
  },
};

function groupLevels (levels) {
  return Object.keys(levels).reduce((groupedLevels, level) => {
    const count = levels[level];

    if (level < 40) {
      groupedLevels['1 to 39'] += count;
    } else if (level < 80) {
      groupedLevels['40 to 79'] += count;
    } else {
      groupedLevels[80] += count;
    }

    return groupedLevels;
  }, {
    '1 to 39': 0,
    '40 to 79': 0,
    80: 0,
  });
}

export default function reducer (state, action) {
  switch (action.type) {
    case FETCH_STATISTICS: {
      const stats = {
        ...action.payload,
      };

      stats.characters.level = groupLevels(stats.characters.level);

      return stats;
    }

    default:
      return undefined;
  }
}
