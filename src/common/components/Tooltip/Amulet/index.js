import { PropTypes } from 'react';
import get from 'lodash/get';

import { markup } from 'lib/gw2/parse';
import colours from 'common/styles/colours.less';
import SimpleTooltip from '../Simple';
import Background from '../Background';
import ItemHeader from '../ItemHeader';

const AmuletTooltip = ({ data: { item, name } }) => {
  if (!item.name) {
    return <Background><SimpleTooltip data={name || 'Amulet'} /></Background>;
  }

  return (
    <Background>
      <ItemHeader name={item.name} icon={item.icon} rarity={item.rarity} />

      <div>
        {get(item.details, 'infix_upgrade.buff.description', []).map((description) => (
          <div key={description}>
            {markup(description)}
          </div>
        ))}
      </div>

      <div className={colours.green}>
        {item.attributes && Object
          .entries(item.attributes)
          .map(([attrName, value]) =>
            <div key={`${value}${attrName}`}>{`+${value} ${attrName}`}</div>)
        }
      </div>
    </Background>
  );
};

AmuletTooltip.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string,
};

export default AmuletTooltip;
