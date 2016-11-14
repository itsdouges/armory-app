import { PropTypes } from 'react';
import includes from 'lodash/includes';
import cx from 'classnames';

import Item from '../Item';
import styles from './styles.less';
import { weapons, noSecondWeaponSet } from 'lib/gw2/equipment';

const PvpEquipment = ({
  equipment,
  pvpEquipment,
  items,
  skins,
  amulets,
  profession,
  className,
}) => (
  <div className={cx(styles.root, className)}>
    <div className={styles.weaponsContainer}>
      {weapons.map((item) => {
        const equip = equipment[item.key] || {};

        return (
          <Item
            {...item}
            hide={includes(item.hideForClasses, profession)}
            key={item.key}
            item={items[equip.id]}
            skin={skins[equip.skin]}
            stats={equip.stats}
          />
        );
      })}
    </div>

    <div className={styles.sigilsContainer}>
      <Item
        small
        name="Sigil"
        tooltipType="amulets"
        item={items[pvpEquipment.sigils[0]]}
      />

      <Item
        small
        name="Sigil"
        tooltipType="amulets"
        item={items[pvpEquipment.sigils[1]]}
      />

      <Item
        small
        name="Sigil"
        tooltipType="amulets"
        item={items[pvpEquipment.sigils[2]]}
        hide={includes(noSecondWeaponSet, profession)}
      />

      <Item
        small
        name="Sigil"
        tooltipType="amulets"
        item={items[pvpEquipment.sigils[3]]}
        hide={includes(noSecondWeaponSet, profession)}
      />
    </div>

    <div className={styles.upgradesContainer}>
      <Item item={items[pvpEquipment.rune]} name="Rune" tooltipType="amulets" />
      <Item item={amulets[pvpEquipment.amulet]} tooltipType="amulets" />
    </div>
  </div>
);

PvpEquipment.defaultProps = {
  equipment: {},
  pvpEquipment: {},
};

PvpEquipment.propTypes = {
  profession: PropTypes.string,
  equipment: PropTypes.object,
  skins: PropTypes.object,
  pvpEquipment: PropTypes.object,
  items: PropTypes.object,
  amulets: PropTypes.object,
  className: PropTypes.string,
};

export default PvpEquipment;
