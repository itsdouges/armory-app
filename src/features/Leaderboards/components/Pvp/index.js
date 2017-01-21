// @flow

import type { PvpStanding } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ContentCard from 'common/components/ContentCard';
import { fetchPvpLeaderboard } from '../../actions';
import styles from './styles.less';

const CLOSE_TO_FIRST_THRESHOLD = 5;
// $FlowFixMe
const STUB_STANDINGS = [undefined, undefined, undefined, undefined, undefined];

function buildContent (standing, rank) {
  return standing && {
    alias: standing.alias,
    accountName: `#${rank} ${standing.accountName} | ${standing.ratingCurrent}`,
  };
}

function createInner (standing?: PvpStanding, index) {
  if (index < CLOSE_TO_FIRST_THRESHOLD) {
    return (
      <div className={index === 0 ? styles.firstContainer : styles.closeToFirstContainer}>
        <ContentCard
          type="users"
          size={index === 0 ? 'big' : 'small'}
          content={buildContent(standing, index + 1)}
        />
        {index === 0 && <div className={styles.firstContainerBg} />}
      </div>
    );
  }

  return !!standing && (
    <div className={styles.everyoneElse}>
      {`#${index + 1} ${standing.alias} | ${standing.accountName} | ${standing.ratingCurrent}`}
    </div>
  );
}

function mapStateToProps (state) {
  return {
    leaderboard: state.leaderboards.pvp,
  };
}

type Props = {
  fetchPvpLeaderboard?: () => void,
  leaderboard?: Array<PvpStanding>,
};

@connect(mapStateToProps, {
  fetchPvpLeaderboard,
})
export default class PvpLeaderboard extends Component {
  props: Props;

  componentWillMount () {
    const { fetchPvpLeaderboard: fetchLeaderboard } = this.props;
    fetchLeaderboard && fetchLeaderboard();
  }

  render () {
    const { leaderboard } = this.props;

    const pvpLeaderboard = leaderboard && leaderboard.length ? leaderboard : STUB_STANDINGS;

    return (
      <div className={styles.root}>
        <ul>
          {pvpLeaderboard.map((standing, index) => (
            <li
              key={standing ? standing.accountName : index}
              className={styles.standing}
            >
              <Link to={standing && standing.alias}>{createInner(standing, index)}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
