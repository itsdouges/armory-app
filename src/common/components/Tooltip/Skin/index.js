// @flow

import React from 'react';
import ItemHeader from '../ItemHeader';
import Background from '../Background';

type Props = {
  data: Object,
};

const SkinTooltip = ({ data: { skin } }: Props) => {
  return (
    <Background>
      <ItemHeader name={skin.name} icon={skin.icon} rarity={skin.rarity} />
      <div>{skin.details.type}</div>
    </Background>
  );
};

export default SkinTooltip;
