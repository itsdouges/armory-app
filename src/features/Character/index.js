// @flow

import type { Character as CharacterType, Gw2Title } from 'flowTypes';


import { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import T from 'i18n-react';

import { topSelector } from './characters.reducer';
import { fetchCharacter, selectCharacter } from './actions';
import { fetchUserCharacters, selectUser } from 'features/User/actions';

import Content from 'common/layouts/Content';
import ContentCard from 'common/components/ContentCard';

import Overview from './components/Overview';
import Bags from './components/Bags';
import styles from './styles.less';

const buildDescription = (character = {}) =>
  `${character.name} the level ${character.level} ${character.race} ${character.eliteSpecialization || character.profession}.`;

type Props = {
  character?: CharacterType,
  mode: 'pve' | 'pvp' | 'wvw',
  routeParams: {
    character: string,
    alias: string,
  },
  title: Gw2Title,
  fetchCharacter: (name: string) => void,
  fetchUserCharacters: (name: string) => void,
  selectCharacter: (name: string) => void,
  selectUser: (name: string) => void,
};

@connect(topSelector, {
  selectUser,
  fetchCharacter,
  selectCharacter,
  fetchUserCharacters,
})
export default class Character extends Component {
  props: Props;

  componentWillMount () {
    this.loadCharacter();
  }

  componentDidUpdate (prevProps: Props) {
    if (prevProps.match.params.character !== this.props.match.params.character) {
      this.loadCharacter();
    }
  }

  loadCharacter () {
    const { character, alias } = this.props.match.params;

    this.props.fetchCharacter(character);
    this.props.selectCharacter(character);
    this.props.selectUser(alias);
  }

  render () {
    const {
      match: { params: { alias, character: characterName } },
      character,
      title,
    } = this.props;

    const characterTitle = get(title, 'name');
    const guild = character && {
      name: character.guild_name,
      tag: character.guild_tag,
      id: character.guild,
    };

    return (
      <Content
        title={`${character} | ${alias}`}
        type="characters"
        content={character}
        description={buildDescription(character)}
        extraSubtitle={characterTitle && <span><i>{characterTitle}</i> | </span>}
        extraContent={(
          <aside className={styles.links}>
            <Link to={`/${(character && character.alias) || ''}`}>
              <ContentCard type="users" content={character} />
            </Link>

            <Link to={`/g/${(guild && guild.name) || ''}`}>
              <ContentCard type="guilds" content={guild} />
            </Link>
          </aside>
        )}
        tabs={[{
          to: `/${alias}/c/${characterName}`,
          name: 'PvE',
          ignoreTitle: true,
          content: (
            <Overview
              name={characterName}
              mode="pve"
              userAlias={alias}
            />
          ),
        }, {
          to: `/${alias}/c/${characterName}/pvp`,
          name: 'PvP',
          content: (
            <Overview
              name={characterName}
              mode="pvp"
              userAlias={alias}
            />
          ),
        }, {
          to: `/${alias}/c/${characterName}/wvw`,
          name: 'WvW',
          content: (
            <Overview
              name={characterName}
              mode="wvw"
              userAlias={alias}
            />
          ),
        }, {
          to: `/${alias}/c/${characterName}/bags`,
          name: T.translate('characters.bags'),
          flair: 'new',
          content: <Bags />,
        }]}
      />
    );
  }
}
