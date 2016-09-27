export const noSecondWeaponSet = ['Engineer', 'Elementalist'];

export const weapons = [{
  name: 'Main-Hand Weapon',
  type: 'sword',
  key: 'weaponA1',
}, {
  name: 'Off-Hand Weapon',
  type: 'shield',
  key: 'weaponA2',
}, {
  name: 'Main-Hand Weapon',
  type: 'sword',
  key: 'weaponB1',
  hideForClasses: noSecondWeaponSet,
}, {
  name: 'Off-Hand Weapon',
  type: 'shield',
  key: 'weaponB2',
  hideForClasses: noSecondWeaponSet,
}];

export const leftItems = [
  {
    name: 'Headgear',
    type: 'head',
    key: 'helm',
  },
  {
    name: 'Shoulders',
    type: 'shoulder',
    key: 'shoulders',
  },
  {
    name: 'Chest',
    type: 'chest',
    key: 'coat',
  },
  {
    name: 'Gloves',
    type: 'hand',
    key: 'gloves',
  },
  {
    name: 'Leggings',
    type: 'leg',
    key: 'leggings',
  },
  {
    name: 'Boots',
    type: 'feet',
    key: 'boots',
  },
].concat(weapons);

export const rightItems = [
  {
    name: 'Back',
    type: 'back',
    key: 'backpack',
  },
  {
    name: 'Accessory',
    type: 'beartrinket',
    key: 'accessory1',
  },
  {
    name: 'Accessory',
    type: 'cubetrinket',
    key: 'accessory2',
  },
  {
    name: 'Amulet',
    type: 'amulet',
    key: 'amulet',
  },
  {
    name: 'Ring',
    type: 'rightring',
    key: 'ring1',
  },
  {
    name: 'Ring',
    type: 'leftring',
    key: 'ring2',
  },
  {
    name: 'Foraging',
    type: 'sickle',
    key: 'sickle',
  },
  {
    name: 'Logging',
    type: 'axe',
    key: 'axe',
  },
  {
    name: 'Mining',
    type: 'pick',
    key: 'pick',
  },
  {
    name: 'Acquatic Headgear',
    type: 'head',
    key: 'helmAquatic',
  },
  {
    name: 'Acquatic Weapon',
    type: 'sword',
    key: 'weaponAquaticA',
  },
  {
    name: 'Acquatic Weapon',
    type: 'sword',
    key: 'weaponAquaticB',
    hideForClasses: noSecondWeaponSet,
  },
];
