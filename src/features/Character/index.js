// @flow

import type { Character as CharacterType, Gw2Title } from 'flowTypes';
import type { InjectedProps } from 'features/Auth/data';

import { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import T from 'i18n-react';

import { fetchUserCharacters, selectUser } from 'features/User/actions';
import authenticatedData from 'features/Auth/data';
import Button from 'common/components/Button';
import Content from 'common/layouts/Content';
import ContentCard from 'common/components/ContentCard';
import Checkbox from 'common/components/Checkbox';

import { fetchCharacter, selectCharacter, updateCharacter, setPrivacy, removePrivacy } from './actions';
import { topSelector } from './characters.reducer';
import Overview from './components/Overview';
import Bags from './components/Bags';
import styles from './styles.less';

const buildDescription = (character = {}) =>
  // eslint-disable-next-line max-len
  `${character.name} the level ${character.level} ${character.race} ${character.eliteSpecialization || character.profession}.`;

const PRIVACY_OPTIONS = [
  {
    prop: 'crafting',
    name: 'Crafting',
  },
  {
    prop: 'skills',
    name: 'Skills',
  },
  {
    prop: 'specializations',
    name: 'Specializations',
  },
  {
    prop: 'bags',
    name: 'Bags',
  },
  {
    prop: 'equipment',
    name: 'Equipment',
  },
  {
    prop: 'equipment_pvp',
    name: 'PvP Equipment',
  },
];

type UpdateOptions = {
  showPublic: boolean,
};

type Props = InjectedProps & {
  character?: CharacterType,
  mode: 'pve' | 'pvp' | 'wvw',
  match: {
    url: string,
    params: {
      character: string,
      alias: string,
    },
  },
  title: Gw2Title,
  fetchCharacter: (name: string) => void,
  fetchUserCharacters: (name: string) => void,
  selectCharacter: (name: string) => void,
  selectUser: (name: string) => void,
  updateCharacter: (name: string, options: UpdateOptions) => Promise<*>,
  setPrivacy: (name: string, prop: string) => Promise<*>,
  removePrivacy: (name: string, prop: string) => Promise<*>,
};

export default authenticatedData(
connect(topSelector, {
  selectUser,
  fetchCharacter,
  selectCharacter,
  fetchUserCharacters,
  updateCharacter,
  setPrivacy,
  removePrivacy,
})(
class Character extends Component {
  props: Props;

  state = {
    editing: false,
  };

  componentWillMount () {
    this.loadCharacter();
  }

  componentDidUpdate (prevProps: Props) {
    if (prevProps.match.params.character !== this.props.match.params.character) {
      this.loadCharacter();
    }
  }

  hide = (e: EventHandler) => {
    const { name } = this.props;

    this.props.updateCharacter(name, {
      showPublic: e.target.checked,
    });
  }

  setPrivacy = (prop: string, action: 'add' | 'remove') => {
    return action === 'add'
      ? this.props.setPrivacy(this.props.name, prop)
      : this.props.removePrivacy(this.props.name, prop);
  };


  loadCharacter () {
    const { character, alias } = this.props.match.params;

    this.props.fetchCharacter(character);
    this.props.selectCharacter(character);
    this.props.selectUser(alias);
  }

  toggleEditing = () => {
    this.setState((prevState) => ({
      editing: !prevState.editing,
    }));
  };

  render () {
    const {
      match: { params },
      character,
      title,
      alias,
    } = this.props;

    const { editing } = this.state;

    const editable = alias === params.alias;
    const characterTitle = get(title, 'name');
    const showPublic = get(character, 'authorization.showPublic');
    const guild = character && {
      name: character.guild_name,
      tag: character.guild_tag,
      id: character.guild,
    };

    return (
      <Content
        title={`${params.character} | ${params.alias}`}
        type="characters"
        content={character}
        basePath={this.props.match.url}
        description={buildDescription(character)}
        extraSubtitle={characterTitle && <span><i>{characterTitle}</i> | </span>}
        metaContent={editing && [
          <Checkbox
            key="hide-show"
            checked={!!showPublic}
            onChange={this.hide}
            label={T.translate(showPublic ? 'characters.shown' : 'characters.hidden')}
          />,

          ...PRIVACY_OPTIONS.map(({ prop, name }) => (
            <Checkbox
              key={prop}
              checked={!character || !character.privacy.includes(prop)}
              onChange={(e) => this.setPrivacy(prop, e.target.checked ? 'remove' : 'add')}
              label={`Show ${name}`}
            />
          )),
        ]}
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
        pinnedTab={editable && (
          <Button
            className={styles.editButton}
            type="cta"
            onClick={this.toggleEditing}
          >
            {T.translate(this.state.editing ? 'characters.done' : 'characters.edit')}
          </Button>
        )}
        tabs={[{
          path: '',
          name: 'PvE',
          ignoreTitle: true,
          content: (
            <Overview
              name={params.character}
              editing={editing}
              editable={editable}
              mode="pve"
              userAlias={alias}
            />
          ),
        }, {
          path: '/pvp',
          name: 'PvP',
          content: (
            <Overview
              name={params.character}
              editing={editing}
              editable={editable}
              mode="pvp"
              userAlias={alias}
            />
          ),
        }, {
          path: '/wvw',
          name: 'WvW',
          content: (
            <Overview
              name={params.character}
              editing={editing}
              editable={editable}
              mode="wvw"
              userAlias={alias}
            />
          ),
        }, {
          path: '/bags',
          name: T.translate('characters.bags'),
          flair: 'new',
          content: <Bags />,
        }]}
      />
    );
  }
}));
