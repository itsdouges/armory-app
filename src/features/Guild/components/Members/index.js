// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import styles from './styles.less';
import Progress from 'common/components/Icon/Progress';
import ContentCardList from 'common/components/ContentCardList';

import { fetchGuildMembers } from '../../actions';
import { selector } from '../../guilds.reducer';

import type { Guild as GuildType } from 'flowTypes';

@connect(selector, {
  fetchGuildMembers,
})
export default class GuildLogs extends Component {
  props: {
    guild?: GuildType,
    guildName: string,
    fetchGuildMembers?: (name: string) => void,
  };

  componentWillMount () {
    const { guildName } = this.props;
    this.props.fetchGuildMembers && this.props.fetchGuildMembers(guildName);
  }

  render () {
    const { guild } = this.props;
    const users = get(guild, 'users', []);
    const members = get(guild, 'members', []);

    return (
      <ContentCardList
        noBorder
        type="grid"
        resource="users"
        items={users.concat(members)}
      >
        {(!guild || !guild.members) && <Progress className={styles.progress} />}
      </ContentCardList>
    );
  }
}
