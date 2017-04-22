// @flow

import type { Guild as GuildType } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import ContentCardList from 'common/components/ContentCardList';
import Progress from 'common/components/Icon/Progress';
import Paginator from 'common/components/Paginator';
import { selector } from 'features/Guild/guilds.reducer';
import { fetchGuildMembers } from 'features/Guild/actions';

const MEMBERS_PER_PAGE = 50;

@connect(selector, {
  fetchMembers: fetchGuildMembers,
})
// eslint-disable-next-line
export default class GuildLogs extends Component {
  props: {
    guild?: GuildType,
    fetchMembers: (string, number, number) => Promise<>,
    name: string,
  };

  static defaultProps = {
    fetchMembers: () => Promise.resolve(),
  };

  render () {
    const { guild = {}, fetchMembers, name } = this.props;
    const users = get(guild, 'members', {});

    return (
      <div>
        <ContentCardList
          noBorder
          type="grid"
          resource="users"
          items={users}
        />

        <Paginator
          key="guildLogs"
          rows={users.rows}
          limit={MEMBERS_PER_PAGE}
          count={users.count}
          action={(limit, offset) => fetchMembers(name, limit, offset)}
          progressComponent={<Progress />}
        >
          {(log) => <div>{log.name}</div>}
        </Paginator>
      </div>
    );
  }
}
