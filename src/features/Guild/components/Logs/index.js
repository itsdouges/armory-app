// @flow

import { Component } from 'react';
import { connect } from 'react-redux';

import { humanize } from 'lib/date';
import Card from 'common/components/Card';
import Container from 'common/components/Container';
import Progress from 'common/components/Icon/Progress';

import styles from './styles.less';
import { fetchGuildLogs } from '../../actions';
import { selector } from '../../guilds.reducer';

import type { Guild as GuildType } from 'flowTypes';

function createLogView (log) {
  return [
    <div key="time">{humanize(log.time)}</div>,
    <div key="user">{log.user}</div>,
    <div key="type">{log.type}</div>,
  ];
}

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
      <Container className={styles.root}>
        {guild && guild.logs && guild.logs.map((log) => (
          <Card key={log.id} size="small" className={styles.log}>
            {createLogView(log)}
          </Card>
        ))}

        {(!guild || !guild.logs) && <Progress />}
      </Container>
    );
  }
}
