// @flow

import React from 'react';
import ItemHeader from '../ItemHeader';
import Background from '../Background';
import styles from './styles.less';

type Props = {
  data: Object,
};

const SkinTooltip = ({ data: { skin } }: Props) => {
  return (
    <Background>
      <ItemHeader name={skin.name} icon={skin.icon} rarity="white" />
      {skin.type === 'Weapon' && <div className={styles.skinTypeText}>
        <span className={styles.skinTypeText}>{skin.details.type}</span>
      </div>}
      {skin.type === 'Armor' && <div className={styles.skinTypeText}>
        <span >{skin.details.weight_class}</span>
        <br />
        <span className={styles.skinTypeText}>{skin.details.type}</span>
      </div>}

    </Background>
  );
};

export default SkinTooltip;
