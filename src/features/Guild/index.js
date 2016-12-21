// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import T from 'i18n-react';

import type { Guild as GuildType } from 'flowTypes';

import SvgIcon from 'common/components/Icon/Svg';
import Content from 'common/layouts/Content';
import ContentCardList from 'common/components/ContentCardList';
import TooltipTrigger from 'common/components/TooltipTrigger';
import decoration from 'common/styles/decoration.less';

import Logs from './components/Logs';
import Overview from './components/Overview';
import styles from './styles.less';

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
    guild?: GuildType,
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
    const { guild, routeParams: { guildName } } = this.props;
    const encodedGuildName = encodeURI(guildName);

    const claimed = guild && guild.claimed;
    const claimedData = {
      logo: claimed ? 'done' : 'error-outline',
      message: claimed ? T.translate('guilds.claimed') : T.translate('guilds.unclaimed'),
    };

    return (
      <Content
        title={`${guildName} [${(guild && guild.tag) || '...'}]`}
        cardExtra={(
          <TooltipTrigger data={claimedData.message}>
            <SvgIcon size="mini" className={styles.claimCta} name={claimedData.logo} />
          </TooltipTrigger>
        )}
        content={guild}
        type="guilds"
        tabs={[
          {
            name: <span className={decoration.new}>Overview</span>,
            to: `/g/${encodedGuildName}`,
            ignoreTitle: true,
            content: (
              <Overview data={guild} />
            ),
          },
          {
            name: 'Logs',
            to: `/g/${encodedGuildName}/logs`,
            content: <Logs guildName={guildName} />,
          },
          {
            name: 'Users',
            to: `/g/${encodedGuildName}/users`,
            content: (
              <ContentCardList
                noBorder
                type="grid"
                resource="users"
                items={guild && guild.users}
              />
            ),
          },
          {
            name: 'Characters',
            to: `/g/${encodedGuildName}/characters`,
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
