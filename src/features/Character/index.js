// @flow

import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import includes from 'lodash/includes';
import get from 'lodash/get';
import cx from 'classnames';
import T from 'i18n-react';

import { selector } from './characters.reducer';
import { fetchCharacter, selectCharacter, selectCharacterMode, updateCharacter } from './actions';
import { fetchUserCharacters, selectUser } from 'features/User/actions';
import calculateAttributes from 'lib/gw2/attributes';
import { leftItems, rightItems } from 'lib/gw2/equipment';

import Content from 'common/layouts/Content';

import Checkbox from 'common/components/Checkbox';
import ContentCardList from 'common/components/ContentCardList';
import ContentCard from 'common/components/ContentCard';
import SocialButtons from 'common/components/SocialButtons';
import ImageUpload from 'common/components/ImageUpload';
import Button from 'common/components/Button';
import Tooltip from 'common/components/Tooltip';
import TooltipTrigger from 'common/components/TooltipTrigger';
import Icon from 'common/components/Icon';

import PvpEquipment from './components/PvpEquipment';
import Specialization from './components/Specialization';
import Portrait from './components/Portrait';
import Attribute from './components/Attribute';
import CraftingBar from './components/CraftingBar';
import Item from './components/Item';
import Skills from './components/Skills';
import Embed from './components/Embed';

import styles from './styles.less';

import type { Character as CharacterType } from 'flowTypes';

function buildDescription (character = {}) {
  // eslint-disable-next-line
  return `${character.name} the level ${character.level} ${character.race} ${character.eliteSpecialization || character.profession}.`;
}

type Props = {
  character?: CharacterType,
  characters: [],
  items: {},
  skins: {},
  specializations: {},
  traits: {},
  mode: 'pve' | 'pvp' | 'wvw',
  skills: {},
  routeParams: {
    character: string,
    alias: string,
  },
  location: {
    query: {
      mode?: string,
    },
  },
  amulets: {},
  pets: {},
  title: {},
  dispatchSelectCharacterMode: (mode: string) => void,
  dispatchFetchCharacter: (mode: string) => void,
  dispatchFetchUserCharacters: (mode: string) => void,
  dispatchSelectCharacter: (mode: string) => void,
  dispatchSelectUser: (mode: string) => void,
  dispatchUpdateCharacter: (mode: string) => void,
};

@connect(selector, {
  dispatchSelectCharacterMode: selectCharacterMode,
  dispatchFetchCharacter: fetchCharacter,
  dispatchFetchUserCharacters: fetchUserCharacters,
  dispatchSelectCharacter: selectCharacter,
  dispatchSelectUser: selectUser,
  dispatchUpdateCharacter: updateCharacter,
})
export default class Character extends Component {
  props: Props;

  static contextTypes = {
    _userAlias: PropTypes.string,
    router: PropTypes.object,
  };

  state = {
    editMode: false,
    updateImage: false,
  };

  componentWillMount () {
    this.loadCharacter();

    const { dispatchSelectCharacterMode, location } = this.props;

    if (location.query.mode) {
      dispatchSelectCharacterMode(location.query.mode);
    }
  }

  componentDidUpdate (prevProps: Props) {
    if (prevProps.routeParams.character !== this.props.routeParams.character) {
      this.loadCharacter();
    }
  }

  onUploadComplete = () => {
    this.setState({
      updateImage: true,
    });
  };

  getItems (ids: number[] = []) {
    return ids.map((id) => this.props.items[id]);
  }

  setPve = () => this.setMode('pve');
  setPvp = () => this.setMode('pvp');
  setWvw = () => this.setMode('wvw');

  setMode (mode: string) {
    this.props.dispatchSelectCharacterMode(mode);

    this.context.router.replace({
      pathname: location.pathname,
      query: { mode },
    });
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

  toggleEditMode = () => {
    const editMode = !this.state.editMode;

    this.setState({
      editMode,
    });
  };

  hide = (e: EventHandler) => {
    const { character } = this.props.routeParams;
    const { dispatchUpdateCharacter } = this.props;

    dispatchUpdateCharacter(character, {
      showPublic: e.target.checked,
    });
  }

  render () {
    const {
      routeParams: { alias },
      routeParams,
      characters,
      character,
      mode,
      skills,
      items,
      skins,
      traits,
      specializations,
      amulets,
      pets,
      title,
    } = this.props;

    const { editMode } = this.state;

    /* eslint no-underscore-dangle:0 */
    const attributes = calculateAttributes(character, { items, traits, skills });

    const ownCharacter = get(character, 'alias', false) === this.context._userAlias;
    const equipment = get(character, 'equipment', {});
    const profession = get(character, 'profession');
    const characterSpecializations = get(character, `specializations[${mode}]`, [{}, {}, {}]);

    const characterPetIds = get(character, `skills[${mode}].pets.terrestrial`, undefined);
    const characterSkills = get(character, `skills[${mode}]`, {});
    const pvpEquipment = get(character, 'equipment_pvp', { sigils: [] });
    const crafting = get(character, 'crafting', [{}, {}, {}]);
    const showPublic = get(character, 'authorization.showPublic');
    const guild = character && {
      name: character.guild_name,
      tag: character.guild_tag,
      id: character.guild,
    };

    const showPvpEquipment = mode === 'pvp';
    const characterTitle = get(title, 'name');

    return (
      <Content
        title={`${routeParams.character} | ${alias}`}
        description={buildDescription(character)}
        content={character}
        extraSubtitle={characterTitle && <span><i>{characterTitle}</i> | </span>}
        type="characters"
        extraContent={characterPetIds &&
          characterPetIds.map((id) =>
            <ContentCard className={styles.subContent} key={id} content={pets[id]} type="pet" />
        )}
      >
        <div className={styles.inner}>
          <div className={styles.columns}>
            <div className={cx(styles.leftColumn, showPvpEquipment && styles.fade)}>
              {leftItems.map((item) => {
                const equip = equipment[item.key] || {};

                return (
                  <Item
                    {...item}
                    hide={includes(item.hideForClasses, profession)}
                    key={item.key}
                    upgradeCounts={equip.upgradeCounts}
                    upgrades={this.getItems(equip.upgrades)}
                    infusions={this.getItems(equip.infusions)}
                    item={items[equip.id]}
                    skin={skins[equip.skin]}
                    stats={equip.stats}
                  />
                );
              })}
            </div>

            <ImageUpload
              onUploadComplete={this.onUploadComplete}
              disabled={!editMode}
              forceShow={editMode}
              hintText={<span>{T.translate('characters.changePortrait')}<br />560 x 840</span>}
              uploadName={`characters/${(character && character.name) || ''}`}
            >
              <Portrait
                character={character}
                forceUpdate={this.state.updateImage}
              >
                <div className={styles.modeContainer}>
                  <TooltipTrigger data="PvE">
                    <Icon
                      size="medium"
                      name="pve-icon.png"
                      onClick={this.setPve}
                      className={cx(styles.modeIcon, mode === 'pve' && styles.active)}
                    />
                  </TooltipTrigger>

                  <TooltipTrigger data="WvW">
                    <Icon
                      size="medium"
                      name="wvw-icon.png"
                      onClick={this.setWvw}
                      className={cx(styles.modeIcon, mode === 'wvw' && styles.active)}
                    />
                  </TooltipTrigger>

                  <TooltipTrigger data="PvP">
                    <Icon
                      size="medium"
                      name="pvp-icon.png"
                      onClick={this.setPvp}
                      className={cx(styles.modeIcon, mode === 'pvp' && styles.active)}
                    />
                  </TooltipTrigger>
                </div>

                <div className={styles.embedContainer}>
                  <Embed name={routeParams.character} />
                </div>
              </Portrait>
            </ImageUpload>

            <div className={styles.rightColumn}>
              <div className={styles.editContainer}>
                {ownCharacter && (
                  <div>
                    <Button
                      key="edit-button"
                      className={styles.editButton}
                      type={editMode ? 'primary' : 'minimal'}
                      onClick={this.toggleEditMode}
                    >
                      {editMode ? `${T.translate('characters.done')}` :
                                  `${T.translate('characters.edit')}`}
                    </Button>

                    {editMode && [
                      <Checkbox
                        checked={!!showPublic}
                        key="hide-checkbox"
                        onChange={this.hide}
                        label={
                          showPublic
                            ? `${T.translate('characters.shown')}`
                            : `${T.translate('characters.hidden')}`
                        }
                      />,
                    ]}
                  </div>
                )}
              </div>

              <div className={styles.attributes}>
                {Object.keys(attributes).map((key) => {
                  const value = attributes[key];
                  return <Attribute key={key} name={key} value={value} />;
                })}
              </div>

              <div className={cx(styles.rightItemColumn, showPvpEquipment && styles.fade)}>
                {rightItems.map((item) => {
                  const equip = equipment[item.key] || {};

                  return (
                    <Item
                      {...item}
                      hide={includes(item.hideForClasses, profession)}
                      key={item.key}
                      upgradeCounts={equip.upgradeCounts}
                      upgrades={this.getItems(equip.upgrades)}
                      infusions={this.getItems(equip.infusions)}
                      item={items[equip.id]}
                      skin={skins[equip.skin]}
                      stats={equip.stats}
                    />
                  );
                })}
              </div>

              <div className={styles.craftingContainer}>
                {crafting.map((craft, index) => <CraftingBar craft={craft} key={index} />)}
              </div>
            </div>
          </div>
        </div>

        {showPvpEquipment && (
          <PvpEquipment
            equipment={equipment}
            pvpEquipment={pvpEquipment}
            items={items}
            skins={skins}
            amulets={amulets}
            profession={profession}
            className={styles.pvpEquipment}
          />
        )}

        <Skills
          skills={skills}
          characterSkills={characterSkills}
          className={styles.skills}
        />

        <div className={styles.specializationContainer}>
          <div className={styles.brushStrokeContainer}>
            {characterSpecializations.map((data, index) =>
              data && <Specialization
                key={(data.id) || index}
                data={data}
                specializations={specializations}
                traits={traits}
              />)}
          </div>
        </div>

        <div className={styles.links}>
          <Link to={`/${(character && character.alias) || ''}`}>
            <ContentCard type="users" content={character} className={styles.linkItem} />
          </Link>

          <Link to={`/g/${(guild && guild.name) || ''}`}>
            <ContentCard type="guilds" content={guild} className={styles.linkItem} />
          </Link>
        </div>

        <ContentCardList noBorder alias={alias} items={characters} />

        <SocialButtons />
        <Tooltip />
      </Content>
    );
  }
}
