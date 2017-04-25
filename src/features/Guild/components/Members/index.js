// @flow

import type { Guild as GuildType } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import times from 'lodash/times';

import UserContentCard from 'common/components/ContentCard/User';
import PaginatorGrid from 'common/layouts/PaginatorGrid';
import { selector } from 'features/Guild/guilds.reducer';
import { fetchGuildMembers } from 'features/Guild/actions';

const MEMBERS_PER_PAGE = 50;
const STUB_MEMBERS = { rows: times(MEMBERS_PER_PAGE, () => undefined), count: 9999 };

const makeKey = (content, index) => (content ? content.accountName : index);

@connect(selector, {
  fetchMembers: fetchGuildMembers,
})
export default class GuildMembers extends Component {
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
    const users = get(guild, 'members', STUB_MEMBERS);

    return (
      <PaginatorGrid
        key="members"
        rows={users.rows}
        limit={MEMBERS_PER_PAGE}
        count={users.count}
        action={(limit, offset) => fetchMembers(name, limit, offset)}
      >
        {(content, index) => <UserContentCard key={makeKey(content, index)} content={content} />}
      </PaginatorGrid>
    );
  }
}
