import { PropTypes } from 'react';
import colours from 'common/styles/colours.less';
import styles from './styles.less';

const Gold = ({ copper, silver, gold }) => (
  <div className={styles.root}>

  {!!gold && (
    <span className={`${styles.money} ${colours.gold}`}>
      {gold}
    </span>)}

  {!!silver && (
    <span className={`${styles.money} ${colours.silver}`}>
      {silver}
    </span>)}

  {!!copper && (
    <span className={`${styles.money} ${colours.copper}`}>
      {copper}
    </span>)}
  </div>
);

Gold.propTypes = {
  copper: PropTypes.number,
  silver: PropTypes.number,
  gold: PropTypes.number,
};

export default Gold;
