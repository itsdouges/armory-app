// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import { selector } from './characters.reducer';
import { fetchCharacter, selectCharacter } from './actions';
import { fetchUserCharacters, selectUser } from 'features/User/actions';

import Content from 'common/layouts/Content';

import ContentCard from 'common/components/ContentCard';
import Bags from './components/Bags';

import Overview from './components/Overview';

import styles from './styles.less';

import type { Character as CharacterType, Pets, Gw2Title } from 'flowTypes';

function buildDescription (character = {}) {
  // eslint-disable-next-line
  return `${character.name} the level ${character.level} ${character.race} ${character.eliteSpecialization || character.profession}.`;
}

type Props = {
  character?: CharacterType,
  mode: 'pve' | 'pvp' | 'wvw',
  routeParams: {
    character: string,
    alias: string,
  },
  pets: Pets,
  title: Gw2Title,
  dispatchFetchCharacter: (name: string) => void,
  dispatchFetchUserCharacters: (name: string) => void,
  dispatchSelectCharacter: (name: string) => void,
  dispatchSelectUser: (name: string) => void,
};

@connect(selector, {
  dispatchSelectUser: selectUser,
  dispatchFetchCharacter: fetchCharacter,
  dispatchSelectCharacter: selectCharacter,
  dispatchFetchUserCharacters: fetchUserCharacters,
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
    const {
      dispatchFetchCharacter,
      dispatchFetchUserCharacters,
      dispatchSelectCharacter,
      dispatchSelectUser,
    } = this.props;

    dispatchFetchCharacter(character, {
      ignoreAuth: this.context._userAlias !== alias,
    });

    dispatchFetchUserCharacters(alias, {
      ignoreAuth: this.context._userAlias !== alias,
    });

    dispatchSelectCharacter(character);
    dispatchSelectUser(alias);
  }

  render () {
    const {
      routeParams: { alias, character: characterName },
      routeParams,
      character,
      mode,
      pets,
      title,
    } = this.props;

    const characterPetIds = get(character, `skills[${mode}].pets.terrestrial`, undefined);
    const characterTitle = get(title, 'name');

    return (
      <Content
        title={`${routeParams.character} | ${alias}`}
        type="characters"
        content={character}
        description={buildDescription(character)}
        extraSubtitle={characterTitle && <span><i>{characterTitle}</i> | </span>}
        extraContent={characterPetIds &&
          characterPetIds.map((id) =>
            <ContentCard className={styles.subContent} key={id} content={pets[id]} type="pet" />
        )}
        tabs={[{
          to: `/${alias}/c/${characterName}`,
          name: 'PvE',
          ignoreTitle: true,
          content: (
            <Overview
              name={characterName}
              modee="pve"
              userAlias={alias}
            />
          ),
        }, {
          to: `/${alias}/c/${characterName}/pvp`,
          name: 'PvP',
          content: (
            <Overview
              name={characterName}
              modee="pvp"
              userAlias={alias}
            />
          ),
        }, {
          to: `/${alias}/c/${characterName}/wvw`,
          name: 'WvW',
          content: (
            <Overview
              name={characterName}
              modee="wvw"
              userAlias={alias}
            />
          ),
        }, {
          to: `/${alias}/c/${characterName}/bags`,
          name: 'Bags',
          content: (
            <Bags />
          ),
        }]}
      />
    );
  }
}
