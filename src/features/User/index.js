// @flow

import { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import filter from 'lodash/filter';
import T from 'i18n-react';

import styles from './styles.less';

import Content from 'common/layouts/Content';
import ContentCardList from 'common/components/ContentCardList';

import WvwRank from './components/WvwRank';
import DailyAp from './components/DailyAp';
import Fractal from './components/Fractal';
import RaidSummary from './components/RaidSummary';
import PvpStats from './components/PvpStats';
import PvpRanking from './components/PvpRanking';
import PvpGame from './components/PvpGame';
import PvpLeague from './components/PvpSeason';
import FavouritePvpClass from './components/FavouritePvpClass';

import Tooltip from 'common/components/Tooltip';

import {
  fetchUser,
  selectUser,
} from './actions';

export const selector = createSelector(
  (store) => store.users.data[store.users.selected],
  (store) => filter(store.pvpSeasons, ((season) => isObject(season))),
  (store) => store.maps,
  (store) => store.worlds,
  (user, pvpSeasons, maps, worlds) => ({
    user,
    pvpSeasons,
    maps,
    worlds,
  })
);

type Props = {
  user?: {
    fractalLevel: number,
    wvwRank: number,
    world: number,
    characters: [],
  },
  dispatchFetchUser: () => void,
  dispatchSelectUser: () => void,
  routeParams: {
    alias: string,
  },
  worlds: {},
  pvpSeasons: [],
  maps: {},
};

@connect(selector, {
  dispatchFetchUser: fetchUser,
  dispatchSelectUser: selectUser,
})
export default class User extends Component {
  props: Props;

  static contextTypes = {
    _userAlias: PropTypes.string,
  };

  componentWillMount () {
    this.loadUser(this.props.routeParams.alias);
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.routeParams.alias === nextProps.routeParams.alias) {
      return;
    }

    this.loadUser(nextProps.routeParams.alias);
  }

  loadUser (alias: string) {
    const { dispatchFetchUser, dispatchSelectUser } = this.props;

    dispatchFetchUser(alias, { ignoreAuth: this.context._userAlias !== alias });
    dispatchSelectUser(alias);
  }

  render () {
    const { user, routeParams: { alias }, pvpSeasons, maps, worlds } = this.props;

    const pvpGames = (get(user, 'pvpGames.length') && get(user, 'pvpGames')) || [undefined, undefined];
    const pvpStats = get(user, 'pvpStats');
    const userAchievements = get(user, 'achievements', []);
    const pvpStandings = get(user, 'pvpStandings', [undefined]);

    return (
      <Content
        type="users"
        title={alias}
        content={user}
        tabs={[
          {
            to: `/${alias}`,
            name: 'Overview',
            ignoreTitle: true,
            content: (
              <div>
                <div className={styles.gamesContainer}>
                  <h3>Player Versus. Player</h3>
                </div>

                <div className={styles.summaryContainer}>
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
                </div>

                <div className={styles.gamesContainer}>
                  <h3>Player Versus. Environment</h3>
                </div>

                <div className={styles.summaryContainer}>
                  <Fractal level={user && user.fractalLevel} />
                  <RaidSummary userAchievements={userAchievements} />

                  <DailyAp {...user} />
                </div>
              </div>
            ),
          },
          {
            to: `/${alias}/characters`,
            name: 'Characters',
            content: (
              <ContentCardList
                noBorder
                type="grid"
                alias={alias}
                items={user && user.characters}
              />
            ),
          },
          {
            to: `/${alias}/matches`,
            name: T.translate('users.recentMatches'),
            content: (
              <div className={styles.gamesContainer}>
                <span />
                {pvpGames.map((game, index) => <PvpGame game={game} key={index} maps={maps} />)}
              </div>
            ),
          },
        ]}
      >
        <Tooltip />
      </Content>
    );
  }
}
