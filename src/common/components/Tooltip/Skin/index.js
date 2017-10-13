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
      <ItemHeader name={skin.name} icon={skin.icon} rarity={'white'} />
      <span className={styles.skinTypeText}>{skin.details.type}</span>
    </Background>
  );
};

export default SkinTooltip;
