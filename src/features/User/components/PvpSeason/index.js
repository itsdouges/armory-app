// @flow

import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import last from 'lodash/last';

import Summary from 'common/layouts/Summary';
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
    <Summary
      leftIcon={{ src: small ? division.small_icon : division.large_icon || 'https://render.guildwars2.com/file/02ED75461164551455297DA4955862552C2452BE/1313334.png', size: 'large' }}
      title={<Redacted redact={redact}>{season.name || 'PvP League Season Ten'}</Redacted>}
      subTitle={<Redacted redact={redact}>{division.name || 'Division 1: Amber'}</Redacted>}
    />
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
