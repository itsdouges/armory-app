// @flow

import type { User as UserType, PvpSeasons, Worlds } from 'flowTypes';
import type { InjectedProps } from 'features/Auth/data';

import React, { Component } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import filter from 'lodash/filter';
import T from 'i18n-react';
import { Link } from 'react-router-dom';
import startCase from 'lodash/startCase';
import cx from 'classnames';

import Checkbox from 'common/components/Checkbox';
import authenticatedData from 'features/Auth/data';
import { makeStubItems } from 'lib/paginator';
import PaginatorGrid from 'common/layouts/PaginatorGrid';
import TooltipTrigger from 'common/components/TooltipTrigger';
import Button from 'common/components/Button';
import Icon from 'common/components/Icon';
import Content from 'common/layouts/Content';
import GuildContentCard from 'common/components/ContentCard/Guild';

import styles from './styles.less';
import Overview from './components/Overview';
import Achievements from './components/Achievements';
import Characters from './components/Characters';
import Wallet from './components/Wallet';
import Materials from './components/Materials';
import RecentMatches from './components/RecentMatches';
import Bank from './components/Bank';

const STUB_GUILDS = makeStubItems(4);

import {
  fetchUser,
  selectUser,
  setPrivacy,
  removePrivacy,
} from './actions';

export const selector = createSelector(
  (store) => store.users.data[store.users.selected],
  (store) => filter(store.pvpSeasons, ((season) => isObject(season))),
  (store) => store.worlds,
  (user, pvpSeasons, worlds) => ({
    user,
    pvpSeasons,
    worlds,
  })
);

function getActiveStanding ({ pvpStandings = [] } = {}, pvpSeasons) {
  const [activePvpSeason] = filter(pvpSeasons, ({ active }) => active);
  const seasonId = activePvpSeason && activePvpSeason.id;
  const standings = pvpStandings.filter(({ season_id }) => season_id === seasonId);
  return standings[0] || {};
}

const addHash = (str) => (str ? `#${str}` : '-');
const makeKey = (content, index) => (content ? content.name : index);

type Props = InjectedProps & {
  user?: UserType,
  fetchUser: (string) => void,
  selectUser: (string) => void,
  match: {
    url: string,
    params: {
      alias: string,
    },
  },
  worlds: Worlds,
  pvpSeasons: PvpSeasons,
  setPrivacy: (name: string, prop: string) => Promise<*>,
  removePrivacy: (name: string, prop: string) => Promise<*>,
};

const PRIVACY_OPTIONS = [
  {
    prop: 'achievements',
    name: 'Achievements',
  },
  {
    prop: 'pvpGames',
    name: 'Recent Matches',
  },
  {
    prop: 'pvpStats',
    name: 'PvP Stats',
  },
  {
    prop: 'pvpStandings',
    name: 'Pvp Standings',
  },
  {
    prop: 'bank',
    name: 'Bank',
  },
  {
    prop: 'inventory',
    name: 'Shared Inventory',
  },
  {
    prop: 'wallet',
    name: 'Wallet',
  },
  {
    prop: 'materials',
    name: 'Materials',
  },
];

export default connect(selector, {
  fetchUser,
  selectUser,
  setPrivacy,
  removePrivacy,
})(
authenticatedData(
class User extends Component<Props, *> {
  props: Props;
  state = {
    editing: false,
  };

  componentWillMount () {
    this.loadUser(this.props.match.params.alias);
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.match.params.alias === nextProps.match.params.alias) {
      return;
    }

    this.loadUser(nextProps.match.params.alias);
  }

  loadUser (alias: string) {
    this.props.fetchUser(alias);
    this.props.selectUser(alias);
  }

  toggleEditing = () => {
    this.setState((prevState) => ({
      editing: !prevState.editing,
    }));
  };

  setPrivacy = (prop: string, action: 'add' | 'remove') => {
    return action === 'add'
      ? this.props.setPrivacy(this.props.alias, prop)
      : this.props.removePrivacy(this.props.alias, prop);
  };

  renderPinnedTab () {
    const stubUser = get(this.props.user, 'stub');
    const { alias, match: { params } } = this.props;
    const editable = alias === params.alias;

    if (stubUser) {
      return (
        <Link to={alias ? `/settings?claiming=${params.alias}` : `/join?claiming=${params.alias}`}>
          <Button type="cta">{T.translate('users.claimCta')}</Button>
        </Link>
      );
    }

    if (editable) {
      return (
        <Button
          onClick={this.toggleEditing}
          className={styles.editButton}
          type="cta"
        >
          {T.translate(this.state.editing ? 'characters.done' : 'characters.edit')}
        </Button>
      );
    }

    return null;
  }

  canShowTab (privacy) {
    const { alias, match: { params } } = this.props;
    const editable = alias === params.alias;
    if (editable) {
      return true;
    }

    if (!this.props.user || this.props.user.stub || !this.props.user.privacy) {
      return false;
    }

    return !this.props.user.privacy.includes(privacy);
  }

  buildStatusData () {
    const { user } = this.props;
    if (!user) {
      return {
        statusText: 'Loading...',
        statusIcon: '',
      };
    }

    if (user.stub) {
      return {
        statusText: T.translate('users.stubUser'),
        statusIcon: 'svg/error-outline.svg',
      };
    }

    return {
      statusText: user.valid ? startCase(user.access) : T.translate('users.invalidToken'),
      statusIcon: user.valid ? `${user.access}.png` : 'svg/error-outline.svg',
    };
  }

  render () {
    const { user, match: { params: { alias } }, pvpSeasons, worlds } = this.props;
    const { editing } = this.state;

    const guilds = get(user, 'guilds', STUB_GUILDS.rows);
    const safeUser = user || {};
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
    const wins = rankedStats.wins || safeUser.wins || '0';
    const losses = rankedStats.losses || safeUser.losses || '0';
    const statSummary = (wins || losses || byes) ? `${wins}-${losses}-${byes || 0}` : '-';
    const { statusText, statusIcon } = this.buildStatusData();

    return (
      <Content
        className={cx({ [styles.invalid]: safeUser.valid === false })}
        cardExtra={(
          <TooltipTrigger data={statusText}>
            <Icon size="mini" className={styles.access} name={statusIcon} />
          </TooltipTrigger>
        )}
        basePath={this.props.match.url}
        metaContent={editing && (
          PRIVACY_OPTIONS.map(({ prop, name }) => (
            <Checkbox
              key={prop}
              checked={!user || !user.privacy.includes(prop)}
              onChange={(e) => this.setPrivacy(prop, e.target.checked ? 'remove' : 'add')}
              label={`Show ${name}`}
            />
        )))}
        extraContent={
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
        pinnedTab={this.renderPinnedTab()}
        tabs={[{
          path: '',
          name: 'Overview',
          ignoreTitle: true,
          content: (
            <Overview user={user} pvpSeasons={pvpSeasons} worlds={worlds} />
          ),
        }, {
          path: '/characters',
          name: 'Characters',
          content: <Characters alias={alias} />,
        }, {
          path: '/guilds',
          name: T.translate('guilds.name'),
          content: (
            <PaginatorGrid
              key="guilds"
              rows={guilds}
              limit={0}
              count={0}
              action={() => Promise.resolve()}
            >
              {(content, index) => <GuildContentCard key={makeKey(content, index)} content={content} />}
            </PaginatorGrid>
          ),
        }, {
          path: '/achievements',
          name: T.translate('users.achievements'),
          content: <Achievements />,
          hide: !this.canShowTab('achievements'),
        }, {
          path: '/matches',
          name: T.translate('users.recentMatches'),
          content: <RecentMatches alias={alias} />,
          hide: !this.canShowTab('pvpGames'),
        }, {
          path: '/bank',
          name: T.translate('users.bank'),
          content: <Bank alias={alias} />,
          hide: !this.canShowTab('bank'),
        }, {
          path: '/wallet',
          name: T.translate('users.wallet'),
          content: <Wallet id={alias} />,
          hide: !this.canShowTab('wallet'),
          flair: 'new',
        }, {
          path: '/materials',
          name: T.translate('users.materials'),
          content: <Materials id={alias} />,
          hide: !this.canShowTab('materials'),
          flair: 'new',
        }]}
      />
    );
  }
}
));
