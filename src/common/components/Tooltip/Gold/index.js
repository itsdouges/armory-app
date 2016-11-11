// @flow

import colours from 'common/styles/colours.less';
import styles from './styles.less';
import Icon from 'common/components/Icon';

type GoldProps = {
  copper: number,
  silver: number,
  gold: number,
};

const Gold = ({ copper, silver, gold }: GoldProps) => (
  <div className={styles.root}>

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

export default Gold;
