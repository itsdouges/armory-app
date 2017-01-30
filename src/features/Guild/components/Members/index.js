// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import ContentCardList from 'common/components/ContentCardList';

import { selector } from '../../guilds.reducer';

import type { Guild as GuildType } from 'flowTypes';

@connect(selector)
// eslint-disable-next-line
export default class GuildLogs extends Component {
  props: {
    guild?: GuildType,
  };

  render () {
    const { guild } = this.props;
    const users = get(guild, 'users', []);

    return (
      <ContentCardList
        noBorder
        type="grid"
        resource="users"
        items={users}
      />
    );
  }
}
