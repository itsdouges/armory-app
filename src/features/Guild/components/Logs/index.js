// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import startCase from 'lodash/startCase';
import times from 'lodash/times';
import cx from 'classnames';

import { humanize } from 'lib/date';
import Card from 'common/components/Card';
import Container from 'common/components/Container';
import Progress from 'common/components/Icon/Progress';

import styles from './styles.less';
import { fetchGuildLogs } from '../../actions';
import { selector } from '../../guilds.reducer';

import type { Guild as GuildType } from 'flowTypes';

const pluralize = (operation) => (operation === 'deposit' ? 'deposited' : 'withdrawn');
const createStashLog = (log) => (log.coins === 0
  ? `ItemId:${log.item_id} x ${log.count} was ${pluralize(log.operation)}`
  : `${log.coins} coins were ${pluralize(log.operation)}`);

const LOGS_PER_PAGE = 20;
const STUB_LOGS = { rows: times(LOGS_PER_PAGE, () => undefined), count: 9999 };

function createLogView (log) {
  if (!log) {
    return (
      <span className={styles.placeholder}>
        <span className={styles.placeholder}>
          Logs are loading as fast as they can...
        </span>

        <time className={cx(styles.logTime, styles.placeholder)}>1 second ago</time>
      </span>
    );
  }

  let content;

  switch (log.type) {
    case 'invite_declined':
      content = `${log.user} declined to join the guild`;
      break;

    case 'upgrade':
      content = `UpgradeId:${log.upgrade_id} was ${log.action}`;
      break;

    case 'motd':
      content = log.motd;
      break;

    case 'stash':
      content = `${createStashLog(log)} by ${log.user}`;
      break;

    case 'treasury':
      content = `ItemId:${log.item_id} x ${log.count} was deposited into the treasury by ${log.user}`;
      break;

    case 'rank_change':
      content = `Rank for ${log.user} was changed by ${log.changed_by} from ${log.old_rank} to ${log.new_rank}`;
      break;

    case 'joined':
      content = `${log.user} joined the guild`;
      break;

    case 'invited':
      content = `${log.user} was invited by ${log.invited_by}`;
      break;

    case 'kick':
      content = `${log.user} was kicked by ${log.kicked_by}`;
      break;

    case 'influence':
      content = `Influence was ${startCase(log.activity)}`;
      break;

    default:
      // eslint-disable-next-line
      console.log('Log not handled', log);
      break;
  }

  return (
    <span>
      {content} <time className={styles.logTime}>{humanize(log.time)}</time>
    </span>
  );
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
    const logs = guild && guild.logs ? { rows: guild.logs } : STUB_LOGS;

    return (
      <Container className={styles.root}>
        {logs.rows.map((log, index) => (
          <Card key={log ? log.id : index} size="small" className={styles.log}>
            {createLogView(log)}
          </Card>
        ))}

        {(!guild || !guild.logs) && <div className={styles.progress}><Progress /></div>}
      </Container>
    );
  }
}
