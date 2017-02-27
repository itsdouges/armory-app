// @flow

import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import includes from 'lodash/includes';
import get from 'lodash/get';

import { leftItems, rightItems } from 'lib/gw2/equipment';
import ContentCard from 'common/components/ContentCard';

import { fetchCharacter, selectCharacter } from 'features/Character/actions';
import { selector } from 'features/Character/characters.reducer';
import styles from './styles.less';
import Item from 'features/Character/components/Item';
import Portrait from 'features/Character/components/Portrait';

@connect(selector)
export default class CharacterLite extends Component {
  static propTypes = {
    character: PropTypes.object,
    dispatch: PropTypes.func,
    items: PropTypes.object,
    skins: PropTypes.object,
    specializations: PropTypes.object,
    traits: PropTypes.object,
    mode: PropTypes.oneOf(['pve', 'pvp', 'wvw']),
    skills: PropTypes.object,
    routeParams: PropTypes.object,
    location: PropTypes.object,
    amulets: PropTypes.object,
    name: PropTypes.string,
  };

  componentWillMount () {
    const name = this.props.name;
    if (!name) {
      return;
    }

    this.loadCharacter(name);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.name === nextProps.name) {
      return;
    }

    this.loadCharacter(nextProps.name);
  }

  getItems (ids = []) {
    return ids.map((id) => this.props.items[id]);
  }

  loadCharacter (name) {
    this.props.dispatch(fetchCharacter(name, {
      redirect404: false,
      ignoreAuth: true,
      basicLoad: true,
    }));

    this.props.dispatch(selectCharacter(name));
  }

  render () {
    const {
      character,
      items,
      skins,
    } = this.props;

    const equipment = get(character, 'equipment', {});
    const profession = get(character, 'profession');
    const safeCharacter = get(this.props, 'character', {});

    return (
      <div className={styles.root}>
        <div className={styles.cover}>
          <Portrait character={character} className={styles.litePortrait} />
        </div>

        <a
          rel="noopener noreferrer"
          target="_blank"
          href={`/${safeCharacter.alias}/c/${safeCharacter.name}`}
          className={styles.header}
        >
          <ContentCard content={character} />
        </a>

        <div className={styles.equips}>
          {leftItems.map((item) => {
            const equip = equipment[item.key] || {};

            return (
              <Item
                {...item}
                small
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

          {rightItems.map((item) => {
            const equip = equipment[item.key] || {};

            return (
              <Item
                {...item}
                small
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
      </div>
    );
  }
}
