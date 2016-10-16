import defaultAttributes from './defaults';
import baseStats from './baseStats';
import health from './health';
import {
  extractItemStats,
  extractSkillStats,
  extractTraitStats,
  extractStatChoiceStats,
} from './extract';

const BASE_CRITICAL_DAMAGE = 150;

export function calculate (character, { items, traits, skills, statChoices }) {
  if (!character) {
    return;
  }


}
