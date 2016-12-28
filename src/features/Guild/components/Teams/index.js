// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
// import get from 'lodash/get';

import styles from './styles.less';
import Progress from 'common/components/Icon/Progress';

import Team from './Team';

import { fetchGuildTeams } from '../../actions';
import { selector } from '../../guilds.reducer';

import type { Guild as GuildType } from 'flowTypes';

@connect(selector, {
  fetchGuildTeams,
})
export default class GuildTeams extends Component {
  props: {
    guild?: GuildType,
    guildName: string,
    fetchGuildTeams?: (name: string) => void,
  };

  componentWillMount () {
    const { guildName } = this.props;
    this.props.fetchGuildTeams && this.props.fetchGuildTeams(guildName);
  }

  render () {
    const { guild } = this.props;

    return (
      <div>
        {guild && guild.teams && guild.teams.map((team) => <Team key={team.id} {...team} />)}

        {(!guild || !guild.teams) && <div className={styles.progress}><Progress /></div>}
      </div>
    );
  }
}
