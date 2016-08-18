function combineAttributes (attr1, attr2) {
  /* eslint no-param-reassign:0 */
  attr1.Power += attr2.Power || 0;
  attr1.Precision += attr2.Precision || 0;
  attr1.Toughness += attr2.Toughness || 0;
  attr1.Vitality += attr2.Vitality || 0;
  attr1.BoonDuration += attr2.BoonDuration || 0;
  attr1.ConditionDamage += attr2.ConditionDamage || 0;
  attr1.ConditionDuration += attr2.ConditionDuration || 0;
  attr1.Ferocity += attr2.Ferocity || 0;
  attr1.HealingPower += attr2.HealingPower || 0;
  attr1.CriticalChance += attr2.CriticalChance || 0;
  attr1.Health += attr2.Health || 0;
  attr1.Expertise += attr2.Expertise || 0;
  attr1.Concentration += attr2.Concentration || 0;
}

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

const AQUATIC_EXCLUSION_LIST = [
  'Trident',
  'HelmAcquatic',
];

const getItemAttributes = (character, items) => {
  const attributes = {
    Power: 0,
    Precision: 0,
    Toughness: 0,
    Vitality: 0,
    BoonDuration: 0,
    ConditionDamage: 0,
    ConditionDuration: 0,
    Ferocity: 0,
    HealingPower: 0,
    CriticalChance: 0,
    Health: 0,
    Armor: 0,
    Expertise: 0,
    Concentration: 0,
  };

  Object.keys(character.equipment).forEach((key) => {
    const equip = character.equipment[key];

    if (!equip) {
      return;
    }

    const item = items[equip.id];

    if (!item || !item.details) {
      return;
    }

    attributes.Armor += item.details.defense || 0;

    if (!item.details.infix_upgrade ||
      AQUATIC_EXCLUSION_LIST.indexOf(item.details.type) >= 0) {
      return;
    }

    item.details.infix_upgrade.attributes.forEach(({ attribute, modifier }) => {
      attributes[attribute] += modifier;
    });

    if (!equip.upgrades) {
      return;
    }

    equip.upgrades.forEach((id) => {
      const upgrade = items[id];

      if (upgrade.details.type === 'Rune') {
        // TODO: Calculate total amount of runes available
        const bonuses = parseRuneBonuses(upgrade.details.bonuses, 1);
        combineAttributes(attributes, bonuses);
      } else {
        const bonuses = parseUpgradeBuffs(upgrade.details.infix_upgrade.buff.description);
        combineAttributes(attributes, bonuses);
      }
    });

    // TODO: Calculate infusion upgrades
  });

  return attributes;
};

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

function calculateBonusHealth (level, profession) {
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
}

const BASE_CRITICAL_DAMAGE = 150;
export function calculate (character, items) {
  if (!character) {
    return {};
  }

  const base = calculateBaseAttribute(character.level);
  const bonusHealth = calculateBonusHealth(character.level, character.profession);
  const itemBonus = getItemAttributes(character, items);

  const precision = base + itemBonus.Precision;
  const toughness = base + itemBonus.Toughness;

  let criticalChance = (precision - 916) / 21;
  criticalChance = criticalChance < 0 ? 0 : criticalChance;

  return {
    power: (base + itemBonus.Power).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    [character.profession.toLowerCase()]: 0,
    toughness: (base + itemBonus.Toughness).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    armor: (toughness + itemBonus.Armor).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    vitality: (base + itemBonus.Vitality).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    health: ((base * 10) + bonusHealth).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    precision: precision.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    criticalChance: criticalChance.toFixed(2),
    ferocity: itemBonus.Ferocity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    criticalDamage: (BASE_CRITICAL_DAMAGE + (itemBonus.Ferocity / 15)).toFixed(1),
    conditionDamage: itemBonus.ConditionDamage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    conditionDuration: (+itemBonus.ConditionDuration + (itemBonus.Concentration / 15)).toFixed(1),
    concentration: itemBonus.Concentration,
    healing: itemBonus.HealingPower,
    expertise: itemBonus.Expertise,
    boon: (+itemBonus.BoonDuration + (itemBonus.Expertise / 15)).toFixed(1),
    agony: 0,
    magic: 0,
  };
}
