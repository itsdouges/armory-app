// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import T from 'i18n-react';
import { Link } from 'react-router-dom';

import type { InjectedProps } from 'features/Auth/data';
import type { Guild as GuildType } from 'flowTypes';

import Button from 'common/components/Button';
import authenticatedData from 'features/Auth/data';
import SvgIcon from 'common/components/Icon/Svg';
import Content from 'common/layouts/Content';
import ContentCard from 'common/components/ContentCard';
import TooltipTrigger from 'common/components/TooltipTrigger';
import Checkbox from 'common/components/Checkbox';

import Characters from './components/Characters';
import Members from './components/Members';
import Logs from './components/Logs';
import Overview from './components/Overview';
import styles from './styles.less';
import { selector } from './guilds.reducer';
import {
  selectGuild,
  fetchGuild,
  setPublic,
  removePublic,
} from './actions';

const PRIVACY_OPTIONS = [
  {
    prop: 'motd',
    name: 'Message of the day',
  },
  {
    prop: 'level',
    name: 'Level',
  },
  {
    prop: 'influence',
    name: 'Influence',
  },
  {
    prop: 'aetherium',
    name: 'Aetherium',
  },
  {
    prop: 'favor',
    name: 'Favor',
  },
  {
    prop: 'resonance',
    name: 'Resonance',
  },
  {
    prop: 'logs',
    name: 'Logs',
  },
];

export default connect(selector, {
  selectGuild,
  fetchGuild,
  setPublic,
  removePublic,
})(
authenticatedData(
class Guild extends Component<*, *> {
  props: InjectedProps & {
    guild?: GuildType,
    match: {
      url: string,
      params: {
        guildName: string,
      },
    },
    selectGuild: (name: string) => Promise<*>,
    fetchGuild: (name: string) => Promise<*>,
    setPublic: (name: string, prop: string) => Promise<*>,
    removePublic: (name: string, prop: string) => Promise<*>,
  };

  state = {
    editing: false,
  };

  componentWillMount () {
    const { guildName } = this.props.match.params;

    this.props.selectGuild(guildName);
    this.props.fetchGuild(guildName);
  }

  toggleEditing = () => {
    this.setState((prevState) => ({
      editing: !prevState.editing,
    }));
  };

  setPrivacy = (prop: string, action: 'add' | 'remove') => {
    return action === 'add'
      ? this.props.setPublic(this.props.match.params.guildName, prop)
      : this.props.removePublic(this.props.match.params.guildName, prop);
  };

  canShowTab (privacy) {
    const { guild } = this.props;
    if (!guild) {
      return false;
    }

    // Silly work around to show the tab is motd is populated.
    // It's assumed the user must have access to the guild if
    // motd is shown. We need to expose a value (maybe authenticated: true)
    // if the user can see the guild so we can just use that instead.
    // Needs server work.
    if (guild.motd) {
      return true;
    }

    // NOTE: Privacy is flipped for guilds. If privacy is populated it means
    // it IS shown to the public.
    return guild.privacy.includes(privacy);
  }

  render () {
    const { alias, guild, match: { params: { guildName } } } = this.props;

    const editable = guild && guild.leader && guild.leader.alias === alias;
    const showGuildLeader = !guild || guild.leader !== null;
    const claimed = guild && guild.claimed;
    const claimedData = {
      logo: claimed ? 'done' : 'error-outline',
      message: claimed ? T.translate('guilds.claimed') : T.translate('guilds.unclaimed'),
    };

    return (
      <Content
        basePath={this.props.match.url}
        title={`${guildName} [${(guild && guild.tag) || '...'}]`}
        pinnedTab={editable && (
          <Button
            onClick={this.toggleEditing}
            className={styles.editButton}
            type="cta"
          >
            {T.translate(this.state.editing ? 'characters.done' : 'characters.edit')}
          </Button>
        )}
        cardExtra={
          <TooltipTrigger data={claimedData.message}>
            <SvgIcon size="mini" className={styles.claimCta} name={claimedData.logo} />
          </TooltipTrigger>
        }
        extraContent={
          <aside>
            {showGuildLeader && (
              <Link to={`/${(guild && guild.leader && guild.leader.alias) || ''}`}>
                <ContentCard type="users" content={guild && guild.leader} />
              </Link>
            )}
          </aside>
        }
        metaContent={this.state.editing && (
          PRIVACY_OPTIONS.map(({ prop, name }) => (
            <Checkbox
              key={prop}
              checked={!guild || guild.privacy.includes(prop)}
              onChange={(e) => this.setPrivacy(prop, e.target.checked ? 'add' : 'remove')}
              label={`Show ${name}`}
            />
        )))}
        content={guild}
        type="guilds"
        tabs={[{
          name: 'Overview',
          path: '',
          ignoreTitle: true,
          content: <Overview data={guild} />,
        }, {
          name: 'Members',
          path: '/members',
          content: <Members name={guildName} />,
        }, {
          name: 'Characters',
          path: '/characters',
          content: <Characters name={guildName} />,
        }, {
          name: 'Logs',
          path: '/logs',
          content: <Logs guildName={guildName} />,
          hide: !this.canShowTab('logs'),
        }]}
      />
    );
  }
}));
