// @flow

import { Component } from 'react';
import { connect } from 'react-redux';

import Content from 'common/layouts/Content';
import ContentCardList from 'common/components/ContentCardList';

import {
  selectGuild,
  fetchGuild,
} from './actions';
import { selector } from './guilds.reducer';

@connect(selector, {
  dispatchSelectGuild: selectGuild,
  dispatchFetchGuild: fetchGuild,
})
export default class Guild extends Component {
  props: {
    guild: {
      tag: string,
      characters?: [],
    },
    routeParams: {
      guildName: string,
    },
    dispatchSelectGuild: (name: string) => void,
    dispatchFetchGuild: (name: string) => void,
  };

  componentWillMount () {
    const { guildName } = this.props.routeParams;
    const { dispatchSelectGuild, dispatchFetchGuild } = this.props;

    dispatchSelectGuild(guildName);
    dispatchFetchGuild(guildName);
  }

  render () {
    const { guild = { tag: '...', characters: undefined }, routeParams: { guildName } } = this.props;

    return (
      <Content
        title={`${guildName} [${guild.tag}]`}
        content={guild}
        type="guilds"
        tabs={[
          {
            name: 'Characters',
            ignoreTitle: true,
            to: window.location.pathname,
            content: (
              <ContentCardList
                noBorder
                type="grid"
                items={guild && guild.characters}
              />
            ),
          },
        ]}
      />
    );
  }
}
