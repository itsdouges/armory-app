// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import styles from './styles.less';
import Progress from 'common/components/Icon/Progress';
import Container from 'common/components/Container';

import Team from './Team';

import { fetchGuildTeams } from '../../actions';

import type { Guild as GuildType, Maps } from 'flowTypes';

export const selector = createSelector(
  (store) => store.guilds.data[store.guilds.selected],
  (store) => store.maps,
  (guild, maps) => ({
    guild,
    maps,
  })
);

type Props = {
  guild?: GuildType,
  guildName: string,
  fetchGuildTeams?: (name: string) => void,
  maps: Maps,
};

@connect(selector, {
  fetchGuildTeams,
})
export default class GuildTeams extends Component {
  props: Props;

  componentWillMount () {
    const { guildName } = this.props;
    this.props.fetchGuildTeams && this.props.fetchGuildTeams(guildName);
  }

  render () {
    const { guild, maps } = this.props;

    const showProgress = !guild || !guild.teams;

    return (
      <Container>
        {guild && guild.teams && guild.teams.map((team) => <Team key={team.id} {...team} maps={maps} />)}

        {showProgress && <div className={styles.progress}><Progress /></div>}
      </Container>
    );
  }
}
