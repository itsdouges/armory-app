// @flow

import React from 'react';
import colours from 'common/styles/colours.less';
import goldImg from 'assets/images/gold.png';
import silverImg from 'assets/images/silver.png';
import copperImg from 'assets/images/copper.png';

import styles from './styles.less';

type Props = {
  coins: number,
};

function calc(coins) {
  let remainder = coins;

  const gold = Math.floor(remainder / 10000);
  remainder %= 10000;

  const silver = Math.floor(remainder / 100);
  remainder %= 100;

  const copper = remainder;

  return {
    gold,
    silver,
    copper,
  };
}

type MoneyProps = {
  money: number,
  type: 'gold' | 'silver' | 'copper',
};

const moneyMap = {
  gold: goldImg,
  silver: silverImg,
  copper: copperImg,
};

const Money = ({ money, type }: MoneyProps) => (
  <span className={`${styles.money} ${colours[type]}`}>
    {` ${money}`} <img src={moneyMap[type]} alt={type[0]} className={styles.icon} />
  </span>
);

const Gold = ({ coins, ...props }: Props) => {
  const { gold, silver, copper } = calc(coins);

  return (
    <div className={styles.root} {...props}>
      {!!gold && <Money money={gold} type="gold" />}
      {!!silver && <Money money={silver} type="silver" />}
      {!!copper && <Money money={copper} type="copper" />}
    </div>
  );
};

export default Gold;
