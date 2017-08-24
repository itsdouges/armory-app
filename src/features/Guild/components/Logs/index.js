// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import startCase from 'lodash/startCase';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { humanize } from 'lib/date';
import Card from 'common/components/Card';
import Container from 'common/components/Container';
import Progress from 'common/components/Icon/Progress';
import Gw2Item from 'common/components/Gw2Item';
import GuildUpgrade from 'common/components/Gw2GuildUpgrade';
import Money from 'common/components/Gold';
import DisplayAd from 'common/components/DisplayAd';

import styles from './styles.less';
import { fetchGuildLogs } from '../../actions';
import { selector } from '../../guilds.reducer';
import { makeStubItems } from 'lib/paginator';

import type { Guild as GuildType } from 'flowTypes';

const LOGS_PER_PAGE = 20;
const LOGS_PER_AD = 100;
const STUB_LOGS = makeStubItems(LOGS_PER_PAGE);

const makeUserLink = (accountName, key) => (
  <Link key={key || accountName} to={`/${accountName}`}>
    {accountName}
  </Link>
);

const makeItem = (id) => <Gw2Item key={id} id={id} />;

const pluralize = (operation) => (operation === 'deposit' ? 'deposited' : 'withdrawn');
const createStashLog = (log) => (log.coins === 0
  ? [`${log.count} x `, makeItem(log.item_id), ` was ${pluralize(log.operation)}`]
  : [<Money key="money" coins={log.coins} />, ` were ${pluralize(log.operation)}`]);

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
      content = [makeUserLink(log.user), ' declined to join the guild'];
      break;

    case 'upgrade':
      content = ['Upgrade ', <GuildUpgrade key="u" id={log.upgrade_id} />, ` was ${log.action}`];
      break;

    case 'motd':
      content = log.motd;
      break;

    case 'stash':
      content = [createStashLog(log), ' by ', makeUserLink(log.user)];
      break;

    case 'treasury':
      content = [`${log.count} x `, makeItem(log.item_id), ' was deposited into the treasury by ', makeUserLink(log.user)];
      break;

    case 'rank_change':
      content = [makeUserLink(log.user, 'a'), '\'s rank was changed from ', <strong key="old">{log.old_rank}</strong>, ' to ', <strong key="new">{log.new_rank}</strong>, ' by ', makeUserLink(log.changed_by)];
      break;

    case 'joined':
      content = [makeUserLink(log.user), ' joined the guild!'];
      break;

    case 'invited':
      content = [makeUserLink(log.user, 'a'), ' was invited by ', makeUserLink(log.invited_by)];
      break;

    case 'kick':
      content = [makeUserLink(log.user, 'a'), ' was kicked by ', makeUserLink(log.kicked_by)];
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
export default class GuildLogs extends Component<*> {
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
        {logs.rows.map((log, index) => {
          const component = (
            <Card key={log ? log.id : index} size="small" className={styles.log}>
              {createLogView(log)}
            </Card>
          );

          if ((index + 1) % LOGS_PER_AD === 0) {
            return [
              component,
              <DisplayAd type="mrec" className={styles.ad} />,
            ];
          }

          return component;
        })}

        {(!guild || !guild.logs) && <div className={styles.progress}><Progress /></div>}
      </Container>
    );
  }
}
