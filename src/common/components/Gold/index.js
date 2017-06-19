// @flow

import colours from 'common/styles/colours.less';
import Icon from 'common/components/Icon';
import goldImg from 'assets/images/gold.png';
import silverImg from 'assets/images/silver.png';
import copperImg from 'assets/images/copper.png';

import styles from './styles.less';

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

const addSpace = (str) => ` ${str}`;

const Gold = ({ coins, ...props }: Props) => {
  const { gold, silver, copper } = calc(coins);

  return (
    <div className={styles.root} {...props}>
      {!!gold && (
      <span className={`${styles.money} ${colours.gold}`}>
        {addSpace(gold)} <img src={goldImg} alt="g" className={styles.icon} />
      </span>)}

      {!!silver && (
      <span className={`${styles.money} ${colours.silver}`}>
        {addSpace(silver)} <img src={silverImg} alt="s" className={styles.icon} />
      </span>)}

      {!!copper && (
      <span className={`${styles.money} ${colours.copper}`}>
        {addSpace(copper)} <img src={copperImg} alt="c" className={styles.icon} />
      </span>)}
    </div>
  );
};

export default Gold;
