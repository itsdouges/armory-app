// @flow

import React from 'react';
import ItemHeader from '../ItemHeader';
import Background from '../Background';
import styles from './styles.less';

type Props = {
  data: Object,
};

const SkinTooltip = ({ data: { skin } }: Props) => {
  const t = (skin.type === 'Weapon' ? skin.details.type : `${skin.details.weight_class} ${skin.details.type}`);
  return (
    <Background>
      <ItemHeader name={skin.name} icon={skin.icon} rarity="white" />
      <span className={styles.skinTypeText}>{t}</span>
    </Background>
  );
};

export default SkinTooltip;
