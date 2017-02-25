// @flow

import type { PvpStanding } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import T from 'i18n-react';

import ContentCard from 'common/components/ContentCard';
import { fetchPvpLeaderboard } from '../../actions';
import styles from './styles.less';

// $FlowFixMe
const STUB_STANDINGS = [undefined, undefined, undefined, undefined, undefined];

function buildContent (standing, rank) {
  const winsText = T.translate('users.pvpStats.wins');
  const lossesText = T.translate('users.pvpStats.losses');
  const ratingText = T.translate('users.pvpStats.rating');

  return standing && {
    alias: `#${rank} ${standing.alias}`,
    accountName: `${standing.ratingCurrent} ${ratingText} | ${standing.wins || '-'} ${winsText} | ${standing.losses || '-'} ${lossesText}`,
  };
}

function createInner (standing?: PvpStanding, rank) {
  const isFirstPlace = rank === 1;

  return (
    <div className={isFirstPlace ? styles.firstContainer : styles.closeToFirstContainer}>
      <ContentCard
        type="users"
        size={isFirstPlace ? 'big' : 'small'}
        content={buildContent(standing, rank)}
      />

      {isFirstPlace && <div className={styles.firstContainerBg} />}
    </div>
  );
}

function mapStateToProps (state, props) {
  return {
    leaderboard: state.leaderboards.pvp[props.region],
  };
}

type Props = {
  fetchPvpLeaderboard?: () => void,
  leaderboard?: Array<PvpStanding>,
  region: 'gw2a' | 'na' | 'eu',
};

@connect(mapStateToProps, {
  fetchPvpLeaderboard,
})
export default class PvpLeaderboard extends Component {
  props: Props;

  componentWillMount () {
    this.readLadder(this.props.region);
  }

  componentWillUpdate (nextProps: Props) {
    if (nextProps.region !== this.props.region) {
      this.readLadder(nextProps.region);
    }
  }

  readLadder (region: string) {
    const { fetchPvpLeaderboard: fetchLeaderboard } = this.props;
    fetchLeaderboard && fetchLeaderboard(region);
  }

  render () {
    const { leaderboard } = this.props;
    const pvpLeaderboard = leaderboard && leaderboard.length ? leaderboard : STUB_STANDINGS;

    return (
      <div className={styles.root}>
        <ol>
          {pvpLeaderboard.map((standing, index) => (
            <li
              key={standing ? standing.accountName : index}
              className={styles.standing}
            >
              <Link to={`/${standing ? standing.alias : ''}`}>{createInner(standing, index + 1)}</Link>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
