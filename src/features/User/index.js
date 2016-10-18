import { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import Head from 'common/components/Head';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import filter from 'lodash/filter';

import styles from './styles.less';

import Content from 'common/layouts/Content';
import ContentCardList from 'common/components/ContentCardList';
import SocialButtons from 'common/components/SocialButtons';
import PvpStats from './components/PvpStats';
import PvpRanking from './components/PvpRanking';
import PvpGame from './components/PvpGame';
import PvpLeague from './components/PvpSeason';

import {
  fetchUser,
  selectUser,
} from './actions';

export const selector = createSelector(
  store => store.users.data[store.users.selected],
  store => filter(store.pvpSeasons, ((season) => isObject(season))),
  store => store.maps,
  (user, pvpSeasons, maps) => ({
    user,
    pvpSeasons,
    maps,
  })
);

class User extends Component {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
    routeParams: PropTypes.object,
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
    const { user, routeParams: { alias }, pvpSeasons, maps } = this.props;

    const pvpGames = (user &&
      user.pvpGames &&
      user.pvpGames.length &&
      user.pvpGames) || [undefined, undefined];

    const pvpStats = get(user, 'pvpStats');
    const pvpStandings = get(user, 'pvpStandings', [undefined]);

    return (
      <Content type="users" content={user}>
        <Head title={alias} />

        <ContentCardList
          type="grid"
          alias={alias}
          items={user && user.characters}
        />

        <div className={styles.pvpContainer}>
          <PvpRanking
            rank={get(pvpStats, 'pvp_rank')}
            points={get(pvpStats, 'pvp_rank_points')}
            rankRollOvers={get(pvpStats, 'pvp_rank_rollovers')}
          />

          <PvpLeague standings={pvpStandings} seasons={pvpSeasons} />
        </div>

        <PvpStats stats={pvpStats} />

        <div className={styles.gamesContainer}>
          <h3>Recent matches</h3>
          {pvpGames.map((game, index) => <PvpGame game={game} key={index} maps={maps} />)}
        </div>

        <SocialButtons />
      </Content>
    );
  }
}

User.propTypes = {
  user: PropTypes.object,
  pvpSeasons: PropTypes.array,
  maps: PropTypes.object,
};

export default connect(selector)(User);
