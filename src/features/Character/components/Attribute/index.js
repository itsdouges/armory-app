import { PropTypes } from 'react';
import styles from './styles.less';
import TooltipTrigger from 'common/components/TooltipTrigger';
import classnames from 'classnames/bind';
import Icon from 'common/components/Icon';

const cx = classnames.bind(styles);

const attributeNameMapping = {
  power: 'Attack Power',
  precision: 'Precision',
  toughness: 'Toughness',
  vitality: 'Vitality',
  boonDuration: 'Boon Duration',
  conditionDamage: 'Condition Damage',
  conditionDuration: 'Condition Duration',
  ferocity: 'Ferocity',
  healingPower: 'Healing Power',
  armor: 'Armor',
  critChance: 'Critical Chance',
  critDamage: 'Critical Damage',
  health: 'Health',
  expertise: 'Expertise',
  concentration: 'Concentration',
  agonyResistance: 'Agony Resistance',
  magic: 'Magic Find',
  elementalist: 'Attunement Recharge Rate',
  guardian: 'Virtue Recharge Rate',
  warrior: 'Burst Recharge',
  engineer: 'Tool Belt Recharge Rate',
  ranger: 'Pet Attribute Bonus',
  thief: 'Steal Recharge Rate',
  mesmer: 'Shatter Skill Recharge Rate',
  necromancer: 'Life Force Pool',
  revanent: 'Revenant',
};

function parseValue (name, value) {
  if (!value) {
    return 0;
  }

  switch (name) {
    case 'critChance':
    case 'critDamage':
    case 'boonDuration':
    case 'conditionDuration':
      return `${(value * 100).toFixed(2)}%`;

    default:
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

const Attribute = ({ value, name }) => (
  <TooltipTrigger data={attributeNameMapping[name]}>
    <div className={styles.root}>
      <Icon className={cx('icon', name)} size="micro" />
      <span>{parseValue(name, value)}</span>
    </div>
  </TooltipTrigger>
);

Attribute.propTypes = {
  value: PropTypes.any,
  name: PropTypes.string,
};

export default Attribute;
