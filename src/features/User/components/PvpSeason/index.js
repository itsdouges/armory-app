// @flow

import cx from 'classnames';

import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import last from 'lodash/last';

import styles from './styles.less';
import Redacted from 'common/components/Redacted';

type Props = {
  standing: Object,
  season: Object,
  small?: boolean,
};

const PvpSeason = ({ standing, season, small }: Props) => {
  const divisionId = get(standing, 'current.division');
  const division = get(season, `divisions[${divisionId}]`, {});
  const redact = !division.name;

  return (
    <div className={cx({ [styles.small]: small })}>
      <div className={styles.header}>
        <img
          alt="Division"
          className={styles.heroIcon}
          src={small ? division.small_icon : division.large_icon || 'https://render.guildwars2.com/file/02ED75461164551455297DA4955862552C2452BE/1313334.png'}
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

type PvpLeagueProps = {
  standings?: Object,
  seasons?: Object,
}

const PvpLeague = ({ standings, seasons }: PvpLeagueProps) => {
  const sortedSeasons = sortBy(seasons, (season) => new Date(season.end));

  const currentSeason = last(sortedSeasons) || {};
  const standing = find(standings, { season_id: currentSeason.id }) || {};

  return (
    <PvpSeason season={currentSeason} standing={standing} />
  );
};

export default PvpLeague;
