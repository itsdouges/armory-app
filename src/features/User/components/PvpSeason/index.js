import { PropTypes } from 'react';
import cx from 'classnames';

import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import last from 'lodash/last';

import styles from './styles.less';
import Redacted from 'common/components/Redacted';

const PvpSeason = ({ standing, season, small }) => {
  const divisionId = get(standing, 'current.division');
  const division = get(season, `divisions[${divisionId}]`, {});
  const redact = !season.name;

  return (
    <div className={cx(styles.root, { [styles.small]: small })}>
      <div className={styles.header}>
        <img
          alt="Division"
          className={styles.heroIcon}
          src={small ? division.small_icon : division.large_icon || 'https://render.guildwars2.com/file/97E44C1BB3B7434639D470E9F25DD9C601ACEDD9/1313339.png'}
        />

        <div className={styles.titleContainer}>
          <span className={styles.title}>
            <Redacted redact={redact}>{season.name || 'PvP League Season Ten'}</Redacted>
          </span>

          <div className={styles.subtitle}>
            <Redacted redact={redact}>{division.name || 'Division 1: Amber'}</Redacted>
          </div>
        </div>
      </div>
    </div>
  );
};

PvpSeason.propTypes = {
  standing: PropTypes.object,
  season: PropTypes.object,
  small: PropTypes.bool,
};

const PvpLeague = ({ standings, seasons }) => {
  const sortedSeasons = sortBy(seasons, (season) => new Date(season.end));

  const currentSeason = last(sortedSeasons) || {};
  const standing = find(standings, () => (st) => st.season_id === currentSeason.id) || {};

  return (
    <PvpSeason season={currentSeason} standing={standing} />
  );
};

PvpLeague.propTypes = {
  standings: PropTypes.array,
  seasons: PropTypes.object,
};

export default PvpLeague;
