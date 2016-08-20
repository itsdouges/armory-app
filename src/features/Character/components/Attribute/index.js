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
  boon: 'Boon Duration',
  conditionDamage: 'Condition Damage',
  conditionDuration: 'Condition Duration',
  ferocity: 'Ferocity',
  healing: 'Healing Power',
  armor: 'Armor',
  criticalChance: 'Critical Chance',
  criticalDamage: 'Critical Damage',
  health: 'Health',
  expertise: 'Expertise',
  concentration: 'Concentration',
  agony: 'Agony Resistence',
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

const Attribute = ({ value, name }) => (
  <TooltipTrigger data={attributeNameMapping[name]}>
    <div className={styles.root}>
      <Icon className={cx('icon', name)} size="micro" />
      <span>{value}</span>
    </div>
  </TooltipTrigger>
);

Attribute.propTypes = {
  value: PropTypes.any,
  name: PropTypes.string,
};

export default Attribute;
