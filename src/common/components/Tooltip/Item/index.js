import { PropTypes } from 'react';
import startCase from 'lodash/startCase';
import get from 'lodash/get';

import SimpleTooltip from '../Simple';
import colours from 'common/styles/colours.less';
import { markup } from 'lib/gw2/parse';

import ItemHeader from '../ItemHeader';
import Gold from '../Gold';
import Upgrade from '../Upgrade';
import Infusion from '../Infusion';
import Background from '../Background';

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

const ItemsTooltip = ({ data: {
  item,
  skin,
  name,
  upgrades,
  upgradeCounts,
  infusions,
  stats: { attributes = {} },
} }) => {
  if (Object.keys(item).length === 0) {
    return <Background><SimpleTooltip data={name} /></Background>;
  }

  const isTransmuted = !!skin.name;

  return (
    <Background>
      <SimpleTooltip data="Currently Equipped" />

      <ItemHeader
        name={buildName(item, skin, upgrades)}
        icon={skin.icon || item.icon}
        rarity={item.rarity}
      />

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

        {get(item, 'details.infix_upgrade.attributes', []).map(({ modifier, attribute }) => (
          <div key={attribute} className={colours.green}>
            {`+${modifier} ${startCase(attribute)}`}
          </div>
        ))}

        {Object.keys(attributes).map((attribute, index) => {
          const modifier = attributes[attribute];

          return (
            <div key={index} className={colours.green}>
              {`+${modifier} ${startCase(attribute)}`}
            </div>
          );
        })}

        <br />

        {upgrades.map((upgrade, index) =>
          <span key={index}>
            <Upgrade data={upgrade} count={upgradeCounts[upgrade.id]} /><br />
          </span>
        )}

        {infusions.map((infusion, index) =>
          <span key={index}>
            <Infusion data={infusion} /><br />
          </span>
        )}

        <div>{isTransmuted ? 'Transmuted' : 'Skin Locked'}</div>
        <div>{item.name}</div>

        <div>{item.rarity}</div>

        <div>{item.details.weight_class}</div>

        <div>{startCase(item.details.type)} {item.type}</div>

        <div>{markup(item.description)}</div>

        {!!item.level && <div>Required Level: {item.level}</div>}

        <div>{item.boundStatus}</div>

        {item.rarity !== 'Legendary' &&
          <Gold copper={item.copper} silver={item.silver} gold={item.gold} />}
      </div>
    </Background>
  );
};

ItemsTooltip.propTypes = {
  data: PropTypes.object,
};

export default ItemsTooltip;
