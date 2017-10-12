// @flow

import React from 'react';
import Icon from 'common/components/Icon';
import Background from '../Background';
import styles from './styles.less';

type Props = {
  data: Object,
};

const SkinTooltip = ({ data: { skin } }: Props) => {
  return (
    <Background>
      <div className={styles.itemHeader}>
        <Icon size="mini" src={skin.icon} className={styles.tooltipIcon} />
        <span className={styles.skinNameText}>
          {skin.name}
        </span>
      </div>
      <div>
        <span className={styles.skinTypeText}>
          {skin.details.type}
        </span>
      </div>
    </Background>
  );
};

export default SkinTooltip;
