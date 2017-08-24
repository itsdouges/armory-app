// @flow

import React from 'react';
import get from 'lodash/get';
import T from 'i18n-react';

import Grid from 'common/layouts/Grid';
import WvwRank from '../WvwRank';
import DailyAp from '../DailyAp';
import Fractal from '../Fractal';
import RaidSummary from '../RaidSummary';
import PvpStats from '../PvpStats';
import PvpRanking from '../PvpRanking';
import PvpLeague from '../PvpSeason';
import FavouritePvpClass from '../FavouritePvpClass';

import type { User, PvpSeasons, Worlds } from 'flowTypes';

type Props = {
  user?: User,
  pvpSeasons: PvpSeasons,
  worlds: Worlds,
};

const Overview = ({ user, pvpSeasons, worlds }: Props) => {
  const pvpStats = get(user, 'pvpStats');
  const userAchievements = get(user, 'achievements', []);
  const pvpStandings = get(user, 'pvpStandings', [undefined]);

  return (
    <Grid>
      <PvpRanking
        rank={get(pvpStats, 'pvp_rank')}
        points={get(pvpStats, 'pvp_rank_points')}
        rankRollOvers={get(pvpStats, 'pvp_rank_rollovers')}
      />

      <PvpLeague standings={pvpStandings} seasons={pvpSeasons} />

      <PvpStats
        stats={get(pvpStats, 'ladders.unranked')}
        title={T.translate('users.pvpStats.unranked')}
      />

      <PvpStats
        stats={get(pvpStats, 'ladders.ranked')}
        title={T.translate('users.pvpStats.ranked')}
      />

      <FavouritePvpClass professions={get(pvpStats, 'professions')} />

      <WvwRank
        rank={user && user.wvwRank}
        worlds={worlds}
        worldId={user && user.world}
      />

      <Fractal level={user && user.fractalLevel} />
      <RaidSummary userAchievements={userAchievements} />

      <DailyAp {...user} />
    </Grid>
  );
};

export default Overview;
