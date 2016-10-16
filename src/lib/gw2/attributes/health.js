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
    default:
      return 'low';
  }
}

export function calculateBonusHealth (level, profession) {
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
