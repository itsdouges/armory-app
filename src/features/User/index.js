import { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import Head from 'common/components/Head';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import filter from 'lodash/filter';
import T from 'i18n-react';

import styles from './styles.less';

import Content from 'common/layouts/Content';
import ContentCardList from 'common/components/ContentCardList';
import SocialButtons from 'common/components/SocialButtons';

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

class User extends Component {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
    routeParams: PropTypes.object,
    worlds: PropTypes.object,
    pvpSeasons: PropTypes.array,
    maps: PropTypes.object,
  };

  static contextTypes = {
    _userAlias: PropTypes.string,
  };

  componentWillMount () {
    this.loadUser();
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.routeParams.alias === nextProps.routeParams.alias) {
      return;
    }

    this.loadUser(nextProps.routeParams.alias);
  }

  loadUser (alias = this.props.routeParams.alias) {
    this.props.dispatch(fetchUser(alias, { ignoreAuth: this.context._userAlias !== alias }));
    this.props.dispatch(selectUser(alias));
  }

  render () {
    const { user, routeParams: { alias }, pvpSeasons, maps, worlds } = this.props;

    const pvpGames = (user &&
      user.pvpGames &&
      user.pvpGames.length &&
      user.pvpGames) || [undefined, undefined];

    const pvpStats = get(user, 'pvpStats');
    const userAchievements = get(user, 'achievements', []);
    const pvpStandings = get(user, 'pvpStandings', [undefined]);

    return (
      <Content type="users" content={user}>
        <Head title={alias} />

        <ContentCardList
          noBorder
          type="grid"
          alias={alias}
          items={user && user.characters}
        />

        <div className={styles.gamesContainer}>
          <h3>PvE Summary</h3>
        </div>

        <div className={styles.summaryContainer}>
          <Fractal level={user && user.fractalLevel} />
          <RaidSummary userAchievements={userAchievements} />

          <DailyAp {...user} />
        </div>

        <div className={styles.gamesContainer}>
          <h3>PvP Summary</h3>
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

          <WvwRank worldId={user && user.world} worlds={worlds} rank={user && user.wvwRank} />
        </div>


        <div className={styles.gamesContainer}>
          <h3>{T.translate('users.recentMatches')}</h3>
          {pvpGames.map((game, index) => <PvpGame game={game} key={index} maps={maps} />)}
        </div>

        <SocialButtons />

        <Tooltip />
      </Content>
    );
  }
}

export default connect(selector)(User);
