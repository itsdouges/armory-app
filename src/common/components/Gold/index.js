// @flow

import colours from 'common/styles/colours.less';
import styles from './styles.less';
import Icon from 'common/components/Icon';

type Props = {
  coins: number,
};

function calc (coins) {
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

const Gold = ({ coins, ...props }: Props) => {
  const { gold, silver, copper } = calc(coins);

  return (
    <div className={styles.root} {...props}>
      {!!gold && (
      <span className={`${styles.money} ${colours.gold}`}>
        {gold} <Icon name="gold.png" size="micro" />
      </span>)}

      {!!silver && (
      <span className={`${styles.money} ${colours.silver}`}>
        {silver} <Icon name="silver.png" size="micro" />
      </span>)}

      {!!copper && (
      <span className={`${styles.money} ${colours.copper}`}>
        {copper} <Icon name="copper.png" size="micro" />
      </span>)}
    </div>
  );
};

export default Gold;
