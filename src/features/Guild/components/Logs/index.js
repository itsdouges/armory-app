// @flow

import { Component } from 'react';
import { connect } from 'react-redux';

import Container from 'common/components/Container';
import Progress from 'common/components/Icon/Progress';

import { fetchGuildLogs } from '../../actions';
import { selector } from '../../guilds.reducer';

import type { Guild as GuildType } from 'flowTypes';

@connect(selector, {
  fetchGuildLogs,
})
export default class GuildLogs extends Component {
  props: {
    guild?: GuildType,
    guildName: string,
    fetchGuildLogs?: (name: string) => void,
  };

  componentWillMount () {
    const { guildName } = this.props;
    this.props.fetchGuildLogs && this.props.fetchGuildLogs(guildName);
  }

  render () {
    const { guild } = this.props;

    return (
      <Container>
        {guild && guild.logs && guild.logs.map((log) => (
          <div key={log.id}>
            {log.time}
            {log.user}
            {log.type}
          </div>
        ))}

        {(!guild || !guild.logs) && <Progress />}
      </Container>
    );
  }
}
