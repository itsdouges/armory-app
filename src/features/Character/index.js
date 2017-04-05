// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Link } from 'react-router';

import { topSelector } from './characters.reducer';
import { fetchCharacter, selectCharacter } from './actions';
import { fetchUserCharacters, selectUser } from 'features/User/actions';

import Content from 'common/layouts/Content';
import ContentCard from 'common/components/ContentCard';

import Overview from './components/Overview';
import Bags from './components/Bags';
import styles from './styles.less';

import type { Character as CharacterType, Gw2Title } from 'flowTypes';

function buildDescription (character = {}) {
  // eslint-disable-next-line max-len
  return `${character.name} the level ${character.level} ${character.race} ${character.eliteSpecialization || character.profession}.`;
}

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
    if (prevProps.routeParams.character !== this.props.routeParams.character) {
      this.loadCharacter();
    }
  }

  loadCharacter () {
    const { character, alias } = this.props.routeParams;

    this.props.fetchCharacter(character, {
      ignoreAuth: this.context._userAlias !== alias,
    });

    this.props.selectCharacter(character);
    this.props.selectUser(alias);
  }

  render () {
    const {
      routeParams: { alias, character: characterName },
      routeParams,
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
        title={`${routeParams.character} | ${alias}`}
        type="characters"
        content={character}
        description={buildDescription(character)}
        extraSubtitle={characterTitle && <span><i>{characterTitle}</i> | </span>}
        extraContent={(
          <div className={styles.links}>
            <Link to={`/${(character && character.alias) || ''}`}>
              <ContentCard type="users" content={character} className={styles.linkItem} />
            </Link>

            <Link to={`/g/${(guild && guild.name) || ''}`}>
              <ContentCard type="guilds" content={guild} className={styles.linkItem} />
            </Link>
          </div>
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
          name: 'Bags',
          flair: 'new',
          content: <Bags />,
        }]}
      />
    );
  }
}
