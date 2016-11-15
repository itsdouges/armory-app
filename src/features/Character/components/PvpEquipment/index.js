// @flow

import includes from 'lodash/includes';
import cx from 'classnames';

import Item from '../Item';
import styles from './styles.less';
import { weapons, noSecondWeaponSet } from 'lib/gw2/equipment';

type Props = {
  equipment: {},
  pvpEquipment: {
    sigils: [],
    rune: number,
    amulet: number,
  },
  items: {},
  skins: {},
  amulets: {},
  profession: string,
  className?: string,
  display: string,
};

const PvpEquipment = ({
  equipment,
  pvpEquipment,
  items,
  skins,
  amulets,
  profession,
  className,
  display,
}: Props) => (
  <div className={cx(styles.root, className, styles[display])}>
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
        small={display !== 'inline'}
        name="Sigil"
        tooltipType="amulets"
        item={items[pvpEquipment.sigils[0]]}
      />

      <Item
        small={display !== 'inline'}
        name="Sigil"
        tooltipType="amulets"
        item={items[pvpEquipment.sigils[1]]}
      />

      <Item
        small={display !== 'inline'}
        name="Sigil"
        tooltipType="amulets"
        item={items[pvpEquipment.sigils[2]]}
        hide={includes(noSecondWeaponSet, profession)}
      />

      <Item
        small={display !== 'inline'}
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

export default PvpEquipment;
