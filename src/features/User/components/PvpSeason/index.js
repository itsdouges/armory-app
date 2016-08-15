import { PropTypes } from 'react';
import styles from './styles.less';

const PvpSeason = ({ season }) => (
  <div className={styles.root}>
    cool season
  </div>
);

PvpSeason.propTypes = {
  season: PropTypes.object,
};

export default PvpSeason;
