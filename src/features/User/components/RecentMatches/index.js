// @flow

import type { User, Maps } from 'flowTypes';

import get from 'lodash/get';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { makeStubItems } from 'lib/paginator';

import PvpGame from '../PvpGame';
import { fetchPvpGames } from '../../actions';
import styles from './styles.less';

export const selector = createSelector(
  (store) => store.users.data[store.users.selected],
  (store) => store.maps,
  (user, maps) => ({
    user,
    maps,
  }),
);

const STUB_MATCHES = makeStubItems(10).rows;

type Props = {
  user: User,
  maps: Maps,
  alias: string,
  fetchPvpGames: (string) => Promise<*>,
};

export default connect(selector, {
  fetchPvpGames,
})(
class RecentMatches extends Component<Props> {
  props: Props;

  componentDidMount () {
    this.props.fetchPvpGames(this.props.alias);
  }

  render () {
    const { user, maps } = this.props;
    const userGames = get(user, 'pvpGames.length') && get(user, 'pvpGames');
    const pvpGames = userGames || STUB_MATCHES;

    return (
      <div className={styles.root}>
        <span />
        {pvpGames.map((game, index) =>
          <PvpGame game={game} key={game ? game.id : index} maps={maps} />)}
      </div>
    );
  }
});
