// @flow

import type {
  Character as CharacterType,
  Items,
  Skins,
  Specializations,
  Traits,
  Skills as Gw2Skills,
  Amulets,
  CharactersList,
} from 'flowTypes';

import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import includes from 'lodash/includes';
import get from 'lodash/get';
import cx from 'classnames';
import T from 'i18n-react';

import { selector } from '../../characters.reducer';
import { selectCharacterMode, updateCharacter } from '../../actions';
import calculateAttributes from 'lib/gw2/attributes';
import { leftItems, rightItems } from 'lib/gw2/equipment';

import Checkbox from 'common/components/Checkbox';
import ContentCardList from 'common/components/ContentCardList';
import ContentCard from 'common/components/ContentCard';
import ImageUpload from 'common/components/ImageUpload';
import Button from 'common/components/Button';

import PvpEquipment from '../PvpEquipment';
import Specialization from '../Specialization';
import Portrait from '../Portrait';
import Attribute from '../Attribute';
import CraftingBar from '../CraftingBar';
import Item from '../Item';
import Skills from '../Skills';
import Embed from '../Embed';

import styles from '../../styles.less';

type CharacterModes = 'pve' | 'pvp' | 'wvw';

type UpdateOptions = {
  showPublic: boolean,
};

type Props = {
  name: string,
  userAlias: string,
  modee: CharacterModes,
  mode?: CharacterModes,
  character?: CharacterType,
  characters?: CharactersList,
  items?: Items,
  skins?: Skins,
  specializations?: Specializations,
  traits?: Traits,
  skills?: Gw2Skills,
  amulets?: Amulets,
  dispatchUpdateCharacter?: (name: string, options: UpdateOptions) => void,
  dispatchSelectCharacterMode?: (mode: CharacterModes) => void,
};

@connect(selector, {
  dispatchSelectCharacterMode: selectCharacterMode,
  dispatchUpdateCharacter: updateCharacter,
})
export default class CharacterOverview extends Component {
  props: Props;

  static contextTypes = {
    _userAlias: PropTypes.string,
  };

  state = {
    editMode: false,
    updateImage: false,
  };

  componentWillMount () {
    this.setMode(this.props.modee);
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.modee !== nextProps.modee) {
      this.setMode(nextProps.modee);
    }
  }

  onUploadComplete = () => {
    this.setState({
      updateImage: true,
    });
  };

  setMode (mode: CharacterModes) {
    const { dispatchSelectCharacterMode } = this.props;
    dispatchSelectCharacterMode && dispatchSelectCharacterMode(mode);
  }

  getItems (ids: Array<number> = []) {
    return ids.map((id) => this.props.items && this.props.items[id]);
  }

  toggleEditMode = () => {
    const editMode = !this.state.editMode;

    this.setState({
      editMode,
    });
  };

  hide = (e: EventHandler) => {
    const { name } = this.props;
    const { dispatchUpdateCharacter } = this.props;

    dispatchUpdateCharacter && dispatchUpdateCharacter(name, {
      showPublic: e.target.checked,
    });
  }

  render () {
    const {
      name: characterName,
      userAlias: alias,
      characters,
      character,
      mode,
      skills,
      items,
      skins,
      traits,
      specializations,
      amulets,
    } = this.props;

    const { editMode } = this.state;

    /* eslint no-underscore-dangle:0 */
    const attributes = calculateAttributes(character, { items, traits, skills });

    const ownCharacter = get(character, 'alias', false) === this.context._userAlias;
    const equipment = get(character, 'equipment', {});
    const profession = get(character, 'profession');
    const characterSpecializations = get(character, `specializations[${mode || 'pve'}]`, [{}, {}, {}]);
    const characterSkills = get(character, `skills[${mode || 'pve'}]`, {});
    const pvpEquipment = get(character, 'equipment_pvp', { sigils: [] });
    const crafting = get(character, 'crafting', [{}, {}, {}]);
    const showPublic = get(character, 'authorization.showPublic');
    const guild = character && {
      name: character.guild_name,
      tag: character.guild_tag,
      id: character.guild,
    };

    const showPvpEquipment = mode === 'pvp';

    return (
      <div>
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
                    item={items && items[equip.id]}
                    skin={skins && skins[equip.skin]}
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
              uploadName={`characters/${characterName}`}
            >
              <Portrait
                character={character}
                forceUpdate={this.state.updateImage}
              >
                <Embed name={characterName} className={styles.embedContainer} />
              </Portrait>
            </ImageUpload>

            <div className={styles.rightColumn}>
              {ownCharacter && (
                <div className={styles.editContainer}>
                  <Button
                    key="edit-button"
                    className={styles.editButton}
                    type={editMode ? 'primary' : 'minimal'}
                    onClick={this.toggleEditMode}
                  >
                    {editMode
                      ? T.translate('characters.done')
                      : T.translate('characters.edit')}
                  </Button>

                  {editMode && [
                    <Checkbox
                      checked={!!showPublic}
                      key="hide-checkbox"
                      onChange={this.hide}
                      label={
                        showPublic
                          ? T.translate('characters.shown')
                          : T.translate('characters.hidden')
                      }
                    />,
                  ]}
                </div>
              )}

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
                      item={items && items[equip.id]}
                      skin={skins && skins[equip.skin]}
                      stats={equip.stats}
                    />
                  );
                })}
              </div>

              <div className={styles.craftingContainer}>
                {crafting.map((craft, index) =>
                  <CraftingBar craft={craft} key={craft.discipline || index} />)}
              </div>
            </div>
          </div>
        </div>

        {showPvpEquipment && (
          <PvpEquipment
            equipment={equipment}
            pvpEquipment={pvpEquipment}
            items={items || {}}
            skins={skins || {}}
            amulets={amulets || {}}
            profession={profession}
            className={styles.pvpEquipment}
          />
        )}

        <Skills
          skills={skills || {}}
          characterSkills={characterSkills}
          className={styles.skills}
        />

        <div className={styles.specializationContainer}>
          <div className={styles.brushStrokeContainer}>
            {characterSpecializations.map((data, index) =>
              data && <Specialization
                key={(data.id) || index}
                data={data}
                specializations={specializations || {}}
                traits={traits || {}}
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
      </div>
    );
  }
}
