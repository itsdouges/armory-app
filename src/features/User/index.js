// @flow

import { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import filter from 'lodash/filter';
import T from 'i18n-react';
import { Link } from 'react-router';

import Button from 'common/components/Button';
import Icon from 'common/components/Icon';
import Content from 'common/layouts/Content';
import ContentCardList from 'common/components/ContentCardList';

import styles from './styles.less';
import PvpGame from './components/PvpGame';
import Overview from './components/Overview';

import type { User as UserType, PvpSeasons, Worlds, Maps } from 'flowTypes';

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
  user?: UserType,
  dispatchFetchUser: () => void,
  dispatchSelectUser: () => void,
  routeParams: {
    alias: string,
  },
  worlds: Worlds,
  pvpSeasons: PvpSeasons,
  maps: Maps,
};

function getActiveStanding ({ pvpStandings = [] } = {}, pvpSeasons) {
  const [activePvpSeason] = filter(pvpSeasons, ({ active }) => active);
  const seasonId = activePvpSeason && activePvpSeason.id;
  const standings = pvpStandings.filter(({ season_id }) => season_id === seasonId);
  return standings[0] || {};
}

const addHash = (str) => (str ? `#${str}` : '-');

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
    const guilds = get(user, 'guilds', []);

    const safeUser = user || {};
    const stubUser = get(user, 'stub');
    const standing = getActiveStanding(user, pvpSeasons);
    const rating = get(standing, 'current.rating') || get(user, 'rating');
    const gw2aRank = get(user, 'gw2aRank');
    const euRank = get(user, 'euRank');
    const naRank = get(user, 'naRank');
    const winsText = T.translate('users.pvpStats.wins');
    const byesText = T.translate('users.pvpStats.byes');
    const lossText = T.translate('users.pvpStats.losses');
    const winLossByes = `${winsText}/${lossText}/${byesText}`;

    const { byes, ...rankedStats } = get(user, 'pvpStats.ladders.ranked', {});

    const wins = rankedStats.wins || safeUser.wins;
    const losses = rankedStats.losses || safeUser.losses;

    const statSummary = (wins || losses || byes) ? `${wins}-${losses}-${byes || 0}` : '-';

    return (
      <Content
        cardExtra={user && user.access && (
          <Icon size="mini" className={styles.access} name={`${user.access}.png`} />
        )}
        rightComponent={
          <ul className={styles.rating}>
            <li>
              <Link to="/leaderboards/pvp/eu">
                <span>{addHash(euRank)}</span>
                <div>EU {T.translate('users.pvpStats.ranking')}</div>
              </Link>
            </li>
            <li>
              <Link to="/leaderboards/pvp/na">
                <span>{addHash(naRank)}</span>
                <div>NA {T.translate('users.pvpStats.ranking')}</div>
              </Link>
            </li>
            <li>
              <Link to="/leaderboards/pvp">
                <span>{addHash(gw2aRank)}</span>
                <div>GW2A {T.translate('users.pvpStats.ranking')}</div>
              </Link>
            </li>
            <li>
              <span>{statSummary}</span>
              <div>{winLossByes}</div>
            </li>
            <li>
              <span>{rating || '-'}</span>
              <div>{T.translate('users.pvpStats.rating')}</div>
            </li>
          </ul>
        }
        type="users"
        title={alias}
        content={user}
        pinnedTab={stubUser && (
          <Link to={this.context._userAlias ? `settings?claiming=${alias}` : `join?claiming=${alias}`}>
            <Button type="cta">{T.translate('users.claimCta')}</Button>
          </Link>
        )}
        tabs={[{
          to: `/${alias}`,
          name: 'Overview',
          ignoreTitle: true,
          content: (
            <Overview user={user} pvpSeasons={pvpSeasons} worlds={worlds} />
          ),
        }, {
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
        }, {
          to: `/${alias}/guilds`,
          name: T.translate('guilds.name'),
          content: (
            <ContentCardList
              noBorder
              type="grid"
              alias={alias}
              resource="guilds"
              items={guilds}
            />
          ),
        }, {
          to: `/${alias}/matches`,
          name: T.translate('users.recentMatches'),
          content: (
            <div className={styles.gamesContainer}>
              <span />
              {pvpGames.map((game, index) =>
                <PvpGame game={game} key={game ? game.id : index} maps={maps} />)}
            </div>
          ),
        }]}
      />
    );
  }
}
