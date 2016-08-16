import { PropTypes } from 'react';
import styles from './styles.less';

function parseDate (date) {
  return date ? new Date(date).toDateString() : '';
}

const PvpSeason = ({ standing, season }) => {
  const division = season.divisions[standing.current.division] || {};

  return (
    <div className={styles.root}>
      <div className={styles.title}>{season.name || 'PvP League Season Ten'}</div>
      <div className={styles.subtitle}>
        {season.active ?
          `Season ends on ${parseDate(season.end)}.` :
          'Season has ended.'}
      </div>

      <div className={styles.heroIconContainer}>
        <img
          alt="Division"
          className={styles.heroIcon}
          src={division.large_icon || 'https://render.guildwars2.com/file/97E44C1BB3B7434639D470E9F25DD9C601ACEDD9/1313339.png'}
        />
      </div>
    </div>
  );
};

PvpSeason.defaultProps = {
  season: {},
  standing: {
    current: {},
  },
};

PvpSeason.propTypes = {
  standing: PropTypes.object,
  season: PropTypes.object,
};

export default PvpSeason;
