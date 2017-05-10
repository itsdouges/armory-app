// @flow

import T from 'i18n-react';
import colours from 'common/styles/colours.less';
import camelCase from 'lodash/camelCase';

function parseFlags (item) {
  const inItem = {
    ...item,
  };

  if (!inItem.flags) {
    return inItem;
  }

  inItem.flags.forEach((flag) => {
    switch (flag) {
      case 'SoulBindOnUse':
      case 'SoulbindOnAcquire':
        inItem.boundStatus = T.translate('items.soulBound');
        return;

      case 'AccountBoundOnUse':
      case 'AccountBound':
        inItem.boundStatus = T.translate('items.accountBound');
    }
  });

  return inItem;
}

function parseInfixDescription (item) {
  const inItem = {
    ...item,
  };

  if (inItem.details &&
    inItem.details.infix_upgrade &&
    inItem.details.infix_upgrade.buff &&
    inItem.details.infix_upgrade.buff.description) {
    inItem.details
      .infix_upgrade.buff.description = inItem.details.infix_upgrade.buff.description.split('\n');
  }

  return inItem;
}

function parseAvailableWeaponSlots (item) {
  const inItem = {
    ...item,
  };

  switch (inItem.type) {
    case 'Weapon':
    case 'Armor':
    case 'Trinket':
    case 'Accessory':
    case 'Amulet':
    case 'Back':
      inItem.hasSlotOne = true;
      break;
  }

  if (inItem.type === 'Weapon' && inItem.details) {
    switch (item.details.type) {
      case 'Greatsword':
      case 'Hammer':
      case 'Longbow':
      case 'Rifle':
      case 'ShortBow':
      case 'Staff':
      case 'HarpoonGun':
      case 'Trident':
      case 'Spear':
        inItem.hasSlotTwo = true;
        break;
    }
  }

  return inItem;
}

export function parseItem (item: Object) {
  let inItem = parseFlags(item);
  inItem = parseInfixDescription(inItem);
  inItem = parseAvailableWeaponSlots(inItem);

  return inItem;
}

const ATTRIBUTE_MAPPING = {
  BoonDuration: 'concentration',
  ConditionDuration: 'expertise',
  CritDamage: 'ferocity',
  CriticalDamage: 'ferocity',
};

export function attributeToName (attribute: string) {
  const statName = ATTRIBUTE_MAPPING[attribute] || attribute;
  return T.translate(`itemAttributes.${camelCase(statName)}`);
}

// TODO: Stop using, use reduceById in index.js and map parseItem directly.
export function mapItemsToObject (items: []) {
  const mappedItems = {};

  items.forEach((item) => {
    const parsedItem = parseItem(item);
    mappedItems[parsedItem.id] = parsedItem;
  });

  return mappedItems;
}

export function markup (text: string) {
  if (!text) {
    return <span />;
  }

  const parsedText = text.replace(/<c=@([^>]*)>|<\/c>|<c>/g, '').split(/\n|<br>/);
  const result = /<c=@([^>]*)>/g.exec(text);
  const colour = result && result[1];

  return parsedText.map((tx) => <span className={colours[colour]} key={tx}>{tx}<br /></span>);
}
