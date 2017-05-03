// @flow

import type {
  Character as CharacterType,
  Items,
  Skins,
  Specializations,
  Traits,
  Skills as Gw2Skills,
  Amulets,
  Pets,
} from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import includes from 'lodash/includes';
import get from 'lodash/get';
import cx from 'classnames';
import T from 'i18n-react';

import { overviewSelector } from '../../characters.reducer';
import { updateCharacter, selectCharacterMode } from '../../actions';
import calculateAttributes from 'lib/gw2/attributes';
import { leftItems, rightItems } from 'lib/gw2/equipment';

import Checkbox from 'common/components/Checkbox';
import ImageUpload from 'common/components/ImageUpload';
import Button from 'common/components/Button';
import ContentCard from 'common/components/ContentCard';

import PvpEquipment from '../PvpEquipment';
import Specialization from '../Specialization';
import Portrait from '../Portrait';
import Attribute from '../Attribute';
import CraftingBar from '../CraftingBar';
import Item from '../Item';
import Skills from '../Skills';
import Embed from '../Embed';

import styles from './styles.less';

type CharacterModes = 'pve' | 'pvp' | 'wvw';

type UpdateOptions = {
  showPublic: boolean,
};

type Props = {
  name: string,
  userAlias: string,
  mode: CharacterModes,
  character?: CharacterType,
  items?: Items,
  skins?: Skins,
  pets?: Pets,
  specializations?: Specializations,
  traits?: Traits,
  skills?: Gw2Skills,
  amulets?: Amulets,
  updateCharacter?: (name: string, options: UpdateOptions) => void,
  selectCharacterMode?: (CharacterModes) => void,
};

@connect(overviewSelector, {
  updateCharacter,
  selectCharacterMode,
})
export default class CharacterOverview extends Component {
  props: Props;

  state = {
    editMode: false,
    updateImage: false,
  };

  componentWillMount () {
    this.props.selectCharacterMode && this.props.selectCharacterMode(this.props.mode);
  }

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.mode !== this.props.mode) {
      this.props.selectCharacterMode && this.props.selectCharacterMode(nextProps.mode);
    }
  }

  onUploadComplete = () => {
    this.setState({
      updateImage: true,
    });
  };

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

    this.props.updateCharacter && this.props.updateCharacter(name, {
      showPublic: e.target.checked,
    });
  }

  render () {
    const {
      name: characterName,
      character,
      mode,
      skills,
      items,
      skins,
      traits,
      specializations,
      amulets,
      pets,
    } = this.props;

    const { editMode } = this.state;

    const attributes = calculateAttributes(character, { items, traits, skills });
    const ownCharacter = false;
    const equipment = get(character, 'equipment', {});
    const profession = get(character, 'profession');
    const characterSpecializations = get(character, `specializations[${mode}]`, [{}, {}, {}]).filter((s) => !!s);
    const characterSkills = get(character, `skills[${mode}]`, {});
    const pvpEquipment = get(character, 'equipment_pvp', { sigils: [] });
    const crafting = get(character, 'crafting', [{}, {}, {}]);
    const showPublic = get(character, 'authorization.showPublic');
    const showPvpEquipment = mode === 'pvp';
    const characterPetIds = get(character, `skills[${mode}].pets.terrestrial`, undefined);

    return (
      <div className={styles.overviewRoot}>
        <div className={styles.inner}>
          {characterPetIds && characterPetIds.map((id) =>
            <ContentCard
              className={styles.subContent}
              key={id}
              content={pets && pets[id]}
              type="pet"
            />
          )}

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
                className={styles.portrait}
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
                    {T.translate(editMode ? 'characters.done' : 'characters.edit')}
                  </Button>

                  {editMode && [
                    <Checkbox
                      checked={!!showPublic}
                      key="hide-checkbox"
                      onChange={this.hide}
                      label={T.translate(showPublic ? 'characters.shown' : 'characters.hidden')}
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

        {characterSpecializations.length && <div className={styles.specializationContainer}>
          <div className={styles.brushStrokeContainer}>
            {characterSpecializations.map((data, index) =>
              <Specialization
                key={(data.id) || index}
                data={data}
                specializations={specializations || {}}
                traits={traits || {}}
              />)}
          </div>
        </div>}
      </div>
    );
  }
}
