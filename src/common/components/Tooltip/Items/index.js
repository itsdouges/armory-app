import { PropTypes } from 'react';
import SimpleTooltip from '../Simple';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
import Icon from 'common/components/Icon';
import colours from 'common/styles/colours.less';

import Gold from '../Gold';
import ItemUpgrade from '../ItemUpgrade';

function buildName (item, skin, upgrades) {
  if (!skin.name) {
    return item.name;
  }

  const regex = /[\w'\-]+/;
  const prefix = regex.exec(item.name);
  const prefixedName = `${prefix} ${skin.name}`;

  const [upgradeOne] = upgrades;

  if (upgradeOne && prefixedName.indexOf(upgradeOne.details.suffix)) {
    return `${prefixedName} ${upgradeOne.details.suffix}`;
  }

  return prefixedName;
}

const ItemsTooltip = ({ data: { item, skin, name, upgrades } }) => {
  if (Object.keys(item).length === 0) {
    return <SimpleTooltip data={name} />;
  }

  const itemName = buildName(item, skin, upgrades);
  const isTransmuted = !!skin.name;

  return (
    <div>
      <SimpleTooltip data="Current Equipped" />

      <div className={styles.itemHeader}>
        <Icon size="mini" src={skin.icon || item.icon} className={styles.tooltipIcon} />

        <span className={cx('itemName', colours[item.rarity.toLowerCase()])}>
          {itemName}
        </span>
      </div>

      <div>
        {!!item.details.defense && (
          <div>
            Defense: <span className={colours.green}>{item.details.defense}</span>
          </div>)}

        {item.type === 'Weapon' && <div>
          <span>Weapon Strength: </span>
          <span className={colours.green}>
            {`${item.details.min_power} - ${item.details.max_power}`}
          </span>
        </div>}

        {item.details.infix_upgrade &&
          item.details.infix_upgrade.attributes.map(({ modifier, attribute }) => (
            <div key={attribute} className={colours.green}>{`+${modifier} ${attribute}`}</div>
        ))}

        {upgrades.map((upgrade, index) => <ItemUpgrade key={index} data={upgrade} />)}

        <div>{isTransmuted ? 'Transmuted' : 'Skin Locked'}</div>
        <div>{item.name}</div>

        <div>{item.rarity}</div>

        <div>{item.details.weight_class}</div>

        <div>{item.details.type} {item.type}</div>

        <div>{item.description}</div>

        {!!item.level && <div>Required Level: {item.level}</div>}

        <div>{item.boundStatus}</div>

        <Gold copper={item.copper} silver={item.silver} gold={item.gold} />
      </div>
    </div>
  );
};

ItemsTooltip.propTypes = {
  data: PropTypes.object,
};

export default ItemsTooltip;
