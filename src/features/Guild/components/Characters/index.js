// @flow

import type { Guild as GuildType } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
// import get from 'lodash/get';

// import UserContentCard from 'common/components/ContentCard/User';
// import PaginatorGrid from 'common/layouts/PaginatorGrid';
import { selector } from 'features/Guild/guilds.reducer';
import { fetchGuildMembers } from 'features/Guild/actions';

// const MEMBERS_PER_PAGE = 50;

@connect(selector, {
  fetchMembers: fetchGuildMembers,
})
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
    // const { guild = {}, fetchMembers, name } = this.props;
    // const users = get(guild, 'members', {});

    return (
      <div />
    );
  }
}
