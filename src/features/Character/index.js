import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import includes from 'lodash/includes';
import { selector } from './characters.reducer';
import { fetchCharacter, selectCharacter } from './actions';
import { fetchUserCharacters, selectUser } from 'features/User/actions';
import { calculate as calculateAttributes } from 'lib/gw2/attributes';

import Title from 'react-title-component';
import ContentCardList from 'common/components/ContentCardList';
import ContentCard from 'common/components/ContentCard';
import SocialButtons from 'common/components/SocialButtons';
import ImageUpload from 'common/components/ImageUpload';
import Button from 'common/components/Button';

import Specialization from './components/Specialization';
import Portrait from './components/Portrait';
import Attribute from './components/Attribute';
import CraftingBar from './components/CraftingBar';
import Item from './components/Item';

import styles from './styles.less';

const leftItems = [
  {
    name: 'Headgear',
    type: 'head',
    key: 'helm',
  },
  {
    name: 'Shoulders',
    type: 'shoulder',
    key: 'shoulders',
  },
  {
    name: 'Chest',
    type: 'chest',
    key: 'coat',
  },
  {
    name: 'Gloves',
    type: 'hand',
    key: 'gloves',
  },
  {
    name: 'Leggings',
    type: 'leg',
    key: 'leggings',
  },
  {
    name: 'Boots',
    type: 'feet',
    key: 'boots',
  },
  {
    name: 'Main-Hand Weapon',
    type: 'sword',
    key: 'weaponA1',
  },
  {
    name: 'Off-Hand Weapon',
    type: 'shield',
    key: 'weaponA2',
  },
  {
    name: 'Main-Hand Weapon',
    type: 'sword',
    key: 'weaponB1',
    hideForClasses: ['Engineer', 'Elementalist'],
  },
  {
    name: 'Off-Hand Weapon',
    type: 'shield',
    key: 'weaponB2',
    hideForClasses: ['Engineer', 'Elementalist'],
  },
];

const rightItems = [
  {
    name: 'Back',
    type: 'back',
    key: 'backpack',
  },
  {
    name: 'Accessory',
    type: 'beartrinket',
    key: 'accessory1',
  },
  {
    name: 'Accessory',
    type: 'cubetrinket',
    key: 'accessory2',
  },
  {
    name: 'Amulet',
    type: 'amulet',
    key: 'amulet',
  },
  {
    name: 'Ring',
    type: 'rightring',
    key: 'ring1',
  },
  {
    name: 'Ring',
    type: 'leftring',
    key: 'ring2',
  },
  {
    name: 'Foraging',
    type: 'sickle',
    key: 'sickle',
  },
  {
    name: 'Logging',
    type: 'axe',
    key: 'axe',
  },
  {
    name: 'Mining',
    type: 'pick',
    key: 'pick',
  },
  {
    name: 'Acquatic Headgear',
    type: 'head',
    key: 'helmAquatic',
  },
  {
    name: 'Acquatic Weapon',
    type: 'sword',
    key: 'weaponAquaticA',
  },
  {
    name: 'Acquatic Weapon',
    type: 'sword',
    key: 'weaponAquaticB',
    hideForClasses: ['Engineer', 'Elementalist'],
  },
];

class Character extends Component {
  static propTypes = {
    character: PropTypes.object,
    dispatch: PropTypes.func,
    routeParams: PropTypes.object,
    characters: PropTypes.array,
    items: PropTypes.object,
    skins: PropTypes.object,
    fetchingGw2Data: PropTypes.bool,
    specializations: PropTypes.object,
    traits: PropTypes.object,
    mode: PropTypes.oneOf(['pve', 'pvp', 'wvw']),
    location: PropTypes.object,
  };

  static contextTypes = {
    _userAlias: PropTypes.string,
  };

  state = {
    editMode: false,
    updateImage: false,
  };

  componentWillMount () {
    this.loadCharacter();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.routeParams.character !== this.props.routeParams.character) {
      this.loadCharacter();
    }
  }

  onUploadComplete = () => {
    this.setState({
      updateImage: true,
    });
  };

  getItems (ids = []) {
    return ids.map((id) => this.props.items[id]);
  }

  loadCharacter () {
    const { character, alias } = this.props.routeParams;

    this.props.dispatch(fetchCharacter(character));
    this.props.dispatch(fetchUserCharacters(alias));
    this.props.dispatch(selectCharacter(character));
    this.props.dispatch(selectUser(alias));
  }

  toggleEditMode = () => {
    const editMode = !this.state.editMode;

    this.setState({
      editMode,
    });
  };

  render () {
    const {
      routeParams: { alias },
      routeParams,
      characters,
      character,
    } = this.props;

    const { editMode } = this.state;

    /* eslint no-underscore-dangle:0 */
    const ownCharacter = character && character.alias === this.context._userAlias;
    const safeCharacter = character || {};
    const equipment = (character && character.equipment) || [];
    const attributes = calculateAttributes(character, this.props.items);
    const specializations = (character && character.specializations) || {
      [this.props.mode]: [{}, {}, {}],
    };

    const crafting = (character && character.crafting) || [{}, {}, {}];
    const guild = character && {
      name: character.guild_name,
      tag: character.guild_tag,
      id: character.guild,
    };

    return (
      <div className={styles.root}>
        <Title render={(title) => `${routeParams.character}${title}`} />

        <div className={styles.inner}>
          {ownCharacter &&
            <Button
              className={styles.editButton}
              type={editMode ? 'primary' : ''}
              onClick={this.toggleEditMode}
            >
              {editMode ? 'I\'M DONE' : 'EDIT CHARACTER'}
            </Button>}

          <ContentCard content={character} size="big" />

          <div className={styles.columns}>
            <div className={styles.leftColumn}>
              {leftItems.map((item) => {
                const equip = equipment[item.key] || {};

                return (
                  <Item
                    {...item}
                    hide={includes(item.hideForClasses, safeCharacter.profession)}
                    key={item.key}
                    upgradeCounts={equip.upgradeCounts}
                    upgrades={this.getItems(equip.upgrades)}
                    infusions={this.getItems(equip.infusions)}
                    item={this.props.items[equip.id]}
                    skin={this.props.skins[equip.skin]}
                    stats={equip.stats}
                  />
                );
              })}
            </div>

            <ImageUpload
              onUploadComplete={this.onUploadComplete}
              disabled={!editMode}
              forceShow={editMode}
              hintText="CHANGE YOUR CHARACTER PORTRAIT"
              uploadName={`characters/${character && character.name}`}
            >
              <Portrait forceUpdate={this.state.updateImage} character={character} />
            </ImageUpload>

            <div className={styles.rightColumn}>
              <div className={styles.attributes}>
                {Object.keys(attributes).map((key) => {
                  const value = attributes[key];
                  return <Attribute key={key} name={key} value={value} />;
                })}
              </div>

              <div className={styles.rightItemColumn}>
              {rightItems.map((item) => {
                const equip = equipment[item.key] || {};

                return (
                  <Item
                    {...item}
                    hide={includes(item.hideForClasses, safeCharacter.profession)}
                    key={item.key}
                    upgradeCounts={equip.upgradeCounts}
                    upgrades={this.getItems(equip.upgrades)}
                    infusions={this.getItems(equip.infusions)}
                    item={this.props.items[equip.id]}
                    skin={this.props.skins[equip.skin]}
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

        <div className={styles.specializationContainer}>
          <div className={styles.brushStrokeContainer}>
            {specializations[this.props.mode].map((data, index) =>
              data && <Specialization
                key={(data.id) || index}
                data={data}
                specializations={this.props.specializations}
                traits={this.props.traits}
              />)}
          </div>
        </div>

        <div className={styles.links}>
          <Link to={`/${character && character.alias}`}>
            <ContentCard type="users" content={character} className={styles.linkItem} />
          </Link>

          <Link to={`/g/${guild && guild.name}`}>
            <ContentCard type="guilds" content={guild} className={styles.linkItem} />
          </Link>
        </div>

        <ContentCardList bottomBorder alias={alias} items={characters} />

        <div className={styles.socialButtonsContainer}><SocialButtons /></div>
      </div>
    );
  }
}

export default connect(selector)(Character);
