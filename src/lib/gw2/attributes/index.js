import parseCharacter from 'gw2e-item-attributes/parseCharacter';
import reduce from 'lodash/reduce';
import lowerFirst from 'lodash/lowerFirst';
import includes from 'lodash/includes';
import get from 'lodash/get';

import defaultAttributes from './defaults';

const IGNORE_EQUIPS_LIST = [
  'WeaponAquaticA',
  'WeaponAquaticB',
  'HelmAquatic',
];

export function calculate (character, { items }) {
  if (!character) {
    return defaultAttributes;
  }

  const extraStats = [];

  const equipIds = character.equipmentRaw.reduce((ids, equip) => {
    if (includes(IGNORE_EQUIPS_LIST, equip.slot)) {
      return ids;
    }

    ids.push(equip.id);
    equip.upgrades && ids.concat(equip.upgrades);

    const extra = get(equip, 'stats.attributes');
    extra && extraStats.push({
      details: {
        infix_upgrade: {
          attributes: reduce(extra, (arr, value, key) => {
            arr.push({
              attribute: key,
              modifier: value,
            });
            return arr;
          }, []),
        },
      },
    });

    return ids;
  }, []);

  const equipItems = equipIds.map((id) => items[id]);
  const loaded = equipItems.filter((equip) => !!equip).length > 0;

  if (!loaded) {
    return defaultAttributes;
  }

  const attributes = parseCharacter(
    character.level,
    character.profession,
    equipItems.concat(extraStats)
  );

  return reduce({
    ...defaultAttributes,
    ...attributes,
  }, (result, value, key) => {
    // eslint-disable-next-line
    result[lowerFirst(key)] = value;
    return result;
  }, {});
}
