// @flow

import styles from './styles.less';
import TooltipTrigger from 'common/components/TooltipTrigger';
import cx from 'classnames';
import Icon from 'common/components/Icon';
import T from 'i18n-react';

const attributeNameMapping = {
  power: T.translate('itemAttributes.power'),
  precision: T.translate('itemAttributes.precision'),
  toughness: T.translate('itemAttributes.toughness'),
  vitality: T.translate('itemAttributes.vitality'),
  boonDuration: T.translate('itemAttributes.boonDuration'),
  conditionDamage: T.translate('itemAttributes.conditionDamage'),
  conditionDuration: T.translate('itemAttributes.conditionDuration'),
  ferocity: T.translate('itemAttributes.ferocity'),
  healingPower: T.translate('itemAttributes.healingPower'),
  armor: T.translate('itemAttributes.armor'),
  critChance: T.translate('itemAttributes.critChance'),
  critDamage: T.translate('itemAttributes.critDamage'),
  health: T.translate('itemAttributes.health'),
  expertise: T.translate('itemAttributes.expertise'),
  concentration: T.translate('itemAttributes.concentration'),
  agonyResistance: T.translate('itemAttributes.agonyResistance'),
  magic: T.translate('itemAttributes.magic'),
  elementalist: T.translate('itemAttributes.elementalist'),
  guardian: T.translate('itemAttributes.guardian'),
  warrior: T.translate('itemAttributes.warrior'),
  engineer: T.translate('itemAttributes.engineer'),
  ranger: T.translate('itemAttributes.ranger'),
  thief: T.translate('itemAttributes.thief'),
  mesmer: T.translate('itemAttributes.mesmer'),
  necromancer: T.translate('itemAttributes.necromancer'),
  revanent: T.translate('itemAttributes.revanent'),
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

type Props = {
  value: number,
  name: string,
};

const Attribute = ({ value, name }: Props) => (
  <TooltipTrigger data={attributeNameMapping[name]}>
    <div className={styles.root}>
      <Icon className={cx(styles.icon, styles[name])} size="micro" />
      <span>{parseValue(name, value)}</span>
    </div>
  </TooltipTrigger>
);

export default Attribute;
