import { PropTypes } from 'react';
import colours from 'common/styles/colours.less';
import styles from './styles.less';
import Icon from 'common/components/Icon';

const Gold = ({ copper, silver, gold }) => (
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

Gold.propTypes = {
  copper: PropTypes.number,
  silver: PropTypes.number,
  gold: PropTypes.number,
};

export default Gold;
