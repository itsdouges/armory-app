import { PropTypes } from 'react';

import Item from '../Item';
import styles from './styles.less';

const weapons = [{
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
  hideForClasses: ['Engineer', 'Elementalist'],
}, {
  name: 'Off-Hand Weapon',
  type: 'shield',
  key: 'weaponB2',
  hideForClasses: ['Engineer', 'Elementalist'],
}];

const PvpEquipment = ({ equipment, pvpEquipment, items, skins, amulets }) => (
  <div className={styles.root}>
    <div className={styles.weaponsContainer}>
      {weapons.map((item) => {
        const equip = equipment[item.key] || {};

        return (
          <Item
            {...item}
            key={item.key}
            item={items[equip.id]}
            skin={skins[equip.skin]}
            stats={equip.stats}
          />
        );
      })}
    </div>

    <div className={styles.sigilsContainer}>
      <Item item={items[pvpEquipment.sigils[0]]} small />
      <Item item={items[pvpEquipment.sigils[1]]} small />

      <Item item={items[pvpEquipment.sigils[2]]} small />
      <Item item={items[pvpEquipment.sigils[3]]} small />
    </div>

    <div className={styles.upgradesContainer}>
      <Item item={items[pvpEquipment.rune]} />
      <Item item={amulets[pvpEquipment.amulet]} tooltipTypeOverride="amulets" />
    </div>
  </div>
);

PvpEquipment.defaultProps = {
  equipment: {},
  pvpEquipment: {},
};

PvpEquipment.propTypes = {
  equipment: PropTypes.object,
  skins: PropTypes.object,
  pvpEquipment: PropTypes.object,
  items: PropTypes.object,
  amulets: PropTypes.object,
};

export default PvpEquipment;
