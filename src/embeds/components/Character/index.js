// @flow

import type { Character, Items, Skins } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import includes from 'lodash/includes';
import get from 'lodash/get';
import cx from 'classnames';

import config from 'config';
import { leftItems, rightItems } from 'lib/gw2/equipment';
import ContentCard from 'common/components/ContentCard';

import ArmoryBadge from 'common/components/ArmoryBadge';
import { fetchCharacter, selectCharacter } from 'features/Character/actions';
import { minimalSelector } from 'features/Character/characters.reducer';
import styles from './styles.less';
import Item from 'common/components/Item';
import Portrait from 'features/Character/components/Portrait';

type Props = {
  name: string,
  character?: Character,
  selectCharacter: (name: string) => void,
  fetchCharacter: (name: string, any) => void,
  items?: Items,
  skins?: Skins,
  className?: string,
};

export default connect(minimalSelector, {
  fetchCharacter,
  selectCharacter,
})(
class CharacterLite extends Component {
  props: Props;

  componentWillMount () {
    const name = this.props.name;
    if (!name) {
      return;
    }

    this.loadCharacter(name);
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.name === nextProps.name) {
      return;
    }

    this.loadCharacter(nextProps.name);
  }

  getItems (ids: Array<number> = []) {
    return ids.map((id) => (this.props.items || [])[id]);
  }

  loadCharacter (name: string) {
    this.props.fetchCharacter(name, {
      redirect404: false,
      basicLoad: true,
    });

    this.props.selectCharacter(name);
  }

  render () {
    const {
      character,
      items,
      skins,
      className,
    } = this.props;

    const equipment = get(character, 'equipment', {});
    const profession = get(character, 'profession');
    const safeCharacter = get(this.props, 'character', {});

    return (
      <div className={cx(styles.root, className)}>
        <ArmoryBadge className={styles.badge} />

        <div className={styles.cover}>
          <Portrait character={character} className={styles.litePortrait} />
        </div>

        <a
          href={`${config.webUrl}/${safeCharacter.alias}/c/${safeCharacter.name}`}
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
                item={(items || [])[equip.id]}
                skin={(skins || [])[equip.skin]}
                stats={equip.stats}
                equipped
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
                item={(items || [])[equip.id]}
                skin={(skins || [])[equip.skin]}
                stats={equip.stats}
                equipped
              />
            );
          })}
        </div>
      </div>
    );
  }
}
);
