// @flow

import type { Guild as GuildType } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import UserContentCard from 'common/components/ContentCard/User';
import Progress from 'common/components/Icon/Progress';
import Paginator from 'common/components/Paginator';
import { selector } from 'features/Guild/guilds.reducer';
import { fetchGuildMembers } from 'features/Guild/actions';
import Grid from 'common/layouts/Grid';

const MEMBERS_PER_PAGE = 50;

@connect(selector, {
  fetchMembers: fetchGuildMembers,
})
// eslint-disable-next-line
export default class GuildCharacters extends Component {
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
      <Paginator
        key="characters"
        rows={users.rows}
        limit={MEMBERS_PER_PAGE}
        count={users.count}
        action={(limit, offset) => fetchMembers(name, limit, offset)}
        progressComponent={<Progress style={{ display: 'block', margin: '2em auto' }} />}
        containerElement={Grid}
        containerProps={{
          containerElement: 'ul',
          type: 'col5',
          fullWidth: true,
        }}
      >
        {(content) => <UserContentCard content={content} />}
      </Paginator>
    );
  }
}
