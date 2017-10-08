// @flow

import React from 'react';
import startCase from 'lodash/startCase';
import includes from 'lodash/includes';
import get from 'lodash/get';
import T from 'i18n-react';

import styles from './styles.less';
import SimpleTooltip from '../Simple';
import colours from 'common/styles/colours.less';
import { markup, attributeToName } from 'lib/gw2/parse';

import Background from '../Background';

/*
const addCount = (str, count) => (count > 1 ? `${count} ${str}` : str);

const minutes = (ms) => `${Math.floor(ms / 60000)} m`;

function buildName (skin, upgrades, count) {
  let name= skin.name;
  return addCount(name, count);
}
*/

type Props = {
  data: Object,
};

const SkinTooltip = ({ data: {
  name,
  type,
  rarity
} }: Props) => {
  console.log('name,type,rarity',name,type,rarity);
  
  return (
    <Background>
      <div>
      {name}
      </div>
    </Background>
  );
};

export default SkinTooltip;
