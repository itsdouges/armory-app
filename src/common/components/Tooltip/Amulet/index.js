import { PropTypes } from 'react';
import get from 'lodash/get';

import { markup } from 'lib/gw2/parse';
import colours from 'common/styles/colours.less';
import SimpleTooltip from '../Simple';
import Background from '../Background';
import ItemHeader from '../ItemHeader';

const AmuletTooltip = ({ data: { item: { name, icon, attributes, details, rarity } } }) => {
  if (!name) {
    return <Background><SimpleTooltip data="Amulet" /></Background>;
  }

  return (
    <Background>
      <ItemHeader name={name} icon={icon} rarity={rarity} />

      <div>
        {get(details, 'infix_upgrade.buff.description', []).map((description) => (
          <div key={description}>
            {markup(description)}
          </div>
        ))}
      </div>

      <div className={colours.green}>
        {attributes && Object
          .entries(attributes)
          .map(([attrName, value]) =>
            <div key={`${value}${attrName}`}>{`+${value} ${attrName}`}</div>)
        }
      </div>
    </Background>
  );
};

AmuletTooltip.propTypes = {
  data: PropTypes.object,
};

export default AmuletTooltip;
