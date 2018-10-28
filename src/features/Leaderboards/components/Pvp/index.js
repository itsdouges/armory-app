// @flow

import type { PvpStanding, Paginated } from 'flowTypes';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import T from 'i18n-react';

import { makeStubItems } from 'lib/paginator';
import Progress from 'common/components/Icon/Progress';
import Avatar from 'common/components/Avatar';
import Paginator from 'react-scroll-paginator';
import { fetchPvpLeaderboard } from '../../actions';
import styles from './styles.less';
import { renderButton } from 'common/layouts/PaginatorGrid';
import DisplayAd from 'common/components/DisplayAd';

const STANDINGS_PER_PAGE = 100;
const STANDINGS_PER_AD = 15;
const STUB_STANDINGS = makeStubItems(STANDINGS_PER_PAGE);

const linkToUser = (standing: PvpStanding) => {
  return children => <Link to={`/${standing.alias}`}>{children}</Link>;
};

function buildStanding(standing: PvpStanding, rank: number) {
  const toUser = linkToUser(standing);

  return (
    <tr key={`${rank}-standing`}>
      <td>{toUser(`#${rank}`)}</td>
      <td>
        {toUser(
          <div key={`${standing.alias}-avatar`} className={styles.avatarContainer}>
            <Avatar alias={standing.alias} className={styles.avatar} />
            {standing.alias}
          </div>
        )}
      </td>
      <td>{toUser(standing.wins || 0)}</td>
      <td>{toUser(standing.losses || 0)}</td>
      <td>{toUser(standing.ratingCurrent)}</td>
      <td>{toUser(standing.deltaSinceLastCalculation || 0)}</td>
    </tr>
  );
}

function mapStateToProps(state, props) {
  return {
    leaderboard: state.leaderboards.pvp[props.region],
  };
}

type Props = {
  fetchPvpLeaderboard: (region: 'na' | 'eu' | 'gw2a', limit: number, offset: number) => Promise<>,
  leaderboard?: Paginated<PvpStanding>,
  region: 'gw2a' | 'na' | 'eu',
};

export default connect(
  mapStateToProps,
  {
    fetchPvpLeaderboard,
  }
)(
  class PvpLeaderboard extends Component<Props> {
    props: Props;

    static defaultProps = {
      fetchPvpLeaderboard: () => Promise.resolve(),
    };

    renderStanding = (standing?: PvpStanding, index: number) => {
      if (!standing) {
        return <tr key={`${index}-placeholder`} />;
      }

      const rank = index + 1;

      if ((index + 1) % STANDINGS_PER_AD === 0) {
        return [
          buildStanding(standing, rank),
          <tr key={`${rank}-ad`} className={styles.adRow}>
            <td colSpan="6">
              <DisplayAd type="mrec" />
            </td>
          </tr>,
        ];
      }

      return buildStanding(standing, rank);
    };

    render() {
      const { leaderboard, fetchPvpLeaderboard: fetchLeaderboard, region } = this.props;
      const pvpLeaderboard = leaderboard && leaderboard.rows ? leaderboard : STUB_STANDINGS;

      return (
        <Paginator
          key={region}
          rows={pvpLeaderboard.rows}
          limit={STANDINGS_PER_PAGE}
          count={pvpLeaderboard.count}
          action={(limit, offset) => fetchLeaderboard(region, limit, offset)}
          progressComponent={<Progress className={styles.progress} />}
          renderContainer={({ children }) =>
            leaderboard && leaderboard.rows ? (
              <table className={styles.rankingsTable}>
                <thead>
                  <tr>
                    <th />
                    <th />
                    <th>{T.translate('users.pvpStats.wins')}</th>
                    <th>{T.translate('users.pvpStats.losses')}</th>
                    <th>{T.translate('users.pvpStats.rating')}</th>
                    <th>{T.translate('words.delta')}</th>
                  </tr>
                </thead>
                <tbody>{children}</tbody>
              </table>
            ) : (
              undefined
            )
          }
          renderButton={renderButton}
        >
          {this.renderStanding}
        </Paginator>
      );
    }
  }
);
